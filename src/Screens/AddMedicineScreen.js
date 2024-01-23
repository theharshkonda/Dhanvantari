import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker as RNPicker } from "@react-native-picker/picker";

const AddMedicineScreen = ({ route, navigation }) => {
  const { addMedicine } = route.params;

  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [medicineType, setMedicineType] = useState("Tablets");
  const [dosageUnit, setDosageUnit] = useState("Milligram");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeVisible, setSelectedTimeVisible] = useState(false);

  const handleAddMedicine = () => {
    if (medicineName && dosage) {
      const newMedicine = {
        name: medicineName,
        dosage,
        medicineType,
        dosageUnit,
        reminderTime: selectedDate,
      };
      addMedicine(newMedicine);
      navigation.goBack();
    }
  };

  const handleTimePicker = () => {
    setShowDatePicker(true);
    setSelectedTimeVisible(false);
  };

  const handleTimeChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedTimeVisible(true);
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={(text) => setMedicineName(text)}
      />
      <RNPicker
        selectedValue={medicineType}
        onValueChange={(itemValue) => setMedicineType(itemValue)}
        style={styles.picker}
      >
        <RNPicker.Item label="Tablets" value="Tablets" />
        <RNPicker.Item label="Liquids" value="Liquids" />
        <RNPicker.Item label="Injections" value="Injections" />
        <RNPicker.Item label="Topical Medications" value="Topical Medications" />
      </RNPicker>
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={dosage}
        onChangeText={(text) => setDosage(text)}
        keyboardType="numeric"
      />
      <RNPicker
        selectedValue={dosageUnit}
        onValueChange={(itemValue) => setDosageUnit(itemValue)}
        style={styles.picker}
      >
        <RNPicker.Item label="Milligram (mg)" value="Milligram" />
        <RNPicker.Item label="Microgram (mcg)" value="Microgram" />
        <RNPicker.Item label="Milliliter (ml)" value="Milliliter" />
        <RNPicker.Item label="Cubic centimeter (cc)" value="Cubic centimeter" />
        <RNPicker.Item label="Milligrams per milliliter (mg/ml)" value="Milligrams per milliliter" />
        <RNPicker.Item label="Micrograms per milliliter (mcg/ml)" value="Micrograms per milliliter" />
      </RNPicker>

      {selectedTimeVisible && (
        <Text style={styles.selectedTimeText}>
          Selected Reminder Time: {selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleTimePicker}>
        <Text style={styles.buttonText}>
          {selectedTimeVisible ? "Change Reminder Time" : "Set Reminder Time"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddMedicine}>
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8", // Light background color
  },
  input: {
    height: 40,
    borderColor: "#bdc3c7", // Light border color
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ecf0f1", // Light background color
  },
  picker: {
    marginBottom: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#ecf0f1", // Light background color
  },
  selectedTimeText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#3498db", // Theme color
  },
  button: {
    backgroundColor: "#3498db", // Theme color
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddMedicineScreen;
