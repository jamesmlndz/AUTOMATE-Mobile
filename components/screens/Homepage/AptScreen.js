import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const AptScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const bookingData = route.params?.bookingData || {};

  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
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

        <View style={styles.detailsBox}>
          {Object.entries(bookingData).map(([key, value], index) => {
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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0A2156",
    paddingTop: 40,
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
    color: "#555",
  },
  value: {
    fontFamily: "Courier",
    fontSize: 15,
    color: "#0A2146",
    maxWidth: "60%",
    textAlign: "right",
  },
});

export default AptScreen;
