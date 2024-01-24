import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { MaterialIcons, FontAwesome6, Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { FavoriteSettings } from "../Settings/SettingsScreens/FavoriteSettings";
import { FavoritesScreen } from "./FavoritesScreen";
import { RouteProp, useRoute } from "@react-navigation/native";
import DisplayLargeMap from "../Reusables/DisplayLargeMap";
import Information from "../Info/Information";
import { InfoNav } from "../Info/InfoNav";
import { GymData } from "../Maps/Gym/GymData";
import { getCommonHeaderOptions } from "../CustomHeader";
import MapsHome from "../Maps/MapsHome";

export type FavoriteStackParamList = {
  FavoritesScreen: { isEditMode: boolean; action: string };
  FavoriteSettings: undefined;
  DisplayLargeMap: undefined;
  Information: undefined;
  GymData: { gym?: string; gymName?: string };
  FavoritesInfo: undefined;
};

const FavoritesStack = createStackNavigator<FavoriteStackParamList>();

export const FavoritesNav = () => {
  const route =
    useRoute<RouteProp<FavoriteStackParamList, "FavoritesScreen">>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Favorites");

  useEffect(() => {
    if (isEditMode) {
      setTitle("Edit Favorites");
    } else {
      setTitle("Favorites");
    }
  }, [isEditMode]);

  const enableEditMode = (navigation: any) => {
    setIsEditMode(true);
    // setTitle("Edit Favorites");
    navigation.setParams({ isEditMode: true, action: "editModeOn" });
  };

  const renderHeaderLeft = (navigation: any) =>
    isEditMode ? (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              setIsEditMode(false);
              navigation.setParams({ isEditMode: false, action: "cancel" });
            }, 100); // Delay to allow local nickname state to update
          }}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons name="close" size={32} color="red" />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ flexDirection: "row" }}>
        
        <TouchableOpacity
          onPress={() => enableEditMode(navigation)}
          style={{ marginLeft: 10 }}
        >
          <MaterialIcons name="edit" size={32} color={Colors.uiucOrange} />
        </TouchableOpacity>
      </View>
    );

  const renderHeaderRight = (navigation: any) =>
    isEditMode ? (
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setTimeout(() => {
            setIsEditMode(false);
            // setTitle("Favorites");
            navigation.setParams({ isEditMode: false, action: "save" });
          }, 100); // Delay to allow local nickname state to update
        }}
        style={{ marginRight: 10 }}
      >
        <MaterialIcons name="check" size={32} color="green" />
      </TouchableOpacity>
    ) : (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DisplayLargeMap")}
          style={{ marginRight: 10 }}
        >
          <MaterialIcons name="map" size={32} color={Colors.uiucOrange} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Information")}
          style={{ marginRight: 10 }}
        >
          <Ionicons name="information-circle-outline" size={32} color={Colors.uiucOrange} />
        </TouchableOpacity>
      </View>
    );

  return (
    <FavoritesStack.Navigator
      initialRouteName="FavoritesScreen"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: true,
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: Colors.midnightBlue },
      }}
    >
      <FavoritesStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        initialParams={{ isEditMode: isEditMode }}
        options={({ navigation }) => ({
          headerLeft: () => renderHeaderLeft(navigation),
          headerRight: () => renderHeaderRight(navigation),
          headerTitle: title,
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <FavoritesStack.Screen
        name="FavoriteSettings"
        component={FavoriteSettings}
        options={() => ({
          headerTitle: "Settings",
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <FavoritesStack.Screen
        name="DisplayLargeMap"
        component={DisplayLargeMap}
        options={() => ({
          headerTitle: "View Arc Map",
          headerTitleStyle: {
            fontSize: 20,
          },
        })}
      />
      <FavoritesStack.Screen
        name="Information"
        component={InfoNav}
        options={() => ({
          headerShown: false,
          
        })}
      />
      <FavoritesStack.Screen
        name="FavoritesInfo"
        component={InfoNav}
        options={() => ({
          headerShown: false,
          
        })}
      />
      {/* <FavoritesStack.Screen
        name="GymData"
        component={MapsHome}
        options={({ navigation, route }) =>
          getCommonHeaderOptions(navigation, "Maps", route.params.gymName ?? "")
        }
      /> */}
    </FavoritesStack.Navigator>
  );
};
