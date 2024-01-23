import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const OrganDonation = ({ navigation }) => {
  const navigateToBloodDonation = () => {
    navigation.navigate("BloodDonation"); // Navigate to the BloodDonation screen
  };

  const navigateToOrganDonation = () => {
    navigation.navigate("OrganDonations"); // Navigate to the OrganDonation screen
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // Adjust the image path accordingly
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select Donation Type</Text>
        <TouchableOpacity style={styles.option} onPress={navigateToBloodDonation}>
          <Text style={styles.optionText}>Blood Donation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={navigateToOrganDonation}>
          <Text style={styles.optionText}>Organ Donation</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
paddingTop:90
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff", // Set text color to white
  },
  option: {
    backgroundColor: "rgba(52, 152, 219, 0.8)", // Use rgba for a semi-transparent background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrganDonation;
