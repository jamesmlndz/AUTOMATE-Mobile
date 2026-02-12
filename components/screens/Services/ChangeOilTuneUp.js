import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../AllStyles/Services style/AllServicesStyle';

export default function ChangeOilTuneUp() {
  const navigation = useNavigation();

  // Phone number and smsBody for contact (you can adjust)
  const phoneNumber = "1234567890";
  const smsBody = "Hello, I have an inquiry about the Change Oil / Tune Up service.";

  return (
    <ImageBackground
      source={require('../../../assets/tierodmanbg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={require('../../../assets/services/Change Oil.jpg')}
          style={styles.serviceImage}
        />

        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.serviceTitle}>Change Oil / Tune Up</Text>
              <Text style={styles.locationText}>Tierodman Auto Center, Makati</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.5/5</Text>
              <FontAwesome name="star" size={16} color="#0A2E5C" />
            </View>
          </View>
          <Text style={styles.description}>
            Keep your vehicle in top shape with our <Text style={styles.highlight}>Change Oil and Tune-Up</Text> service. We ensure your engine stays healthy and efficient.
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

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { selectedService: 'Change Oil / Tune Up' })}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
