import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,Alert,
  TouchableOpacity,
} from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";

const BloodDonationScreen = () => {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("O+");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [recentDonation, setRecentDonation] = useState(false);
  const [hasDisease, setHasDisease] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
    const [hospitalData, setHospitalData] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
    const navigation = useNavigation();



  useEffect(() => {
  const fetchHospitalData = async () => {
    try {
      const response = await fetch(
        "https://healthbybyteblitz.twilightparadox.com/api/auth/hospitalfetch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Adjust the body according to the API requirements
          body: JSON.stringify({
            // Include any necessary parameters for the POST request
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHospitalData(data);
      } else {
        console.error(
          "Error fetching hospital data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error.message);
    }
  };

  fetchHospitalData();
}, []);
  const submitForm = async () => {
    try {
      const apiUrl = "https://healthbybyteblitz.twilightparadox.com/api/auth/blooddonation";
      const formData = {
        name,
        blood_type: bloodType,
        contact_number: contactNumber,
        state: selectedState,
        city: selectedCity,
        recent_donation: recentDonation,
        has_disease: hasDisease,
        birth_date: birthDate.toISOString().split("T")[0],
        hospital_id: selectedHospital, // Include selected hospital ID
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

if (response.ok) {
        const responseData = await response.json();
        console.log("API Response:", responseData);
        Alert.alert(
          "Blood Donation Form Submitted",
          "Thank you for your donation!"
        );

        // Navigate to the home screen upon successful submission
        navigation.navigate("Tabs");
        // Navigate to the home screen upon successful submission
        navigation.navigate("Tabs"); // Replace "Home" with the name of your home screen
      } else {
        // Handle error, show an error message
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setBirthDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Donation Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Select Blood Type:</Text>
      <RNPicker
        style={styles.picker}
        selectedValue={bloodType}
        onValueChange={(value) => setBloodType(value)}
      >
        <RNPicker.Item label="O+" value="O+" />
        <RNPicker.Item label="A+" value="A+" />
        <RNPicker.Item label="B+" value="B+" />
        <RNPicker.Item label="AB+" value="AB+" />
      </RNPicker>
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Select State:</Text>
      <RNPicker
        style={styles.picker}
        selectedValue={selectedState}
        onValueChange={(value) => setSelectedState(value)}
      >
        <RNPicker.Item label="Maharashtra" value="Maharashtra" />
        <RNPicker.Item label="Karnataka" value="Karnataka" />
        <RNPicker.Item label="Tamil Nadu" value="Tamil Nadu" />
      </RNPicker>
       <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Hospital:</Text>
        <RNPicker
          style={styles.picker}
          selectedValue={selectedHospital}
          onValueChange={(value) => setSelectedHospital(value)}
        >
          {hospitalData.map((hospital) => (
            <RNPicker.Item
              key={hospital.id}
              label={hospital.name}
              value={hospital.id}
            />
          ))}
        </RNPicker>
      </View>
      <Text style={styles.label}>Select City:</Text>
      <RNPicker
        style={styles.picker}
        selectedValue={selectedCity}
        onValueChange={(value) => setSelectedCity(value)}
      >
        <RNPicker.Item label="Mumbai" value="Mumbai" />
        <RNPicker.Item label="Bengaluru" value="Bengaluru" />
        <RNPicker.Item label="Chennai" value="Chennai" />
      </RNPicker>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={recentDonation}
          onValueChange={() => setRecentDonation(!recentDonation)}
        />
        <Text style={styles.checkboxLabel}>Recent Blood Donation</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={hasDisease}
          onValueChange={() => setHasDisease(!hasDisease)}
        />
        <Text style={styles.checkboxLabel}>Do you have any diseases?</Text>
      </View>
      <View style={styles.datePickerContainer}>
        <Text style={styles.label}>Select Birth Date:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {birthDate.toLocaleDateString("en-US")}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
   
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "red", // Updated text color
  },
  input: {
    height: 40,
    borderColor: "#ecf0f1",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 370,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
    color: "#333", // Updated text color
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start",
    color: "black", // Updated text color
  },
  picker: {
    height: 40,
    width: 370,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
    color: "#333", // Updated text color
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
   justifyContent:"flex-start"
  },
  checkboxLabel: {
    fontSize: 16,
    color: "black", // Updated text color
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  datePicker: {
    height: 40,
    width: 370,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#3498db", // Updated text color
  },
  submitButton: {
    backgroundColor: "#e74c3c", // Updated submit button color
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff", // Updated text color
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BloodDonationScreen;