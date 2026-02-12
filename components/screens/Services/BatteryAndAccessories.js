import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../AllStyles/Services style/AllServicesStyle';

export default function BatteryAndAccessories() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/tierodmanbg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Service Image */}
        <Image
          source={require('../../../assets/services/Battery and accessories.jpg')}
          style={styles.serviceImage}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.serviceTitle}>Battery and Accessories</Text>
              <Text style={styles.locationText}>Tierodman Auto Center, Makati</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.5/5</Text>
              <FontAwesome name="star" size={16} color="#0A2E5C" />
            </View>
          </View>
          <Text style={styles.description}>
            battery and accessories services ensure your vehicle’s electrical systems are supported by a
            reliable power source. From <Text style={styles.highlight}>battery replacement</Text> to checking
            <Text style={styles.highlight}>charging systems and wiring</Text>, we provide solutions to keep
            your car's electrical system functioning properly.
          </Text>
        </View>

        {/* Inquiry Section */}
        <Text style={styles.inquiryHeader}>Call for inquiries</Text>
        <View style={styles.inquiryCard}>
          <Image
            source={{ uri: 'https://i.ibb.co/QNnD2RJ/profile.png' }}
            style={styles.profileImage}
          />
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>Noreen Diaz</Text>
            <Text style={styles.providerRole}>Supervisor</Text>
          </View>
          <View style={styles.contactIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(smsBody)}`)
              }
              style={styles.iconSpacing}
            >
              <Ionicons name="chatbox-ellipses-outline" size={20} color="#0A2E5C" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
              <Ionicons name="call-outline" size={20} color="#0A2E5C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
