import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { format } from "date-fns";

const BookedScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { name, date, time } = route.params || {};

  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        {/* Header */}
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="close" size={28} color="#C9A23F" />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>Booking Confirmed</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Confirmation Icon */}
        <Image
          source={require("../../../assets/completed.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Thank You Message */}
        <Text style={styles.thankYouText}>Thank You, {name || "Guest"}!</Text>
        <Text style={styles.subText}>
          Your appointment has been successfully booked.
        </Text>

        {/* Booking Details */}
        <Text style={styles.detailsText}>
          Date:{" "}
          <Text style={styles.boldText}>
            {" "}
            {date ? format(new Date(date), "yyyy-MM-dd") : "N/A"}
          </Text>
          {"\n"}
          Time: <Text style={styles.boldText}>{time || "N/A"}</Text>
        </Text>

        {/* Done Button */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(18, 38, 74, 0.85)", // match deep blue with opacity
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20, // more rounded for modern look
    padding: 25,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C9A23F", // gold accent color
    fontFamily: "Messina-Regular",
    letterSpacing: 1,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 25,
  },
  thankYouText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#12264A", // deep blue text
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Messina-Regular",
  },
  subText: {
    fontSize: 16,
    color: "#56677D",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Messina-Regular",
  },
  detailsText: {
    fontSize: 16,
    color: "#12264A",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    fontFamily: "Messina-Regular",
  },
  boldText: {
    fontWeight: "700",
    color: "#0A2146",
  },
  doneButton: {
    backgroundColor: "#12264A", // deep blue button to match BookingConfirmation
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 12,
    elevation: 3,
  },
  doneText: {
    color: "#C9A23F", // gold text
    fontWeight: "700",
    fontSize: 18,
    fontFamily: "Messina-Regular",
  },
});

export default BookedScreen;
