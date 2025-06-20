import React from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../AllStyles/StartScreen3";
import { useNavigation } from "@react-navigation/native";

const StartScreen3 = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
    source={require("../../../assets/StartBG1 (1).png")}
    style={styles.background} // Make sure this style exists!
    resizeMode="cover"
  >
    <View style={styles.container}>
      <Text style={styles.title}>Track your Service</Text>

      <ImageBackground source={require('../../../assets/StartBG.png')} 
    style={styles.background}     
    resizeMode="cover"
    ></ImageBackground>

      <Image
        source={require("../../../assets/StartScreen3.png")} // Use your actual image path
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Stay Informed Every Step</Text>

      <Text style={styles.description}>
        Monitor the status of your car in real-time. Get updates on repairs, payments, and
        completion all in one place.
      </Text>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

export default StartScreen3;
