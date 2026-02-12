import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../../context/authContext";
import authenticatedApi, {
  getAxiosErrorMessage,
} from "../../../api/axiosInstance";

const BookingConfirmation = () => {
  const { currentUser } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();

  const bookingData = route.params?.formData || route.params || {};

  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const name = bookingData.name || bookingData.customerName || "";
  const date = bookingData.scheduledDate || bookingData.date || "";
  const time = bookingData.scheduledTime || bookingData.time || "";
  const service = bookingData.service || "General Service";
  const carModel = bookingData.carModel || "N/A";
  const userId =
    currentUser?.id || currentUser?._id || currentUser?.userId || null;
  console.log("Booking Data:", bookingData);
  const handleConfirmBooking = async () => {
    try {
      if (!userId) {
        alert("Missing user ID. Please log in again.");
        return;
      }

      const appointmentData = {
        ...bookingData,

        vehicle: {
          brand: bookingData.brand,
          model: bookingData.model,
          year: bookingData.year,
          transmission: bookingData.transmission || "Automatic",
          plateNumber: bookingData.plateNumber.toUpperCase() || "N/A",
        },
      };

      const response = await authenticatedApi.post(
        "/appointments",
        appointmentData
      );

      if (response.status === 201) {
        const data = response.data;
        navigation.navigate("BookedScreen", {
          refNo: data?.refNo,
          name,
          date,
          time,
        });
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      Alert.alert(
        "Failed to book appointment",
        message || "Failed to book appointment."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/tierodmanbg.png")}
      style={styles.background}
      imageStyle={{ opacity: 0.08 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#F9D342" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Confirmation</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Booking Summary</Text>

        <View style={styles.receiptBox}>
          {Object.entries(bookingData)
            .filter(
              ([key]) => !["odometer", "drivable"].includes(key.toLowerCase())
            )
            .map(([key, value], index) => {
              let displayValue = value;
              if (key.toLowerCase().includes("date")) {
                displayValue = new Date(value).toDateString();
              }
              if (key.toLowerCase().includes("time")) {
                displayValue = String(value).slice(0, 5);
              }
              if (Array.isArray(value)) {
                displayValue = value.join(", ");
              }
              return (
                <View key={index} style={styles.row}>
                  <Text style={styles.label}>{formatLabel(key)}</Text>
                  <Text style={styles.value}>{displayValue}</Text>
                </View>
              );
            })}
        </View>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirmBooking}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.editText}>Edit Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0A2156",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    color: "#F9D342",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Courier",
    textAlign: "center",
    marginBottom: 30,
    color: "#0A2146",
    letterSpacing: 2,
  },
  receiptBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 35,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 13,
  },
  label: {
    fontFamily: "Courier",
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontFamily: "Courier",
    fontSize: 15,
    color: "#0A2146",
    maxWidth: "60%",
    textAlign: "right",
  },
  confirmBtn: {
    backgroundColor: "#F9D342",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#F9D342",
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 8,
  },
  confirmText: {
    color: "#0A2146",
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 1.5,
  },
  editBtn: {
    borderWidth: 2,
    borderColor: "#F9D342",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  editText: {
    color: "#0A2146",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default BookingConfirmation;
