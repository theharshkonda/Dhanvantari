import React from "react";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const NearbyHospitals = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.24531488419371,
          longitude:75.69770552561076,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          
        }}
      >
        {/* Add markers for nearby hospitals */}
        <Marker
          coordinate={{ latitude: 18.24531488419371, longitude: 75.69770552561076 }}
          title="Hiremath Hospital"
          description="हिरेमठ हॉस्पिटल"
        />
        <Marker
          coordinate={{ latitude: 18.228583516618773, longitude:  75.68879524723091 }}
          title="Shraddha Medical Store"
          description="श्रद्धा मेडिकल स्टोअर"
        />
        {/* Add more markers as needed */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default NearbyHospitals;