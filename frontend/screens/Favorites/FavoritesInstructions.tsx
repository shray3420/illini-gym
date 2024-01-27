import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type FavoriteInstructionsProps = {
  onPressFav: () => void;
  onPressHelp: () => void;
};

const FavoriteInstructions: React.FC<FavoriteInstructionsProps> = ({ onPressFav, onPressHelp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Text style={styles.headerText}>Illini</Text>
        <Image 
          source={require('../../assets/illini-dumbbell.png')} 
          style={styles.logo} 
        />
        <Text style={styles.headerText}>Gym</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.mainText}>No favorites added</Text>

        <TouchableOpacity onPress={onPressFav} style={styles.favoritesButton}>
          <MaterialIcons name="star-border" size={28} color="white" />
          <Text style={styles.favoritesText}>Add to Favorites</Text>
        </TouchableOpacity>
        <Text style={styles.subText}>Favorited sections will appear here for quick access</Text>
      </View>

      <TouchableOpacity style={styles.helpTextWrapper} onPress={onPressHelp}>
        <MaterialIcons name="help-outline" size={28} color="white" />
        <Text style={styles.helpText}>Need Help?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Updated to space-between
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 20, // Added padding to bottom
    paddingHorizontal: 20,
    backgroundColor: Colors.midnightBlue,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100, // Adjust size as needed
    height: 150, // Adjust size as needed
    // resizeMode: 'contain', // Ensure the logo scales correctly
  },
  headerText: {
    fontSize: 36, // Match the text size with your logo size
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 80,
    backgroundColor: Colors.subtleWhite, // Changed to white for contrast
    padding: 20, // Added padding
    borderRadius: 15, // Rounded corners
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subText: {
    fontSize: 18, // Slightly smaller font size for subtlety
    color: Colors.gray,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'normal', // Changed to normal for a lighter appearance
    marginTop: 15, // Added space above the subText
  },
  mainText: {
    fontSize: 24, // Adjusted for better proportion
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
    marginBottom: 30, // Increased spacing
  },
  favoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.uiucOrange,
    paddingVertical: 12, // Slightly increased padding
    paddingHorizontal: 25, // Increased for better touch area
    borderRadius: 20, // More rounded corners
    shadowColor: "#000", // Adding shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  favoritesText: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    marginLeft: 10,
    fontWeight: '500', // Slightly bolder
  },
  helpTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.uiucBlue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20, // More rounded corners
    shadowColor: "#000", // Adding shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  
  helpText: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    marginLeft: 10,
    fontWeight: '500', // Slightly bolder
  },
});

export default FavoriteInstructions;
