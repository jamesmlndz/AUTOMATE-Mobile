import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const VehicleCard = ({ vehicle }) => {
  const navigation = useNavigation();

  console.log("🚀 ~ VehicleCard ~ vehicle:", vehicle);
  if (!vehicle) {
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      {/* Left side: Brand, Model, and Year */}
      <View style={styles.leftContent}>
        <View>
          <Text style={styles.headerText}>
            {vehicle.brand} {vehicle.model}
          </Text>
          <Text style={styles.yearText}>{vehicle.year}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UpcomingAppointment", {
              filter: { plateNumber: vehicle.plateNumber },
              vehicle: { ...vehicle },
            })
          }
        >
          <Feather name="chevron-right" size={20} color="#555" />
          <Text style={styles.detailText}>{vehicle.type}</Text>
        </TouchableOpacity>
      </View>

      {/* Right side: Details like Plate Number and Transmission */}
      <View style={styles.rightContent}>
        <View style={styles.detailRow}>
          <Feather name="hash" size={20} color="#555" />
          <Text style={styles.detailText}>{vehicle.plateNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons
            name="car-shift-pattern"
            size={20}
            color="#555"
          />
          <Text style={styles.detailText}>{vehicle.transmission}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    flexDirection: "column", // Changed to horizontal layout
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingRight: 10,
  },
  rightContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  yearText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
  },
});

export default VehicleCard;
