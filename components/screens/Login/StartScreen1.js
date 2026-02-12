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
import styles from "../../AllStyles/StartScreen1";
import { useNavigation } from "@react-navigation/native";

const StartScreen1 = () => {
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

    // Change background every 5 seconds
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
      {/* Dark Overlay for readability */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Title */}
        <Animated.Text
          style={[
            styles.title,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          Welcome
        </Animated.Text>

        {/* Illustration */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Image
            source={require("../../../assets/StartScreen1.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Reliable Auto Care, Right at Your Fingertips
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          With our on-demand vehicle service app, booking car repairs and
          maintenance has never been easier. Let professionals handle your car
          quickly and hassle free.
        </Text>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("StartScreen2")}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartScreen1;
