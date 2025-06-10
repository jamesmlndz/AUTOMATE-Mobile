import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AccountCreatedStyle } from '../../AllStyles/AccountCreatedStyle';

const AccountCreated = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/AccountCreatedBG (1).png')} // Adjust path to your image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={AccountCreatedStyle.container}>
        <Text style={AccountCreatedStyle.title}>ACCOUNT</Text>
        <Text style={AccountCreatedStyle.title}>CREATED</Text>
        <TouchableOpacity
          style={AccountCreatedStyle.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={AccountCreatedStyle.buttonText}>BACK TO LOGIN</Text>
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

export default AccountCreated;
