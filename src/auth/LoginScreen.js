import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://healthbybyteblitz.twilightparadox.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        // Handle error, e.g., display an error message to the user
        Alert.alert('Login failed');
        return;
      }

      // Assuming the response contains a token or some indication of successful login
      const result = await response.json();

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('userToken', result.token);

      // Handle the result as needed, e.g., navigate to another screen
      Alert.alert('Login successful');
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')} // Replace with your own background image
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back!</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#000"
            onChangeText={handleUsernameChange} // Attach the callback for username changes
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#000"
            onChangeText={handlePasswordChange} // Attach the callback for password changes
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.signupText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(290, 250, 290, 0.7)', 
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
  },
  input: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#000',
    backgroundColor: 'transparent',
  },
  loginButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    color: '#3498db',
    textAlign: 'center',
  },
});

export default LoginScreen;
