import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import BookingformStyle from "../../AllStyles/BookingformStyle";
import { useAuth } from "../../../context/authContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  const [plateNumberError, setPlateNumberError] = useState("");

  const validatePlateNumber = (plateNumber) => {
    // Philippine plate number regex:
    // Car plates: 3 letters followed by 3 or 4 digits (e.g., ABC 123, ABC 1234)
    // Motorcycle plates: 4 digits followed by 2 letters (e.g., 1234 AB)
    // or 2 digits followed by 3 letters (e.g., 12 ABC) - newer motorcycle plates
    const carPlateRegex = /^[A-Z]{3}\d{3,4}$/;
    const motorcyclePlateRegex1 = /^\d{4}[A-Z]{2}$/;
    const motorcyclePlateRegex2 = /^\d{2}[A-Z]{3}$/;

    if (
      !carPlateRegex.test(plateNumber) &&
      !motorcyclePlateRegex1.test(plateNumber) &&
      !motorcyclePlateRegex2.test(plateNumber)
    ) {
      setPlateNumberError("Invalid Philippine plate number format.");
      return false;
    }
    setPlateNumberError("");
    return true;
  };

  const handleChange = (key, value) => {
    if (key === "plateNumber") {
      const capitalizedValue = value.toUpperCase();
      setFormData({ ...formData, [key]: capitalizedValue });
      validatePlateNumber(capitalizedValue);
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleNext = () => {
    if (validatePlateNumber(formData.plateNumber)) {
      navigation.navigate("VehicleDetails", { formData });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }} // Add this line
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <ImageBackground
        source={require("../../../assets/tierodmanbg.png")}
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
          <Text style={BookingformStyle.headerTitle}>
            Book your Appointment
          </Text>
        </View>

        <View style={BookingformStyle.formContainer}>
          <Text style={BookingformStyle.sectionTitle}>
            Customer Information
          </Text>

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
            placeholder="ABC123 / ABC1234 / 1234AB / 12ABC"
            placeholderTextColor="#aaa"
            value={formData.plateNumber}
            onChangeText={(text) => handleChange("plateNumber", text)}
            autoCapitalize="characters"
          />
          <Text
            style={{
              fontSize: 12,
              color: "#888",
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            Valid formats: (ABC123, ABC1234)
          </Text>
          {plateNumberError ? (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                marginTop: -10,
                marginBottom: 5,
              }}
            >
              {plateNumberError}
            </Text>
          ) : null}

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
            style={[
              BookingformStyle.nextBtn,
              (!!plateNumberError || !formData.plateNumber) && { opacity: 0.5 },
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={!!plateNumberError || !formData.plateNumber}
          >
            <Text style={BookingformStyle.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Bookingform;
