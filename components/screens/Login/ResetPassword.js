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
import { useNavigation, useRoute } from '@react-navigation/native';
import LoginStyle from '../../AllStyles/LoginStyle';

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://10.0.2.2:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password has been reset.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Reset failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Server connection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/LoginBG.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.container}>
        <Text style={LoginStyle.title}>Reset Your Password</Text>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>New Password</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Confirm Password</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Confirm New Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={LoginStyle.sendCodeButton}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text style={LoginStyle.sendCodeButtonText}>
            {isLoading ? 'Resetting...' : 'RESET PASSWORD'}
          </Text>
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

export default ResetPassword;
