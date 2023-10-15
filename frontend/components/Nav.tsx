import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { User } from "firebase/auth";
import React from "react";

import { Dashboard } from "./Dashboard";
import { Calender } from "./Calender";
import { Profile } from "./Profile";

export type tabParamsList = {
    Dashboard: { userId: string; userEmail: string };
    Calender: { userId: string; userEmail: string };
    Profile: { userId: string; userEmail: string };
  };

export type NavProps = {
  user: User;
  userData: any;
  fetchUserData: any;
  setUserData: any;
};

const Tab = createBottomTabNavigator<tabParamsList>();

export const Nav = (props: NavProps) => {
    const { user } = props;
  
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ userId: user.uid, userEmail: user.email ?? '' }}
          />
          <Tab.Screen
            name="Calender"
            component={Calender}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="laptop" color={color} size={size} />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ userId: user.uid, userEmail: user.email ?? '' }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="mail" color={color} size={size} />
              ),
              tabBarHideOnKeyboard: true,
            }}
            initialParams={{ userId: user.uid, userEmail: user.email ?? '' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };