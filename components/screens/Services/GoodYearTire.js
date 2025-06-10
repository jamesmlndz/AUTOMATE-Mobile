import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../AllStyles/Services style/AllServicesStyle';

export default function GoodYearTire() {
  const navigation = useNavigation(); // ✅ Fix: this was missing

  return (
    <ImageBackground
      source={require('../../../assets/automatebg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Image */}
        <Image
          source={require('../../../assets/services/Good Year Tires.png')} // ✅ Use require for local assets
          style={styles.serviceImage}
        />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.serviceTitle}>Change Oil</Text>
              <Text style={styles.locationText}>Tierodman Auto Center, Makati</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.5/5</Text>
              <FontAwesome name="star" size={16} color="#0A2E5C" />
            </View>
          </View>
          <Text style={styles.description}>
            change oil service is an essential part of vehicle maintenance that involves{' '}
            <Text style={styles.highlight}>draining the old engine oil</Text> and replacing it with{' '}
            <Text style={styles.highlight}>fresh, high-quality oil</Text> to keep the engine running smoothly.
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
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
