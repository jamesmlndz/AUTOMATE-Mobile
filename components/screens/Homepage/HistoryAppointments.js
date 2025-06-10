import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { HisStyle } from "../../AllStyles/HistoryAppointmentsStyles";

const HistoryAppointments = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [historyAppointments, setHistoryAppointments] = useState([]);

  // Load history appointments passed from navigation
  useEffect(() => {
    if (route.params?.historyAppointments) {
      setHistoryAppointments(route.params.historyAppointments);
    }
  }, [route.params?.historyAppointments]);

  return (
    <View style={HisStyle.container}>
      {/* Header */}
      <View style={HisStyle.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={HisStyle.headerTitle}>VIEW APPOINTMENTS</Text>
      </View>

      {/* Tabs */}
      <View style={HisStyle.tabContainer}>
        <TouchableOpacity
          style={HisStyle.tab}
          onPress={() =>
            navigation.navigate("UpcomingAppointment", {
              upcomingAppointments: route.params?.upcomingAppointments || [],
              historyAppointments,
            })
          }
        >
          <Text style={HisStyle.inactiveTabText}>UPCOMING</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[HisStyle.tab, HisStyle.activeTab]}>
          <Text style={HisStyle.activeTabText}>HISTORY</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List */}
      <ScrollView contentContainerStyle={HisStyle.scrollContainer}>
        {historyAppointments.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 50, color: "#555" }}>
            No history appointments.
          </Text>
        ) : (
          historyAppointments.map((item, index) => (
            <View key={index} style={HisStyle.card}>
              {/* Date Box */}
              <View style={HisStyle.dateBox}>
                <Text style={HisStyle.dateText}>{item.date}</Text>
                <Text style={HisStyle.monthText}>{item.month}</Text>
              </View>
              {/* Appointment Details */}
              <View style={HisStyle.details}>
                <Text style={HisStyle.title}>{item.title}</Text>
                <Text style={HisStyle.userText}>Record for {item.user}</Text>
                <View style={HisStyle.doneBadge}>
                  <Text style={HisStyle.doneBadgeText}>DONE</Text>
                </View>
              </View>
              {/* More Options */}
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryAppointments;
