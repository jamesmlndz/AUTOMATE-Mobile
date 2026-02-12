import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ScrollView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../AllStyles/Services style/AllServicesStyle";
import { formatToPHP } from "../../../utils/formatters";

export default function ServiceDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;
  const phoneNumber = "09171234567";
  const smsBody = `Hi! I'm interested in your ${service.name} service.`;

  return (
    <ImageBackground
      source={require("../../../assets/tierodmanbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={localStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        {/* Service Image */}
        <View style={localStyles.imageWrapper}>
          <Image source={{ uri: service.image }} style={localStyles.serviceImage} />
        </View>

        {/* Service Info Card */}
        <View style={localStyles.infoCard}>
          <View style={localStyles.headerSection}>
            <Text style={localStyles.serviceTitle}>{service.name}</Text>
            <Text style={localStyles.locationText}>
              Tierodman Auto Center, Makati
            </Text>
          </View>

          <Text style={localStyles.description}>{service.description}</Text>

          {/* Price */}
          <View style={localStyles.detailBox}>
            <Text style={localStyles.detailLabel}>Price Range</Text>
            <Text style={localStyles.detailValue}>
              {formatToPHP(service.rangeMin)} - {formatToPHP(service.rangeMax)}
            </Text>
          </View>

          {/* Estimated Time */}
          <View style={localStyles.detailBox}>
            <Text style={localStyles.detailLabel}>Estimated Time</Text>
            <Text style={localStyles.detailValue}>
              {service.ETC || 30} mins
            </Text>
          </View>
        </View>

        {/* Inquiry Section */}
        <Text style={localStyles.inquiryHeader}>Call for inquiries</Text>
        <View style={localStyles.inquiryCard}>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Noreen+Diaz&background=0A2E5C&color=fff",
            }}
            style={localStyles.profileImage}
          />
          <View style={localStyles.providerInfo}>
            <Text style={localStyles.providerName}>Noreen Diaz</Text>
            <Text style={localStyles.providerRole}>Supervisor</Text>
          </View>

          <View style={localStyles.contactIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `sms:${phoneNumber}?body=${encodeURIComponent(smsBody)}`
                )
              }
              style={localStyles.iconSpacing}
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={20}
                color="#0A2E5C"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
              <Ionicons name="call-outline" size={20} color="#0A2E5C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          style={localStyles.bookButton}
          onPress={() =>
            navigation.navigate("Booking", { service: service.name })
          }
        >
          <Text style={localStyles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const localStyles = {
  scrollContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
    zIndex: 10,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 90,
  },
  serviceImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  infoCard: {
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerSection: {
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 22,
    color: "#0A2E5C",
    fontFamily: "Poppins-Bold",
  },
  locationText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
    fontFamily: "Poppins-Bold",
  },
  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginVertical: 10,
    fontFamily: "Poppins-Regular",
  },
  detailBox: {
    backgroundColor: "#f4f6fb",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#0A2E5C",
    fontFamily: "Poppins-Bold",
  },
  detailValue: {
    fontSize: 15,
    color: "#111827",
    marginTop: 2,
    fontFamily: "Poppins-Regular",
  },
  inquiryHeader: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    marginTop: 25,
    marginBottom: 10,
  },
  inquiryCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  providerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  providerName: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#0A2E5C",
  },
  providerRole: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#6b7280",
  },
  contactIcons: {
    flexDirection: "row",
  },
  iconSpacing: {
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: "#0A2E5C",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
};
