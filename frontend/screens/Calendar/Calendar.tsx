import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { tabParamsList } from "./Nav"; // Ensure this is the correct path to your Nav.tsx
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Agenda } from "react-native-calendars";

const timeToString = (time: string | number | Date) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

type CalenderProps = {
  route: RouteProp<tabParamsList, "Calender">;
};

export const Calendar = ({ route }: CalendarProps) => {
  const [items, setItems] = useState({});

  const loadItems = (day: { timestamp: number; }) => {
    setTimeout(() => {
      setItems((currentItems) => {
        const updatedItems = { ...currentItems };

        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);

          if (!updatedItems[strTime]) {
            updatedItems[strTime] = [];

            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
              updatedItems[strTime].push({
                name: 'Item for ' + strTime,
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
            }
          }
        }
        return updatedItems;
      });
    }, 1000);
  };

  // Get today's date in the required format
  const today = new Date();
  const currentDay = timeToString(today);

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={currentDay} // This ensures the calendar opens to the current date
        // ... other props and configurations
      />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.midnightBlue, // Use your color theme here
  },
});

