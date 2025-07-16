import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../AllStyles/Services style/AllServicesStyle";
import { formatToPHP } from "../../../utils/formatters";

export default function ServiceDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;
  console.log(service);
  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image source={{ uri: service.image }} style={styles.serviceImage} />

        <View style={styles.infoCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.serviceTitle}>{service.name}</Text>
              <Text style={styles.locationText}>
                Tierodman Auto Center, Makati
              </Text>
            </View>
            {/* <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>4.5/5</Text>
              <FontAwesome name="star" size={16} color="#0A2E5C" />
            </View> */}
          </View>
          <Text style={styles.description}>{service.description}</Text>
          {/* Price range */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Price Range:</Text>
            <Text style={styles.priceValue}>
              {formatToPHP(service.rangeMin)} - {formatToPHP(service.rangeMax)}
            </Text>
          </View>
          {/* Estimated completion time */}
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Est. Completion:</Text>
            <Text style={styles.timeValue}>{service.ETC || 30} minutes</Text>
          </View>
        </View>

        <Text style={styles.inquiryHeader}>Call for inquiries</Text>
        <View style={styles.inquiryCard}>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Noreen+Diaz&background=0A2E5C&color=fff",
            }}
            style={styles.profileImage}
          />
          <View style={styles.providerInfo}>
            <Text style={styles.providerName}>Noreen Diaz</Text>
            <Text style={styles.providerRole}>Supervisor</Text>
          </View>
          <View style={styles.contactIcons}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `sms:${phoneNumber}?body=${encodeURIComponent(smsBody)}`
                )
              }
              style={styles.iconSpacing}
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={20}
                color="#0A2E5C"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            >
              <Ionicons name="call-outline" size={20} color="#0A2E5C" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("Booking", { service: service.name })
          }
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
