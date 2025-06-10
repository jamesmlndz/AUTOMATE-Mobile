import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginStyle from '../../AllStyles/LoginStyle'



const GetStarted=() =>{

  const nPage = useNavigation();

  const getButton=()=>{
    nPage.navigate('StartScreen1')
  }

  return (
    <ImageBackground source={require('../../../assets/GetBG.png')} 
    style={LoginStyle.background}
    resizeMode="cover"
    >
    <View style={LoginStyle.containers}>
      <View style={LoginStyle.overlay}>

      </View>
      <TouchableOpacity style={LoginStyle.getButton} onPress={getButton}>
            <Text style={LoginStyle.getText}>Get Started</Text>
          </TouchableOpacity>
    </View>
    
    </ImageBackground>
  )
}
export default GetStarted;