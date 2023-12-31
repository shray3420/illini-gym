import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  Button,
  Touchable,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { db, auth } from "../../firebase/firebaseConfig";
import {
  getDoc,
  doc,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import Colors from "../../constants/Colors";
import CustomText from "../Reusables/CustomText";
import FavoriteInstructions from "./FavoritesInstructions";
import { StyleSheet } from "react-native";
import { SectionInfo, VisibilityIcon, modalStyles } from "../Maps/Gym/SectionModal";
import { getTimeDifference } from "../Reusables/Calculations";
import { NicknamePopup } from "./NicknamePopup";

interface SectionDetails {
  isOpen: boolean;
  name: string;
  lastUpdated: string;
  count: number;
  capacity: number;
  key: string;
}

interface FavoriteModalsProps {
  sections: { gym: string; section: SectionDetails }[];
}

type FavoriteModalProps = {
  section: SectionDetails;
  gym: string;
};

export const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteSections, setFavoriteSections] = useState<{ gym: string; section: SectionDetails }[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sectionNicknames, setSectionNicknames] = useState<Record<string, string>>({});
  const currentUserId = auth.currentUser?.uid;

  const fetchAndUpdateFavorites = useCallback(async () => {
    if (!currentUserId) return;
    setIsLoading(true);
    try {
      const userDoc = await getDoc(doc(db, "users", currentUserId));
      if (!userDoc.exists()) return;

      const userFavorites: string[] = userDoc.data().favorites || [];
      setFavorites(userFavorites);

      const userNicknames: Record<string, string> = userDoc.data().nicknames || {};
      setSectionNicknames(userNicknames);

      const newPressedSections: Record<string, boolean> = {};
      const promises = userFavorites.map(async (fav) => {
        const [gym, sectionId] = fav.split("=");
        const sectionDoc = await getDoc(doc(db, gym, sectionId));
        newPressedSections[sectionId] = true; // Update pressedSections
        return sectionDoc.exists()
          ? { gym, section: { key: sectionId, ...sectionDoc.data() } }
          : null;
      });

      const fetchedData = (await Promise.all(promises)).filter(Boolean);
      setFavoriteSections(
        fetchedData as { gym: string; section: SectionDetails }[]
      );
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
    setIsLoading(false);
  }, [currentUserId]);

  useEffect(() => {
    fetchAndUpdateFavorites();
  }, [fetchAndUpdateFavorites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAndUpdateFavorites().then(() => setRefreshing(false));
  }, [fetchAndUpdateFavorites]);

  const handleRemoveFavorite = (gym: string, sectionKey: string) => {
    console.log("Removing favorite:", gym, sectionKey);
    Alert.alert(
      "Remove Favorite",
      "Are you sure you want to remove this section from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => removeFromFavorites(gym, sectionKey),
        },
      ]
    );
  };

  const getDisplayName = (gym: string, sectionKey: string, sectionName: string) => {
    const favoriteKey = `${gym}=${sectionKey}`;
    return sectionNicknames[favoriteKey] || sectionName;
  };

  const removeFromFavorites = useCallback(
    (gym: string, sectionKey: string) => {
      const userDocRef = doc(collection(db, "users"), currentUserId);
      const favoriteKey = gym + "=" + sectionKey;

      updateDoc(userDocRef, { favorites: arrayRemove(favoriteKey) }).then(
        () => {
          // Update local state to reflect the removal
          setFavorites((favs) => favs.filter((fav) => fav !== favoriteKey));

          // Optionally, you can also update favoriteSections state to immediately reflect the change
          setFavoriteSections((sections) =>
            sections.filter(
              (section) =>
                section.gym + "=" + section.section.key !== favoriteKey
            )
          );
        }
      );
    },
    [currentUserId]
  );

  const Favorites: React.FC<FavoriteModalsProps> = ({sections}) => (
    <View style={modalStyles.listContainer}>
      {sections.map(({ gym, section }) => (
        <FavoriteModal
          gym={gym}
          section={section}
        />
      ))}
    </View>
  );
  

  const FavoriteModal: React.FC<FavoriteModalProps> = ({section, gym }) => {
    const timeDiff = getTimeDifference(section.lastUpdated);
    return (
      <View style={modalStyles.individualSectionContainer}>
        {/* Top Row: Visibility Icon, Section Name, and Star Icon */}
        <View style={modalStyles.row}>
          <VisibilityIcon isOpen={section.isOpen} />
          <CustomText style={modalStyles.sectionName}>
            {getDisplayName(gym, section.key, section.name)}
          </CustomText>
          <MaterialIcons
            name="edit"
            size={24}
            color="white"
            style={modalStyles.starIcon}
          />
          <MaterialIcons
            name="remove-circle-outline"
            size={24}
            color="red"
            style={modalStyles.starIcon}
            onPress={() => handleRemoveFavorite(gym, section.key)}
          />
        </View>

        {/* Middle Row: Last Updated */}
        <CustomText style={modalStyles.lastUpdated}>Last Updated: {timeDiff}</CustomText>

        {/* Bottom Row: Either Progress Bar or 'Section Closed' Text */}
        <View style={modalStyles.row}>
          <SectionInfo section={section} />
          <MaterialIcons
            name="map"
            size={24}
            color="white"
            style={modalStyles.mapIcon}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.beige]} // for Android
            tintColor={Colors.beige} // Color for the spinner (iOS)
            progressBackgroundColor="#ffffff"
          />
        }
      >
        {isLoading && favorites.length === 0 ? (
          <></>
        ) : // <ActivityIndicator size="large" color={Colors.uiucOrange} />
        favorites.length !== 0 ? (
          <Favorites sections={favoriteSections} />
        ) : (
          <FavoriteInstructions />
        )}

        
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.midnightBlue,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  
  
});

