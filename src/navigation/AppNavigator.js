import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import LoginScreen from '../auth/LoginScreen';
import DoctorAppointments from '../Screens/DoctorAppointmentsScreen';
import OrganDonation from '../Screens/OrganDonationScreen';
import NearbyHospitals from '../Screens/NearbyHospitalsScreen';
import MedicationReminders from '../Screens/MedicationRemindersScreen';
import SignupScreen from '../auth/SignupScreen';
import ChatbotScreen from '../Screens/ChatbotScreen';
import BottomTabNavigator from './BottomTabNav';
import AddMedicineScreen from '../Screens/AddMedicineScreen';
import BloodDonationScreen from '../Screens/BloodDonationScreen';
import EditMedicine from '../Screens/EditMedicine';
import OrganDonations from '../Screens/OrganDonation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookAppointment from '../Screens/bookappoint';
import ChatbotScreenM from '../Screens/ChatBotScreenM';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Tabs" component={BottomTabNavigator}options={{ headerShown: false }}/>
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Mental Health Bot" component={ChatbotScreenM} />
        <Stack.Screen name="DoctorAppointments" component={DoctorAppointments} />
        <Stack.Screen name="OrganDonation" component={OrganDonation} />
        <Stack.Screen name="NearbyHospitals" component={NearbyHospitals} />
        <Stack.Screen name="MedicationReminders" component={MedicationReminders} />
        <Stack.Screen name="AddMedicine" component={AddMedicineScreen}/>
        <Stack.Screen name="BloodDonation" component={BloodDonationScreen}/>
        <Stack.Screen name="EditMedicine" component={EditMedicine}/>
        <Stack.Screen name="OrganDonations" component={OrganDonations}/>
        <Stack.Screen name="BookAppointment" component={BookAppointment}/>
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkUserToken = async () => {
      try {
        // Check if the user token is available in AsyncStorage
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          // User token is available, navigate to the home screen
          navigation.navigate('Tabs');
        } else {
          // User token is not available, navigate to the login screen
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking user token:', error);
        // Handle the error as needed, e.g., navigate to the login screen
        navigation.navigate('Login');
      }
    };

    // Simulate a delay for the splash screen (e.g., 2 seconds)
    const splashTimeout = setTimeout(() => {
      checkUserToken();
    }, 2000);

    // Clean up the timeout on unmount
    return () => clearTimeout(splashTimeout);
  }, [navigation]);

  return (
    <ImageBackground style={{ flex: 1, alignContent: 'center' }} source={require('../assets/images/dhan.png')} />
  );
}

export default AppNavigator;