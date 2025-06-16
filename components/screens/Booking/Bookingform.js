import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import BookingformStyle from "../../AllStyles/BookingformStyle";
import { useAuth } from "../../../context/authContext";

const Bookingform = () => {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.mobileNumber || "",
    email: currentUser?.email || "",
    plateNumber: "",
    contactMethod: "Phone",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNext = () => {
    navigation.navigate("VehicleDetails", { formData });
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={BookingformStyle.bg}
      resizeMode="cover"
    >
      <View style={BookingformStyle.overlay} />

      <View style={BookingformStyle.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={BookingformStyle.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={BookingformStyle.headerTitle}>Book your Appointment</Text>
      </View>

      <View style={BookingformStyle.formContainer}>
        <Text style={BookingformStyle.sectionTitle}>Customer Information</Text>

        <Text style={BookingformStyle.label}>Name</Text>
        <TextInput
          style={BookingformStyle.input}
          placeholder="Enter Name"
          placeholderTextColor="#aaa"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <Text style={BookingformStyle.label}>Phone Number</Text>
        <TextInput
          style={BookingformStyle.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />

        <Text style={BookingformStyle.label}>Email</Text>
        <TextInput
          style={BookingformStyle.input}
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <Text style={BookingformStyle.label}>Plate Number</Text>
        <TextInput
          style={BookingformStyle.input}
          placeholder="Plate Number"
          placeholderTextColor="#aaa"
          value={formData.plateNumber}
          onChangeText={(text) => handleChange("plateNumber", text)}
        />

        <Text style={BookingformStyle.label}>Preferred contact method</Text>
        <View style={BookingformStyle.pickerWrapper}>
          <Picker
            selectedValue={formData.contactMethod}
            onValueChange={(value) => handleChange("contactMethod", value)}
            style={BookingformStyle.picker}
            dropdownIconColor="#333"
            mode={Platform.OS === "android" ? "dropdown" : undefined}
          >
            <Picker.Item label="Phone" value="Phone" />
            <Picker.Item label="Email" value="Email" />
            <Picker.Item label="SMS" value="SMS" />
          </Picker>
        </View>

        <TouchableOpacity
          style={BookingformStyle.nextBtn}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={BookingformStyle.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Bookingform;
