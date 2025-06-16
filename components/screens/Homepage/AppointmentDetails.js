import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppointmentDetailsStyles } from "../../AllStyles/AppointmentDetailsStyles";

const AppointmentDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingData } = route.params;
  console.log({ bookingData });
  return (
    <View style={AppointmentDetailsStyles.container}>
      {/* Header */}
      <View style={AppointmentDetailsStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Appointment Details */}
      <View style={AppointmentDetailsStyles.detailsContainer}>
        <Text style={AppointmentDetailsStyles.title}>APPOINTMENT DETAILS</Text>

        {/* Customer Section */}
        <Text style={AppointmentDetailsStyles.sectionHeader}>CUSTOMER</Text>
        <View style={AppointmentDetailsStyles.infoContainer}>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.name}
          </Text>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.phone}
          </Text>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.email}
          </Text>
        </View>

        {/* Car Section */}
        <Text style={AppointmentDetailsStyles.sectionHeader}>CAR</Text>
        <View style={AppointmentDetailsStyles.carContainer}>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.car}
          </Text>
          <Text style={AppointmentDetailsStyles.plateNumber}>
            {appointment.plate}
          </Text>
        </View>

        {/* Schedule Section */}
        <Text style={AppointmentDetailsStyles.sectionHeader}>SCHEDULE</Text>
        <View style={AppointmentDetailsStyles.infoContainer}>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.date}
          </Text>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.time}
          </Text>
        </View>

        {/* Service Section */}
        <Text style={AppointmentDetailsStyles.sectionHeader}>SERVICE</Text>
        <View style={AppointmentDetailsStyles.infoContainer}>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.service}
          </Text>
        </View>

        {/* Description Section */}
        <Text style={AppointmentDetailsStyles.sectionHeader}>DESCRIPTION</Text>
        <View style={AppointmentDetailsStyles.infoContainer}>
          <Text style={AppointmentDetailsStyles.infoText}>
            {appointment.description || "None"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AppointmentDetails;
