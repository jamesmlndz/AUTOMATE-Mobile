import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import styles from "../../AllStyles/ServicesStyles"; // NOTE: Original external styles are commented out.
import VehicleCard from "../../VehicleCard";
import { useGetUserVehicles } from "../../../hooks/useVehicle.query";

const Vehicles = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetUserVehicles();

  const vehicleData = data?.data || [];

  // --- UI Conditional Rendering ---

  if (isLoading) {
    return (
      <View style={[localStyles.container, localStyles.centerMessage]}>
        <ActivityIndicator size="large" color="#0B2B66" />
        <Text style={localStyles.messageText}>Loading your vehicle list...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[localStyles.container, localStyles.centerMessage]}>
        <AntDesign name="exclamationcircleo" size={30} color="#E04C4C" />
        <Text style={[localStyles.messageText, { color: '#E04C4C' }]}>
          Error loading vehicles. Please check your connection.
        </Text>
      </View>
    );
  }

  const ListEmptyComponent = () => (
    <View style={localStyles.emptyState}>
      <Ionicons name="car-sport-outline" size={70} color="#BBBBBB" />
      <Text style={localStyles.emptyTitle}>No Vehicles Registered</Text>
      <Text style={localStyles.emptySubtitle}>
        Your registered vehicles will appear here for easy management.
      </Text>
    </View>
  );
  
  // NOTE: The AddVehicleButton component has been entirely removed as requested.

  return (
    <View style={localStyles.container}>
      {/* ===== HEADER (Enhanced Styling) ===== */}
      <View style={localStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={localStyles.backIcon}
          />
        </TouchableOpacity>
        <Text style={localStyles.headerText}>MY VEHICLES</Text>
        {/* Placeholder to keep the title centered */}
        <View style={{ width: 34 }} /> 
      </View>

      {/* ===== VEHICLE LIST (Improved Layout) ===== */}
      <FlatList
        data={vehicleData}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        contentContainerStyle={localStyles.gridContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default Vehicles;

// --- 🎨 START OF LOCAL STYLES (Enhanced UI - CSS at the bottom) ---
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC", // Light background for content area
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0B2B66", // Deep Blue color
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
  },
  backIcon: {
    padding: 5,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  // Removed addButton and addButtonText styles

  // --- Loading, Error, and Empty State Styles ---
  centerMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#F6F8FC",
  },
  messageText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    minHeight: 250,
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#0B2B66",
    marginTop: 15,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
});
// --- 🎨 END OF LOCAL STYLES ---