import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useGetAllAppointments } from "../../../hooks/useAppointments.query";

const UpcomingAppointments = ({ appointments }) => {
  const navigation = useNavigation();
  const { data, loading, error, isError } = useGetAllAppointments();

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Loading appointments...</Text>
      </View>
    );
  }

  if (isError) {
    console.error("Error fetching appointments:", error);
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Error loading appointments</Text>
      </View>
    );
  }
  if (!data || !data.appointments || data.appointments.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    console.log({ ...item });
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("AptScreen", {
            bookingData: { ...item },
          })
        }
      >
        <View style={styles.cardHeader}>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>
              {new Date(item.scheduledTime).getDate()}
            </Text>
            <Text style={styles.monthText}>
              {new Date(item.scheduledTime).toDateString().split(" ")[0]}
            </Text>
          </View>
          <Text style={styles.titleText}>
            {item.services[0].service.name || "General Service"}
          </Text>
          <Ionicons name="chevron-forward" size={22} color="#F9D342" />
        </View>
        <View style={styles.cardFooter}>
          <Ionicons name="person" size={18} color="#F9D342" />
          <Text style={styles.userText}>{item.name || "Juan Dela Cruz"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.05 }}
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
        <Text style={styles.headerTitle}>My Appointments</Text>
        <View style={{ width: 28 }} />
      </View>

      {data?.appointments && (
        <FlatList
          data={[...data?.appointments]}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0A2156",
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
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateBox: {
    backgroundColor: "#F9D342",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0A2146",
    letterSpacing: 1,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0A2146",
    letterSpacing: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: "#0A2146",
  },
  cardFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    marginLeft: 8,
    color: "#0A2146",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A2156",
  },
  emptyText: {
    color: "#F9D342",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default UpcomingAppointments;
