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
import { Ionicons as Ionicon } from "@expo/vector-icons"; // For displaying stars
import { useAppointmentsMutation } from "../../../hooks/useAppointments.mutation";

const AptScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateAppointment } = useAppointmentsMutation();

  const bookingData = route.params?.bookingData || {};

  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
  const RenderDetail = () =>
    Object.entries(bookingData).map(([key, value]) => {
      // --- 1. Filter out keys you don't want to display ---
      const hiddenKeys = [
        "__v",
        "_id",
        "customer",
        "parts",
        "createdAt",
        "updatedAt",
        "feedback", // Exclude feedback object from generic rendering
      ];
      if (hiddenKeys.includes(key)) {
        return null; // Skip rendering for these keys
      }

      let displayValue = value;

      // --- 2. Handle specific object keys like 'vehicle' ---
      if (key === "vehicle" && value) {
        // Format the vehicle object into a readable string
        displayValue = `${value.brand} ${value.model} (${value.year}) - ${value.plateNumber}`;
      }
      // --- 3. Improve handling for arrays of objects like 'services' ---
      else if (key === "services" && Array.isArray(value)) {
        if (
          value.length > 0 &&
          typeof value[0] === "object" &&
          value[0] !== null
        ) {
          // Corrected path: map over each item and access item.service.name
          displayValue = value.map((item) => item.service.name).join(", ");
        } else {
          displayValue = "No services listed.";
        }
      }
      // --- 4. Improve Date and Time Formatting ---
      else if (key.toLowerCase().includes("date")) {
        displayValue = new Date(value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } else if (key.toLowerCase().includes("time")) {
        displayValue = new Date(value).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      }
      // Handle any other simple value
      else if (typeof value !== "object" || value === null) {
        displayValue = String(value);
      } else {
        // If it's an unhandled object, don't render it to avoid errors
        return null;
      }

      return (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{formatLabel(key)}</Text>
          <Text style={styles.value}>{displayValue}</Text>
        </View>
      );
    });

  const handleCancelBooking = async () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        {
          text: "Yes, cancel now",
          onPress: () =>
            updateAppointment.mutate(
              {
                id: bookingData._id,
                status: "Canceled",
              },
              {
                onSuccess: () => {
                  alert("Booking canceled successfully.");
                  navigation.goBack();
                  navigation.goBack();
                },
                onError: (error) => {
                  alert(`Error canceling booking: ${error.message}`);
                },
              }
            ),
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
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
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Details</Text>
        <RenderDetail />
        <View style={styles.detailsBox}></View>

        {/* Display Feedback if available */}
        {bookingData.feedback && (
          <View style={styles.feedbackDisplayContainer}>
            <Text style={styles.feedbackDisplayHeader}>Customer Feedback</Text>
            {bookingData.rating > 0 && (
              <View style={styles.starDisplayContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicon
                    key={star}
                    name={star <= bookingData.rating ? "star" : "star-outline"}
                    size={20}
                    color="#D4AF37"
                  />
                ))}
              </View>
            )}
            <Text style={styles.feedbackDisplayText}>
              {bookingData.feedback.comment}
            </Text>
          </View>
        )}

        {bookingData.status !== "Canceled" && (
          <TouchableOpacity
            style={styles.leaveFeedbackButton}
            onPress={() =>
              navigation.navigate("TrackingProgress", { id: bookingData._id })
            }
          >
            <Text style={styles.leaveFeedbackButtonText}>Track Progress</Text>
          </TouchableOpacity>
        )}

        {bookingData.status === "Pending" && (
          <TouchableOpacity
            style={styles.leaveFeedbackButton}
            onPress={handleCancelBooking}
          >
            <Text style={styles.leaveFeedbackButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        )}

        {/* Leave Feedback Button (conditionally rendered) */}
        {/* {bookingData.status == "Completed" && !bookingData.feedback && (
          <TouchableOpacity
            style={styles.leaveFeedbackButton}
            onPress={() =>
              navigation.navigate("LeaveFeedbackScreen", { bookingData })
            }
          >
            <Text style={styles.leaveFeedbackButtonText}>Leave Feedback</Text>
          </TouchableOpacity>
        )} */}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0A2156",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: 5,
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
  detailsBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
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
    flex: 1,
    fontFamily: "Courier",
    fontSize: 15,
    color: "#0A2146",
    textAlign: "right",
  },
  leaveFeedbackButton: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  leaveFeedbackButtonText: {
    color: "#0A2146",
    fontSize: 18,
    fontWeight: "bold",
  },
  feedbackDisplayContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  feedbackDisplayHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2146",
    marginBottom: 10,
    textAlign: "center",
  },
  starDisplayContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  feedbackDisplayText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default AptScreen;
