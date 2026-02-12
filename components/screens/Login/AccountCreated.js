import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  Animated, 
  StatusBar,
  Image,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AccountCreatedStyle } from '../../AllStyles/AccountCreatedStyle';

const { width } = Dimensions.get('window');

const AccountCreated = () => {
  const navigation = useNavigation();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/tierodmanbg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.overlay}>
        <Animated.View style={[
          styles.contentBox, 
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}>
          
          {/* SHOP LOGO INSTEAD OF CHECK ICON */}
          <View style={styles.logoWrapper}>
            <Image 
              source={require('../../../assets/Logo.png')} // Verify this path
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[AccountCreatedStyle.title, styles.titleSmall]}>ACCOUNT</Text>
            <Text style={[AccountCreatedStyle.title, styles.titleLarge]}>CREATED</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>Welcome to AutoMate. Your account is ready for your first service.</Text>
          </View>

          {/* RE-SIZED SMALLER BUTTON */}
          <TouchableOpacity
            style={styles.compactButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.compactButtonText}>CONTINUE TO LOGIN</Text>
            <MaterialCommunityIcons name="arrow-right" size={18} color="#0A2146" />
          </TouchableOpacity>
          
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 33, 70, 0.8)', // Slightly darker for logo pop
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  contentBox: {
    alignItems: 'center',
    width: '100%',
  },
  logoWrapper: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoImage: {
    width: 90,
    height: 90,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleSmall: {
    fontSize: 18,
    letterSpacing: 6,
    color: 'rgba(255,183,3, 0.9)', // Using brand gold for "ACCOUNT"
    fontFamily: 'Poppins-Bold',
  },
  titleLarge: {
    fontSize: 42,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginTop: -5,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginVertical: 15,
    opacity: 0.3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
  },
  // SMALLER, REFINED BUTTON
  compactButton: {
    backgroundColor: '#FFB703',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%', // Not full width, looks cleaner
    height: 54,   // Reduced from 65
    borderRadius: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  compactButtonText: {
    color: '#0A2146',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  }
});

export default AccountCreated;

