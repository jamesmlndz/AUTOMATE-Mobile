import React from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MyAppointmentStyle from "../../AllStyles/MyAppointmentStyles";

const MyAppointment = ({ navigation, route }) => {
  const { bookingData } = route.params || {};

  const handleCancelAppointment = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          onPress: () => {
            Alert.alert("Appointment Cancelled");
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  if (!bookingData) {
    return (
      <View style={MyAppointmentStyle.container}>
        <Text style={MyAppointmentStyle.title}>No Appointment Data Available</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "blue", marginTop: 20 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={MyAppointmentStyle.container}>
      {/* Header */}
      <View style={MyAppointmentStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Title */}
        <Text style={MyAppointmentStyle.title}>APPOINTMENT DETAILS</Text>

        {/* Customer Info */}
        <View style={MyAppointmentStyle.section}>
          <Text style={MyAppointmentStyle.sectionTitle}>CUSTOMER</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.customerName}</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.customerPhone}</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.customerEmail}</Text>
        </View>

        {/* Car Info */}
        <View style={MyAppointmentStyle.section}>
          <Text style={MyAppointmentStyle.sectionTitle}>CAR</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.carModel}</Text>
          <Text style={MyAppointmentStyle.carPlate}>{bookingData.carPlate}</Text>
        </View>

        {/* Schedule */}
        <View style={MyAppointmentStyle.section}>
          <Text style={MyAppointmentStyle.sectionTitle}>SCHEDULE</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.scheduleDate}</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.scheduleTime}</Text>
        </View>

        {/* Service */}
        <View style={MyAppointmentStyle.section}>
          <Text style={MyAppointmentStyle.sectionTitle}>SERVICE</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.service}</Text>
        </View>

        {/* Description */}
        <View style={MyAppointmentStyle.section}>
          <Text style={MyAppointmentStyle.sectionTitle}>DESCRIPTION</Text>
          <Text style={MyAppointmentStyle.infoText}>{bookingData.description || "None"}</Text>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity style={MyAppointmentStyle.cancelButton} onPress={handleCancelAppointment}>
          <Text style={MyAppointmentStyle.cancelButtonText}>Cancel Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MyAppointment;
