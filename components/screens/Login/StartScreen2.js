import React from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../AllStyles/StartScreen2";
import { useNavigation } from "@react-navigation/native";

const StartScreen2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book with Ease</Text>

      <ImageBackground source={require('../../../assets/StartBG.png')} 
    style={styles.background}
    resizeMode="cover"
    ></ImageBackground>

      <Image
        source={require("../../../assets/StartScreen2.png")} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Schedule Services in Seconds</Text>

      <Text style={styles.description}>
        Choose from a wide range of vehicle services from oil changes to full body repairs right from your phone. Just a few taps and you’re all set.
      </Text>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("StartScreen3")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen2;
