// frontend/screens/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyle from '../../AllStyles/LoginStyle';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/login', { // use your IP or 10.0.2.2
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        navigation.navigate('HomePage', { userId: data.userId });
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to server.");
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/LoginBG.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.container}>
        <View style={LoginStyle.overlay}>
          <Text style={LoginStyle.title}>LOGIN TO YOUR ACCOUNT</Text>
        </View>

        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity style={LoginStyle.ClickloginButton}>
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={LoginStyle.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={LoginStyle.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Email</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Password</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={LoginStyle.sendCodeButton}
          onPress={validateLogin}
        >
          <Text style={LoginStyle.sendCodeButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Login;
