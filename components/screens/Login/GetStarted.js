import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const GetStarted = () => {
  const nPage = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getButton = () => {
    nPage.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../../assets/tierodmanbg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Logo */}
        <Animated.Image
          source={require('../../../assets/Logo.png')}
          style={[
            styles.logo,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
          resizeMode="contain"
        />

        {/* Title */}
        <Animated.Text
          style={[
            styles.title,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          Welcome to AutoMate
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text
          style={[
            styles.subtitle,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          Manage your bookings, services, and appointments with ease.
        </Animated.Text>

        {/* Get Started Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <TouchableOpacity
            style={styles.getButton}
            onPress={getButton}
            activeOpacity={0.9}
          >
            <Text style={styles.getText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

// ==========================
// STYLES BELOW
// ==========================
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: '#ddd',
    textAlign: 'center',
    marginBottom: height * 0.35, // keeps the button lower on the screen
    paddingHorizontal: 10,
  },

  getButton: {
    backgroundColor: '#FFB703',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  getText: {
    width: 200,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: '#fff',
    textAlign: 'center',
  },
});
