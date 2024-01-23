import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform ,Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useNavigation, useRoute } from '@react-navigation/native';

const BookAppointmentScreen = () => {
  const route = useRoute();
  const { hospitalName, hospitalId } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [appointmentReason, setAppointmentReason] = useState('');
  const [patientName, setPatientName] = useState('');
  const [gender, setGender] = useState(0); // 0 for male, 1 for female (assuming these are your values)

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    setSelectedDate(date || new Date());
  };

  const handleAppointmentBooking = () => {
    // Prepare the request body
    const requestBody = {
      hospital_id:hospitalId,
    
      selected_date: selectedDate.toISOString().split('T')[0],
      appointment_reason:appointmentReason,
      patient_name:patientName,
      gender: gender === 0 ? 'male' : 'female',
    };

    console.log(requestBody);
    // Make the API call to your Node.js server to add the appointment to the MySQL table
    fetch('https://healthbybyteblitz.twilightparadox.com/api/auth/bookAppointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        // console.log('Appointment booked successfully:', data);
        Alert.alert(
            "Appointment Booked",
            "Thank you!"
          );
  
          // Navigate to the home screen upon successful submission
          navigation.navigate("Tabs");
        // You can add any additional logic here after successful booking
      })
      .catch(error => {
        // console.error('Error booking appointment:', error);
      });
  };

  const radioProps = [
    { label: 'Male  ', value: 0 },
    { label: 'Female', value: 1 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Book Appointment at ${hospitalName}`}</Text>

      <Text style={styles.label}>Hospital ID:</Text>
      <TextInput
        style={styles.input}
        value={hospitalId.toString()} // Assuming hospitalId is a number
        editable={false}
      />

      <Text style={styles.label}>Select Date:</Text>
      <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
        <Text>{selectedDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Reason for Appointment:</Text>
      <TextInput
        style={styles.input}
        value={appointmentReason}
        onChangeText={text => setAppointmentReason(text)}
      />

      <Text style={styles.label}>Your Name:</Text>
      <TextInput
        style={styles.input}
        value={patientName}
        onChangeText={text => setPatientName(text)}
      />

      <Text style={styles.label}>Gender:</Text>
      {/* Replace RadioForm with Picker */}
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Male" value={0} />
        <Picker.Item label="Female" value={1} />
      </Picker>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: '#3498db' }]}
        onPress={handleAppointmentBooking}
      >
        
        <Text style={styles.submitButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ecf0f1',
  },
  datePickerContainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
  },
  radioForm: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookAppointmentScreen;