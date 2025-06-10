import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ThankYouStyles } from "../../AllStyles/ThankYou"; 
import { FontAwesome } from "@expo/vector-icons";

const ThankYouScreen = ({ navigation }) => {
  return (
    <View style={ThankYouStyles.container}>
      {/* Header */}
      <View style={ThankYouStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={ThankYouStyles.title}>BOOKING CONFIRMATION</Text>

      {/* Card */}
      <View style={ThankYouStyles.card}>
        

        <Text style={ThankYouStyles.thankYouText}>THANK YOU!</Text>
        <Text style={ThankYouStyles.subtitle}>Your Appointment Successful</Text>

        <Text style={ThankYouStyles.description}>
          You booked an appointment for
        </Text>
        <Text style={ThankYouStyles.dateTime}>February 21, {"\n"} at 02:00 PM</Text>

        {/* DONE Button */}
        <TouchableOpacity
          style={ThankYouStyles.doneButton}
          onPress={() => navigation.navigate("Homepage")} 
        >
          <Text style={ThankYouStyles.doneText}>DONE</Text>
        </TouchableOpacity>

        {/* Edit Appointment */}
        <TouchableOpacity onPress={() => navigation.navigate("EditAppointment")}>
          <Text style={ThankYouStyles.editText}>Edit your appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThankYouScreen;