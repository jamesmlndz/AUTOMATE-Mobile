import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import BookingformStyle from "../../AllStyles/BookingformStyle";
import { SelectServices } from "../../AllStyles/SelectServices";

const services = [
  "Goodyear tires",
  "Wheel balancing",
  "Computerized 4W alignment",
  "Kalampag problem",
  "Change oil / Tune up",
  "Underchassis / Suspension",
  "Brake disc / drum refacing",
  "Brakes overhaul",
  "Power steering overhaul",
  "Camber correction",
  "Body lift / Body lowered",
  "Check engine scanning",
  "Auto electrical",
  "Battery and accessories",
];

const SelectServicesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { formData } = route.params;

  const [selectedServices, setSelectedServices] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const toggleService = (service) => {
    setSelectedServices([service]); // single selection logic
  };

  const handleNext = () => {
    if (selectedServices.length === 0) {
      Alert.alert("No Service Selected", "Please select a service to continue.");
      return;
    }

    const updatedFormData = {
      ...formData,
      selectedServices,
      additionalInfo,
    };

    navigation.navigate("DateAndTimeScreen", { formData: updatedFormData });
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={BookingformStyle.bg}
      resizeMode="cover"
    >
      <View style={BookingformStyle.overlay} />

      {/* Header */}
      <View style={SelectServices.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={24} color="#fff"  />
        </TouchableOpacity>
        <Text style={SelectServices.screenTitle}>Choose Service</Text>
      </View>

      {/* Card */}
      <View style={SelectServices.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={SelectServices.sectionTitle}>Available Services</Text>

          {services.map((service) => {
            const isSelected = selectedServices.includes(service);
            return (
              <TouchableOpacity
                key={service}
                style={[
                  SelectServices.serviceItem,
                  isSelected && SelectServices.selectedService,
                ]}
                onPress={() => toggleService(service)}
              >
                <Text
                  style={[
                    SelectServices.serviceText,
                    isSelected && { color: "#fff" },
                  ]}
                >
                  {service}
                </Text>
                <View
                  style={[
                    SelectServices.circle,
                    isSelected && { backgroundColor: "#0A2146", borderColor: "#0A2146" },
                  ]}
                >
                  {isSelected && (
                    <FontAwesome name="check" size={14} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Additional Info */}
          <Text style={SelectServices.sectionTitle}>Other Issues</Text>
          <TextInput
            style={SelectServices.textInput}
            placeholder="Describe any other issues..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        </ScrollView>
      </View>

      {/* Footer */}
      <TouchableOpacity style={SelectServices.nextButton} onPress={handleNext}>
        <Text style={SelectServices.buttonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SelectServicesScreen;
