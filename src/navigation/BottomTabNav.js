import React, { useEffect } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { BackHandler } from 'react-native';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../Screens/HomeScreen';
import ChatbotScreen from '../Screens/ChatbotScreen';
import OrganDonation from '../Screens/OrganDonationScreen';
import NearbyHospitals from '../Screens/NearbyHospitalsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Homee');
      return true;
    });
    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#fff',
          borderTopWidth: 0,
          bottom: 0,
          right: 0,
          left: 0,
          height: 50,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconComponent;
          let iconName;

          if (route.name === 'Homee') {
            iconName = focused ? 'home' : 'home-outline';
            iconComponent = <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Chatbot') {
            iconName = focused ? 'leaf' : 'leaf-outline';
            iconComponent = <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Organdonation') {
            iconName = focused ? 'hand-holding-heart' : 'hand-holding-heart';
            iconComponent = <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'NearbyHospitals') {
            iconName = focused ? 'hospital-o' : 'hospital-o';
            iconComponent = <FontAwesome name={iconName} size={size} color={color} />;
          }

          return iconComponent;
        },
      })}
    >

      <Tab.Screen
        name={'Homee'}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Hooommeeee',
          title: 'Dhanvantari',
          headerShown: true,
          headerStyle: { height: 50 },
          headerLeft: () => {
            return (
              <TouchableOpacity >
                <Ionicons
                  name={Platform.OS === 'ios' ? 'menu' : 'menu-outline'}
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={'Chatbot'}
        component={ChatbotScreen}
        options={{
          tabBarLabel: '',
          title: 'Ayurvedic Chatbot',
          headerShown: true,
          headerStyle: { height: 50 },
          
          headerLeft: () => {
            return (
              <TouchableOpacity >
                <Ionicons
                  name={Platform.OS === 'ios' ? 'menu' : 'menu-outline'}
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={'Organdonation'}
        component={OrganDonation}
        options={{
          tabBarLabel: 'OrganDonation',
          title: 'OrganDonation',
          headerShown: true,
          headerStyle: { height: 50 },
          headerLeft: () => {
            return (
              <TouchableOpacity >
                <Ionicons
                  name={Platform.OS === 'ios' ? 'menu' : 'menu-outline'}
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name={'NearbyHospitals'}
        component={NearbyHospitals}
        options={{
          tabBarLabel: 'NearbyHospitals',
          title: 'NearbyHospitals',
          headerShown: true,
          headerStyle: { height: 50 },
          headerLeft: () => {
            return (
              <TouchableOpacity >
                <Ionicons
                  name={Platform.OS === 'ios' ? 'menu' : 'menu-outline'}
                  size={30}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 50,
  },
});