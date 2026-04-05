import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const BookedScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { name, date, time, refNo } = route.params || {};

  return (
    <View style={styles.overlay}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.popup}>
          {/* Header */}
          <View style={styles.header}>
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
            Date:
            <Text style={styles.boldText}>
              {date ? format(new Date(date), "yyyy-MM-dd") : "N/A"}
            </Text>
            {"\n"}
            Time: <Text style={styles.boldText}>{time || "N/A"}</Text>
          </Text>

          {/* Important Notice Box - No Show Policy */}
          <View style={styles.noticeBox}>
            <View style={styles.noticeHeader}>
              <MaterialIcons name="info" size={20} color="#D97706" />
              <Text style={styles.noticeTitle}>Important Notice</Text>
            </View>
            <Text style={styles.noticeText}>
              Please arrive <Text style={styles.boldText}>at least 15 minutes</Text> before your scheduled appointment time.
            </Text>
            <Text style={styles.noticeText}>
              If you do not arrive within <Text style={styles.boldText}>30 minutes</Text> of your appointment start time, your appointment will be <Text style={styles.boldText}>automatically cancelled</Text>.
            </Text>
          </View>

          {/* Reference Number */}
          {refNo && (
            <View style={styles.refnoContainer}>
              <Text style={styles.refnoLabel}>Reference Number</Text>
              <Text style={styles.refnoValue}>{refNo}</Text>
            </View>
          )}

          {/* Done Button */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  noticeBox: {
    width: "100%",
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#D97706",
    padding: 16,
    marginBottom: 25,
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#92400E",
    marginLeft: 10,
    fontFamily: "Messina-Regular",
  },
  noticeText: {
    fontSize: 14,
    color: "#78350F",
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: "Messina-Regular",
  },
  refnoContainer: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    alignItems: "center",
  },
  refnoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
    fontFamily: "Messina-Regular",
  },
  refnoValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#12264A",
    fontFamily: "Messina-Regular",
    letterSpacing: 2,
  },
});

export default BookedScreen;
