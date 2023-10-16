import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { tabParamsList } from "./Nav";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOutUser } from "../firebase/auth";
import CustomText from "./Reusables/CustomText";
import colors from "../constants/colors";
type ProfileProps = {
  route: RouteProp<tabParamsList, "Profile">;
};

export const Profile = ({ route }: ProfileProps) => {
  const { userId, userEmail } = route.params;
  const [error, setError] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <CustomText style={styles.text}>Profile</CustomText>
      {/* Just for demonstration, display the userId and userEmail */}
      <CustomText style={styles.infoText}>User ID: {userId}</CustomText>
      <CustomText style={styles.infoText}>User Email: {userEmail}</CustomText>

      <View>
        <TouchableOpacity
          onPress={() => signOutUser(setError)}
          style={styles.signoutButton}
        >
          <CustomText>Sign Out</CustomText>
        </TouchableOpacity>
        <Text>{error}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.midnightBlue,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
  },
  signoutButton: {
    backgroundColor: colors.uiucOrange,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
