import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors"; 
import { MarkerData } from './MapsHome';
import { openMapsApp, openWebsite, makeCall } from "./NavigationHelpers"; 

interface BasicInfoModalProps {
  isVisible: boolean;
  gymData: MarkerData | null;
  onClose: () => void;
}

const BasicInfoModal: React.FC<BasicInfoModalProps> = ({ isVisible, gymData, onClose }) => {
  if (!gymData) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <MaterialIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>{gymData.title}</Text>
        <View style={styles.gymContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionHeader}>Hours</Text>
          </View>
          <View style={styles.hoursSection}>
            {gymData.hours.map((hour, index) => (
              <View key={index} style={styles.hourRow}>
                <Text style={styles.dayText}>{hour.day}</Text>
                <Text style={styles.timeText}>{hour.time}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.gymContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionHeader}>Contact Information</Text>
          </View>
          <View style={styles.contactSection}>
            <Text style={styles.infoText}>Phone:</Text>
            <TouchableOpacity
              onPress={() => makeCall(gymData.phone)}
            >
              <Text style={styles.callText}>{gymData.phone}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.contactSection}>
            <Text style={styles.infoText}>Website:</Text>
            <TouchableOpacity
              onPress={() => openWebsite(gymData.website)}
            >
              <Text style={styles.linkText}>{gymData.website}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.contactSection}>
            <View style={styles.addressContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={styles.infoText}>Address:</Text>
                <Text
                  style={[
                    styles.infoText,
                    { marginLeft: 5, flexShrink: 1 },
                  ]}
                >
                  {gymData.address}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.directionsIcon}
                onPress={() =>
                  openMapsApp(
                    gymData.latitude,
                    gymData.longitude
                  )
                }
              >
                <MaterialIcons
                  name="directions"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalView: {
        position: "absolute",
        bottom: Platform.OS === 'ios' ? 75 : 44, 
        width: "100%",
        height: Platform.OS === 'ios' ? "52%" : "56%",
        backgroundColor: Colors.midnightBlue,
        padding: 10,
        alignItems: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
      },
    closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1000,
    },
    modalTitle: {
        color: Colors.uiucOrange,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
      },
      gymContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: Colors.subtleWhite,
        borderColor: Colors.subtleWhite,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        width: "100%",
      },
      headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 5,
      },
      hourRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%", 
        marginBottom: 5,
      },
    
      dayText: {
        flex: 1, 
        fontSize: 14,
        color: "white",
        textAlign: "left",
      },
    
      timeText: {
        flex: 1, 
        fontSize: 14,
        color: "white",
        textAlign: "right",
      },
    
      infoText: {
        fontSize: 12,
        color: "white",
        marginBottom: 5,
      },
      linkText: {
        color: Colors.lightBlue,
        textDecorationLine: "underline",
      },
      callText: {
        color: "green",
        textDecorationLine: "underline",
      },
      sectionHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.uiucOrange,
      },
      hoursSection: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 0,
      },
    
      contactSection: {
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 0,
      },
    
      addressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
      },
    
      separator: {
        height: 1,
        backgroundColor: "grey",
        width: "100%",
        marginVertical: 5,
      },
    
      directionsIcon: {
        padding: 8,
        backgroundColor: Colors.uiucOrange,
        borderRadius: 25,
        marginLeft: 10,
      },
    });

export default BasicInfoModal;
