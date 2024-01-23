import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Picker, StyleSheet, TouchableOpacity } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditMedicine = ({ route, navigation }) => {
  const { index, medicine, editMedicine } = route.params;
  const [editedMedicine, setEditedMedicine] = useState({ ...medicine });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(editedMedicine.reminderTime));

  useEffect(() => {
    setEditedMedicine({ ...medicine });
    setSelectedDate(new Date(medicine.reminderTime));
  }, [medicine]);

  const saveChanges = () => {
    editMedicine(index, { ...editedMedicine, reminderTime: selectedDate });
    navigation.navigate("MedicationReminders");
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={editedMedicine.name}
        onChangeText={(text) => setEditedMedicine({ ...editedMedicine, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosage"
        value={editedMedicine.dosage}
        onChangeText={(text) => setEditedMedicine({ ...editedMedicine, dosage: text })}
        keyboardType="numeric"
      />
      <RNPicker
        selectedValue={editedMedicine.medicineType}
        onValueChange={(itemValue) => setEditedMedicine({ ...editedMedicine, medicineType: itemValue })}
        style={styles.picker}
      >
        <RNPicker.Item label="Tablets" value="Tablets" />
        <RNPicker.Item label="Liquids" value="Liquids" />
        <RNPicker.Item label="Injections" value="Injections" />
        <RNPicker.Item label="Topical Medications" value="Topical Medications" />
      </RNPicker>
      <RNPicker
        selectedValue={editedMedicine.dosageUnit}
        onValueChange={(itemValue) => setEditedMedicine({ ...editedMedicine, dosageUnit: itemValue })}
        style={styles.picker}
      >
        <RNPicker.Item label="Milligram (mg)" value="Milligram" />
        <RNPicker.Item label="Microgram (mcg)" value="Microgram" />
        <RNPicker.Item label="Milliliter (ml)" value="Milliliter" />
        <RNPicker.Item label="Cubic centimeter (cc)" value="Cubic centimeter" />
        <RNPicker.Item label="Milligrams per milliliter (mg/ml)" value="Milligrams per milliliter" />
        <RNPicker.Item label="Micrograms per milliliter (mcg/ml)" value="Micrograms per milliliter" />
      </RNPicker>

      <TouchableOpacity style={styles.button} onPress={showDateTimePicker}>
        <Text style={styles.buttonText}>Set Reminder Time</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  input: {
    height: 40,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
  },
  picker: {
    marginBottom: 10,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#ecf0f1",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditMedicine;
