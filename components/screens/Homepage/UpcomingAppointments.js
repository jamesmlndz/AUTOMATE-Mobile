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

const UpcomingAppointments = ({ appointments }) => {
  const navigation = useNavigation();

  // If no appointments prop passed, fallback to empty array or load from storage/server here
  const [data, setData] = useState(appointments || []);

  useEffect(() => {
    // Optional: Load appointments from backend or AsyncStorage here
    // Example:
    // async function fetchAppointments() {
    //   const stored = await AsyncStorage.getItem('appointments');
    //   if (stored) setData(JSON.parse(stored));
    // }
    // fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("AptScreen", {
          bookingData: item.details,
        })
      }
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.monthText}>{item.month}</Text>
        </View>
        <Text style={styles.titleText}>{item.title}</Text>
        <Ionicons name="chevron-forward" size={22} color="#F9D342" />
      </View>
      <View style={styles.cardFooter}>
        <Ionicons name="person" size={18} color="#F9D342" />
        <Text style={styles.userText}>{item.user}</Text>
      </View>
    </TouchableOpacity>
  );

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No upcoming appointments</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.05 }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0A2156",
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
