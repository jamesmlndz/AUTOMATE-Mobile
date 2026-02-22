import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ScrollView,
  FlatList,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../AllStyles/Services style/AllServicesStyle";
import { formatToPHP } from "../../../utils/formatters";

const { width, height } = Dimensions.get("window");

export default function ServiceDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;

  const phoneNumber = "09171234567";
  const smsBody = `Hi! I'm interested in your ${service.name} service.`;

  const images =
    service.imageUrls && service.imageUrls.length > 0
      ? service.imageUrls
      : [service.image]; // fallback single image

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const modalFlatListRef = useRef(null);

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 20));
    setActiveIndex(index);
  };

  const openModal = (index) => {
    setModalIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

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

        {/* Carousel */}
        <View style={localStyles.carouselContainer}>
          <FlatList
            data={images}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingHorizontal: 10,
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => openModal(index)}
                activeOpacity={0.9}
              >
                <Image source={{ uri: item }} style={localStyles.carouselImage} />
              </TouchableOpacity>
            )}
          />
          {/* Pagination Dots */}
          <View style={localStyles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  localStyles.dot,
                  { opacity: index === activeIndex ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Fullscreen Swipeable Modal */}
        <Modal visible={modalVisible} transparent={true}>
          <View style={localStyles.modalContainer}>
            <TouchableOpacity
              style={localStyles.modalCloseButton}
              onPress={closeModal}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            <FlatList
              ref={modalFlatListRef}
              data={images}
              horizontal
              pagingEnabled
              initialScrollIndex={modalIndex}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={localStyles.modalImage}
                  resizeMode="contain"
                />
              )}
              getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </Modal>

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

const localStyles = StyleSheet.create({
  scrollContainer: { paddingBottom: 40, paddingHorizontal: 20 },
  backButton: { position: "absolute", top: 50, left: 20, padding: 8, zIndex: 10 },
  carouselContainer: { marginTop: 90 },
  carouselImage: { width: width - 40, height: 280, borderRadius: 16, marginHorizontal: 10 },
  pagination: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff", marginHorizontal: 4 },
  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.95)", justifyContent: "center", alignItems: "center" },
  modalImage: { width: width, height: height },
  modalCloseButton: { position: "absolute", top: 50, right: 20, zIndex: 10 },
  infoCard: { backgroundColor: "#fff", marginTop: 20, borderRadius: 16, padding: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  headerSection: { marginBottom: 12 },
  serviceTitle: { fontSize: 22, color: "#0A2E5C", fontFamily: "Poppins-Bold" },
  locationText: { fontSize: 14, color: "#6b7280", marginTop: 4, fontFamily: "Poppins-Bold" },
  description: { fontSize: 15, color: "#374151", lineHeight: 22, marginVertical: 10, fontFamily: "Poppins-Regular" },
  detailBox: { backgroundColor: "#f4f6fb", padding: 12, borderRadius: 10, marginTop: 8 },
  detailLabel: { fontSize: 14, color: "#0A2E5C", fontFamily: "Poppins-Bold" },
  detailValue: { fontSize: 15, color: "#111827", marginTop: 2, fontFamily: "Poppins-Regular" },
  inquiryHeader: { fontSize: 18, fontFamily: "Poppins-Bold", color: "#fff", marginTop: 25, marginBottom: 10 },
  inquiryCard: { backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 },
  profileImage: { width: 50, height: 50, borderRadius: 25 },
  providerInfo: { flex: 1, marginLeft: 12 },
  providerName: { fontSize: 16, fontFamily: "Poppins-Bold", color: "#0A2E5C" },
  providerRole: { fontSize: 13, fontFamily: "Poppins-Regular", color: "#6b7280" },
  contactIcons: { flexDirection: "row" },
  iconSpacing: { marginRight: 10 },
  bookButton: { backgroundColor: "#0A2E5C", marginTop: 30, paddingVertical: 14, borderRadius: 12, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 3 },
  bookButtonText: { color: "#fff", fontSize: 16, fontFamily: "Poppins-Bold" },
});