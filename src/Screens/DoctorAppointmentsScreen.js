import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HospitalList = () => {
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://healthbybyteblitz.twilightparadox.com/api/auth/hospitalfetch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        } else {
          console.error('Error fetching data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const renderHospitalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookAppointment', { hospitalId: item.id, hospitalName: item.name })}
    >
      <View style={styles.rowContainer}>
        <Text style={styles.hospitalName}>{item.name}</Text>
      </View>
      <Text style={styles.hospitalInfo}>{`Phone: ${item.phone}`}</Text>
      <Text style={styles.hospitalInfo}>{`City: ${item.city}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Hospitals</Text>
      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHospitalItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  hospitalInfo: {
    fontSize: 14,
    color: '#555',
  },
});

export default HospitalList;
