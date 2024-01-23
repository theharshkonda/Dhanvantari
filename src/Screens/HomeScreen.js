// home.js
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BackHandler } from 'react-native';
const HomeScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Exit the app if on the home screen
        BackHandler.exitApp();
        return true;
      };

      // Add event listener for hardware back button
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Clean up the event listener on unmount
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
  const navigateToChatbot = () => {
    // Navigate to the Ayurvedic medicine recommendations (chatbot) screen
    navigation.navigate('Chatbot', { category: 'Ayurvedic Medicine Recommendations' });
  };

  const navigateToMentalHealthChatbot = () => {
    // Navigate to the Mental Health Support (chatbot) screen
    navigation.navigate('Mental Health Bot', { category: 'Mental Health Support' });
  };

  const navigateToDoctorAppointments = () => {
    // Navigate to the Doctor Appointments screen
    navigation.navigate('DoctorAppointments');
  };

  const navigateToOrganDonation = () => {
    // Navigate to the Organ Donation Facilitation screen
    navigation.navigate('OrganDonation');
  };

  const navigateToNearbyHospitals = () => {
    // Navigate to the Nearby Hospital Discovery screen
    navigation.navigate('NearbyHospitals');
  };

  const navigateToMedicationReminders = () => {
    // Navigate to the Medication Reminders screen
    navigation.navigate('MedicationReminders');
  };

 return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} onPress={navigateToChatbot}>
          <Image
            source={require('../assets/images/drug.png')}
            style={styles.gridImage}
          />
          <Text style={styles.gridText}>Ayurvedic Medicine Recommendations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={navigateToMentalHealthChatbot}>
          <Image
            source={require('../assets/images/mental-health.png')}
            style={styles.gridImage}
          />
          <Text style={styles.gridText}>Mental Health Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} onPress={navigateToDoctorAppointments}>
          <Image
            source={require('../assets/images/medical-appointment.png')}
            style={styles.gridImage}
          />
          <Text style={styles.gridText}>Doctor Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={navigateToOrganDonation}>
          <Image
            source={require('../assets/images/organ-donation.png')}
            style={styles.gridImage}
          />
          <Text style={styles.gridText}>Organ Donation Facilitation</Text>
        </TouchableOpacity>
 </View>
        {/* Combine the last two items in a single line */}
 <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem} onPress={navigateToNearbyHospitals}>
            <Image
              source={require('../assets/images/destination.png')}
              style={styles.gridImage}
            />
            <Text style={styles.gridText}>Nearby Hospital Discovery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={navigateToMedicationReminders}>
            <Image
              source={require('../assets/images/reminder.png')}
              style={styles.gridImage}
            />
            <Text style={styles.gridText}>Medication Reminders</Text>
          </TouchableOpacity>
       </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
    width: '80%',
    maxWidth: 400,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
 gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 400,
    marginTop: 40,
    
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    // backgroundColor: '#3498db',
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems:'center',
   
  },
  gridImage: {
    width: '50%',
    height: '50%', // Slightly increased height for better visibility
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop:20
  },
  gridText: {
    color: '#3498db',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15, // Increased font size for better readability
    padding: 12, // Adjusted padding for better visibility
  },
  singleLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20,
  },});

export default HomeScreen;
