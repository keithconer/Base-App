import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import Modal from 'react-native-modal'; // Import Modal

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Modal message to display

  useEffect(() => {
    // Simple test alert on component mount to check if alerts are working
    Alert.alert("Test Alert", "This is a test alert");
  }, []);

  const handleLogin = () => {
    let valid = true;
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    // Email validation
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    }

    // If validation passes, check against predefined accounts
    if (valid) {
      const predefinedAccounts = [
        { email: 'keithconer24@gmail.com', password: 'password123' },
        { email: 'keithbrian24@gmail.com', password: 'password456' },
      ];

      const account = predefinedAccounts.find(
        (account) => account.email === email
      );

      // If email is not found
      if (!account) {
        setEmailError('The email you entered is incorrect.');
        setModalMessage('The email you entered is incorrect.');
        setModalVisible(true);
        return;
      }

      // If password doesn't match the email
      if (account.password !== password) {
        setPasswordError('The password you entered is incorrect.');
        setModalMessage('The password you entered is incorrect.');
        setModalVisible(true);
        return;
      }

      // Successful login
      setModalMessage(`Welcome, ${email}`);
      setModalVisible(true); // Show modal with success message
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      {/* Custom button with icon */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.7}
        onPress={() => {
          console.log('Button pressed');
          handleLogin();
        }}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="log-in-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for feedback */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)} // Close modal when tapping outside
        onBackButtonPress={() => setModalVisible(false)} // Close on back button press
        backdropOpacity={0.5} // Add transparency to the background
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    width: '100%',  // Full width of the container
    marginTop: 20,  // Add spacing between button and the inputs
    backgroundColor: '#0077FF', // Instagram-like blue color
    paddingVertical: 12, // Padding for the button height
    alignItems: 'center',  // Center the content inside the button
    borderRadius: 4, // Rounded corners for the button
  },
  buttonContent: {
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16,
    marginLeft: 8, // Space between icon and text
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#0077FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
