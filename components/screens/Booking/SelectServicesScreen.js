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
import { useGetAllServices } from "../../../hooks/useServices.query";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  const { data: servicesData, isLoading, error } = useGetAllServices();
  const navigation = useNavigation();
  const route = useRoute();
  const { formData } = route.params;
  const { service } =
    navigation.getState().routes.find((route) => route.name === "Booking")
      ?.params || {}; //selected service from services list

  const [selectedServices, setSelectedServices] = useState(
    service ? [service] : []
  );
  const [additionalInfo, setAdditionalInfo] = useState("");

  const services = servicesData?.data?.map((service) => service.name) || [];

  const toggleService = (service) => {
    setSelectedServices([service]); // single selection logic
  };

  const handleNext = () => {
    if (selectedServices.length === 0 && additionalInfo.trim() === "") {
      Alert.alert(
        "Missing Information",
        "Please select at least one service or describe other issues to continue."
      );
      return;
    }

    const updatedFormData = {
      ...formData,
      selectedServices,
      customerNotes: additionalInfo,
    };

    navigation.navigate("DateAndTimeScreen", { formData: updatedFormData });
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }} // Add this line
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <ImageBackground
        source={require("../../../assets/automatebg.jpg")}
        style={BookingformStyle.bg}
        resizeMode="cover"
      >
        <View style={BookingformStyle.overlay} />

        {/* Header */}
        <View style={SelectServices.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={SelectServices.screenTitle}>Choose Service</Text>
        </View>

        {/* Card */}
        <View style={SelectServices.card}>
          <Text style={SelectServices.sectionTitle}>Available Services</Text>
          {isLoading ? (
            <Text style={SelectServices.loadingText}>Loading services...</Text>
          ) : error ? (
            <Text style={SelectServices.errorText}>
              Error loading services: {error.message}
            </Text>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={SelectServices.servicesContainer}
            >
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
                        isSelected && {
                          backgroundColor: "#0A2146",
                          borderColor: "#0A2146",
                        },
                      ]}
                    >
                      {isSelected && (
                        <FontAwesome name="check" size={14} color="#fff" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
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
        </View>

        {/* Footer */}
        <TouchableOpacity
          style={[
            SelectServices.nextButton,
            selectedServices.length === 0 &&
              additionalInfo.trim() === "" && { opacity: 0.5 },
          ]}
          onPress={handleNext}
          disabled={
            selectedServices.length === 0 && additionalInfo.trim() === ""
          }
        >
          <Text style={SelectServices.buttonText}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default SelectServicesScreen;
