import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyle from '../../AllStyles/LoginStyle';

const Verify = ({ route }) => {
  const navigation = useNavigation();
  const userInfo = route?.params || {};
  const [otp, setOtp] = useState(Array(4).fill(''));
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userInfo.email,
          otp: fullOtp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account verified!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Verification failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while verifying.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/GetBG.png')} // Make sure this path is correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.verifycontainer}>
        <Text style={LoginStyle.verifyTitle}>Verify Your Email</Text>
        <Text style={LoginStyle.verifyText}>A 4-digit code was sent to:</Text>
        <Text style={LoginStyle.emailText}>{userInfo.email}</Text>

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

        <TouchableOpacity style={LoginStyle.getButton} onPress={handleVerify}>
          <Text style={LoginStyle.sendCodeButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Resend code functionality here')}>
          <Text style={LoginStyle.resendText}>Didn't get the code? Resend</Text>
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

export default Verify;
