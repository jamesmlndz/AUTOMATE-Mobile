import React, { useRef, useState } from 'react';
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

const VerifyResetOtp = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit code.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5000/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP verified');
        navigation.navigate('ResetPassword', { email });
      } else {
        Alert.alert('Error', data.message || 'Invalid code.');
      }
    } catch (err) {
      Alert.alert('Error', 'Server error. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/GetBG.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.verifycontainer}>
        <Text style={LoginStyle.verifyTitle}>Verify Reset Code</Text>
        <Text style={LoginStyle.verifyText}>Check your email:</Text>
        <Text style={LoginStyle.emailText}>{email}</Text>

        <View style={LoginStyle.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={LoginStyle.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={LoginStyle.sendCodeButton} onPress={handleVerifyOtp}>
          <Text style={LoginStyle.sendCodeButtonText}>Verify Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Resend code logic goes here')}>
          <Text style={LoginStyle.resendText}>Didn't get it? Resend</Text>
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

export default VerifyResetOtp;
