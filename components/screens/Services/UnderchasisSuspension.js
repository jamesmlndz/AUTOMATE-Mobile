// UnderchasisSuspension.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../AllStyles/Services style/AllServicesStyle';

export default function UnderchasisSuspension() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/automatebg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={require('../../../assets/services/Underchasis Suspension.jpeg')}
          style={styles.serviceImage}
        />

        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.serviceTitle}>Underchasis / Suspension</Text>
              <Text style={styles.locationText}>Tierodman Auto Center, Makati</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.5/5</Text>
              <FontAwesome name="star" size={16} color="#0A2E5C" />
            </View>
          </View>
          <Text style={styles.description}>
            Get a smooth and stable ride with our <Text style={styles.highlight}>underchassis and suspension service</Text>. Ensure safety and performance on every drive.
          </Text>
        </View>

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

        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
