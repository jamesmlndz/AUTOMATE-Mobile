import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BookingformStyle from "../../AllStyles/BookingformStyle";

const VehicleDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { formData: prevFormData = {} } = route.params || {};

  const [brand, setBrand] = useState("");
  const [otherBrand, setOtherBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("Automatic");

  const handleNext = () => {
    const finalBrand = brand === "Others" ? otherBrand.trim() : brand;
    if (brand === "Others" && finalBrand === "") {
      alert("Please enter your vehicle brand.");
      return;
    }
    const formData = {
      ...prevFormData,
      brand: finalBrand,
      model,
      year,
      transmission,
    };
    navigation.navigate("SelectServices", { formData });
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={BookingformStyle.bg}
    >
      <View style={BookingformStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={BookingformStyle.headerTitle}>Booking Vehicle details</Text>
      </View>

      <View style={BookingformStyle.formContainer}>
        <Text style={BookingformStyle.sectionTitle}>Vehicle Details</Text>

        <Text style={BookingformStyle.label}>Vehicle Brand</Text>
        <View style={BookingformStyle.pickerWrapper}>
          <Picker
            selectedValue={brand}
            onValueChange={(itemValue) => setBrand(itemValue)}
            style={BookingformStyle.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Select Brand" value="" />
            <Picker.Item label="Toyota" value="Toyota" />
            <Picker.Item label="Honda" value="Honda" />
            <Picker.Item label="Ford" value="Ford" />
            <Picker.Item label="Nissan" value="Nissan" />
            <Picker.Item label="Mazda" value="Mazda" />
            <Picker.Item label="Hyundai" value="Hyundai" />
            <Picker.Item label="Mitsubishi" value="Mitsubishi" />
            <Picker.Item label="Chevrolet" value="Chevrolet" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>

        {brand === "Others" && (
          <>
            <Text style={BookingformStyle.label}>Enter Vehicle Brand</Text>
            <TextInput
              style={BookingformStyle.input}
              placeholder="Type your vehicle brand"
              value={otherBrand}
              onChangeText={setOtherBrand}
            />
          </>
        )}

        <Text style={BookingformStyle.label}>Model</Text>
        <TextInput
          style={BookingformStyle.input}
          placeholder="Enter Car Model"
          value={model}
          onChangeText={setModel}
        />

        <Text style={BookingformStyle.label}>Year</Text>
        <View style={BookingformStyle.pickerWrapper}>
          <Picker
            selectedValue={year}
            onValueChange={(itemValue) => setYear(itemValue)}
            style={BookingformStyle.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Select Year" value="" />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2020" value="2020" />
            <Picker.Item label="2021" value="2021" />
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
          </Picker>
        </View>

        <Text style={BookingformStyle.label}>Transmission</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            style={[
              {
                flex: 0.48,
                padding: 12,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: transmission === "Automatic" ? "#D4AF37" : "#fff",
              },
            ]}
            onPress={() => setTransmission("Automatic")}
          >
            <Text
              style={{
                color: transmission === "Automatic" ? "#fff" : "#000",
                fontWeight: "600",
              }}
            >
              Automatic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                flex: 0.48,
                padding: 12,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: transmission === "Manual" ? "#D4AF37" : "#fff",
              },
            ]}
            onPress={() => setTransmission("Manual")}
          >
            <Text
              style={{
                color: transmission === "Manual" ? "#fff" : "#000",
                fontWeight: "600",
              }}
            >
              Manual
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={BookingformStyle.nextBtn} onPress={handleNext}>
          <Text style={BookingformStyle.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default VehicleDetails;
