import React from "react";
import { View, Modal, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

interface RemovePopupProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (favoriteKey: string, sectionName: string) => void;
  favoriteKey: string;
  sectionName: string;
}

export const RemoveSingle: React.FC<RemovePopupProps> = ({ isVisible, onCancel, onConfirm, favoriteKey, sectionName }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel} // For hardware back button on Android
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onCancel} // Closes the modal when the overlay is pressed
      >
        <View style={styles.popupContainer} onStartShouldSetResponder={() => true}>
          <Text style={styles.popupText}>
            Remove {sectionName} from favorites?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={[styles.button, styles.cancelButton]}
              underlayColor={Colors.lightGray}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button, styles.confirmButton]}
              underlayColor={Colors.darkBlue}
              onPress={() => onConfirm(favoriteKey, sectionName)}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  
  popupContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    // Add other styling as needed
  },
  popupContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
    color: "black",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: Colors.uiucOrange,
  },
  confirmButton: {
    backgroundColor: Colors.uiucBlue,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});
