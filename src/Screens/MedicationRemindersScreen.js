// MedicationReminders.js

import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Notifications } from 'react-native-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddMedicineScreen from "./AddMedicineScreen";
import backgroundImg from '../assets/images/background.png';

// MedicineCard component for rendering each medicine item
const MedicineCard = ({ medicine, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.cardText}>{medicine.name} - {medicine.dosage}</Text>
      <Text style={styles.cardText}>
        Reminder Time: {medicine.reminderTime ? medicine.reminderTime.toLocaleTimeString() : 'N/A'}
      </Text>
    </TouchableOpacity>
  );
};

const MedicationReminders = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Configure notifications when component mounts
    Notifications.registerRemoteNotifications();
    loadMedicinesFromStorage();
  }, []);

  const addMedicine = async (medicine) => {
    const updatedMedicines = [...medicines, medicine];
    setMedicines(updatedMedicines);
    scheduleNotification(medicine);
    await saveMedicinesToStorage(updatedMedicines);
  };

  const editMedicine = async (index, updatedMedicine) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index] = updatedMedicine;
    setMedicines(updatedMedicines);
    navigation.goBack();
    await saveMedicinesToStorage(updatedMedicines);
  };

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const scheduleNotification = (medicine) => {
    const notificationBody = `It's time to take ${medicine.name} - ${medicine.dosage}`;

    Notifications.postLocalNotification({
      title: "Medication Reminder",
      body: notificationBody,
      payload: {},
      silent: false,
    });
  };
  const fetchTemporaryData = () => {
    // Temporary data for demonstration purposes
    const temporaryData = [
      { name: 'Sinarest', dosage: '100mg', reminderTime: new Date() },
      { name: 'Crocin', dosage: '200mg', reminderTime: new Date() },
      { name: 'Paracetamol', dosage: '10mg', reminderTime: new Date() },
      { name: 'Cough Syrup', dosage: '20mg', reminderTime: new Date() },
      { name: 'B complex', dosage: '10ml', reminderTime: new Date() },
      { name: 'O2', dosage: '20mg', reminderTime: new Date() },
      // Add more temporary medicines as needed
    ];

    setMedicines(temporaryData);
  };
  const loadMedicinesFromStorage = async () => {
    try {
      const storedMedicines = await AsyncStorage.getItem('medicines');
      if (storedMedicines) {
        const parsedMedicines = JSON.parse(storedMedicines);

        // Ensure that each medicine has a valid Date object for reminderTime
        const sanitizedMedicines = parsedMedicines.map(medicine => ({
          ...medicine,
          reminderTime: medicine.reminderTime ? new Date(medicine.reminderTime) : null,
        }));

        setMedicines(sanitizedMedicines);
      }
    } catch (error) {
      console.error('Error loading medicines from AsyncStorage:', error);
    }
  };

  const saveMedicinesToStorage = async (updatedMedicines) => {
    try {
      await AsyncStorage.setItem('medicines', JSON.stringify(updatedMedicines));
    } catch (error) {
      console.error('Error saving medicines to AsyncStorage:', error);
    }
  };

  const fetchDataFromApi = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your actual API endpoint
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.background}>
      <View style={styles.container}>
        {/* Section for Adding Medicine */}
        <View style={styles.addButtonContainer}>
          <Button
            title="Add Medicine"
            onPress={() => navigation.navigate('AddMedicine', { addMedicine })}
          />
        </View>
        {/* Button for Fetching Data from API */}
        <Button
          title="Show Doctor's Medicines"
          onPress={fetchTemporaryData}

          disabled={isLoading}
        />
        {/* Section for Displaying Medicines */}
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={medicines}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <MedicineCard
                medicine={item}
                onPress={() => navigation.navigate("EditMedicine", { index, medicine: item, editMedicine })}
              />
            )}
          />
        )}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  addButtonContainer: {
    marginTop:20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 240, 225, 0.7)',
    marginBottom: 10,
    marginTop:20,
    padding: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
});

export default MedicationReminders;
