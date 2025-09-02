import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "../../AllStyles/StartScreen1"; // ✅ Use same styles as StartScreen1
import { useNavigation } from "@react-navigation/native";

const StartScreen2 = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/StartBG1 (1).png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Track Repairs</Text>

        {/* Image */}
        <Image
          source={require("../../../assets/StartScreen2.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Stay Updated on Every Service Step
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Know exactly what’s happening with your vehicle.
          Get real-time updates from inspection to completion.
        </Text>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StartScreen3")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartScreen2;
