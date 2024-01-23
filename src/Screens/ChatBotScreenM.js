import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const ChatbotScreenM = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    // Scroll to the bottom of the chat whenever messages change
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const storeMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) {
      return;
    }

    const userMessage = { role: 'user', content: userInput };

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    try {
      // Make API request to the chatbot API with user input
      const response = await fetch('https://healthbybyteblitz.twilightparadox.com/api/auth/chatm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.ok) {
        const result = await response.json();
        const message = result.fulfillmentText;

        // Add assistant's message to the chat
        const assistantMessage = { role: 'assistant', content: message };
        storeMessage(assistantMessage);

        // Scroll to the bottom of the chat
        scrollViewRef.current.scrollToEnd({ animated: true });
      } else {
        console.error('Error in API response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/Untitled1.png')} // Replace with the path to your background image
    style={{ flex: 1, resizeMode: 'cover' }}>
    <View style={{ flex: 1, marginBottom: 40 }}>
      {/* Chat messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              flexDirection: message.role === 'assistant' ? 'row-reverse' : 'row',
              marginBottom: 8,
              alignItems: 'flex-start',
            }}
          >
            {message.role === 'assistant' && (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#4CAF50',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}
              >
                <Image
                  source={require('../assets/images/mortar.png')}
                  style={{ width: 20, height: 20, tintColor: 'white' }}
                />
              </View>
            )}
            <View
              style={{
                maxWidth: '70%',
                padding: 10,
                borderRadius: 8,
                backgroundColor: message.role === 'assistant' ? '#4CAF50' : '#E0E0E0',
              }}
            >
              <Text style={{ color: message.role === 'assistant' ? 'white' : 'black' }}>
                {message.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* User input */}
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            color: 'black',
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
          }}
          value={userInput}
          placeholder="Type your message..."
          onChangeText={(text) => setUserInput(text)}
        />
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: '#4CAF50',
            borderRadius: 8,
          }}
          onPress={sendMessage}
        >
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

export default ChatbotScreenM;
