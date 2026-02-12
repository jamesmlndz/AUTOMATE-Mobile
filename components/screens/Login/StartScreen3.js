import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import styles from "../../AllStyles/StartScreen1"; // ✅ Use same styles
import { useNavigation } from "@react-navigation/native";

const StartScreen3 = () => {
  const navigation = useNavigation();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  // Background Slideshow
  const backgrounds = [
    require("../../../assets/tierodmanbg.png"),
   
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    // Animate fade + slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    // Change background every 5s
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={backgrounds[bgIndex]} // slideshow background
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Title */}
        <Animated.Text
          style={[
            styles.title,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          Track your Service
        </Animated.Text>

        {/* Image */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Image
            source={require("../../../assets/StartScreen3.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Stay Informed Every Step</Text>

        {/* Description */}
        <Text style={styles.description}>
          Monitor the status of your car in real-time.{"\n"}
          Get updates on repairs, payments, and completion all in one place.
        </Text>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartScreen3;
