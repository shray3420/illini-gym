import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, Modal, Animated, Dimensions} from 'react-native';
import MapView, { Marker, Polyline, Circle, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { gymMarkers } from './GymMarkers';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MapsStackParamList } from './MapsNav';
import Colors from '../../constants/Colors';


const INITIAL_REGION = {
  latitude: 40.10385157161382,
  longitude: -88.23056902208337,
  latitudeDelta: 0.03,
  longitudeDelta: 0.01,
};

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface MarkerData {
  key: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}

export const MapsHome: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<MapsStackParamList, "GymInfo">>();
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
  const mapRef = useRef<MapView>(null);

  const handleMarkerPress = (gymKey: string) => {
    const gym = gymKey === '1' ? 'arc' : 'crce';
    navigation.navigate('GymData', { gym: gym, gymName: gym.toUpperCase() });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const resetMapToInitialRegion = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
      >
        {gymMarkers.map((marker: MarkerData) => (
          <Marker
            key={marker.key}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => handleMarkerPress(marker.key)}
          >
            <Text style={styles.markerTitle}>{marker.title}</Text>
            <TouchableOpacity onPress={() => handleMarkerPress(marker.key)}>
              <MaterialIcons name="place" size={32} color={Colors.uiucOrange} />
            </TouchableOpacity>
          </Marker>
        ))}

        {currentLocation && (
          <Circle
            center={currentLocation}
            radius={1000}
            fillColor="rgba(255, 0, 0, 0.2)"
            strokeColor="rgba(255, 0, 0, 0.2)"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.recenterButton} onPress={resetMapToInitialRegion}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerTitleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    padding: 5,
    borderRadius: 5,
    marginBottom: 5, // Spacing between title and icon
    alignItems: 'center', // Center align the text
  },
  markerTitle: {
    color: Colors.black, // Text color
    fontWeight: 'bold', // Bold text
    // You can add other styling like fontSize, etc.
  },
  recenterButton: {
    position: 'absolute',
    top: 10, // Changed from top to bottom
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.8)', // Neutral color with transparency
    borderRadius: 25, // Circular shape
    zIndex: 1000,
    shadowColor: '#000', // Shadow for an elevated look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
});

export default MapsHome;
