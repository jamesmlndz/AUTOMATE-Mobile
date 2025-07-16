import React, { useEffect, useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useGetVehicles } from "../../../hooks/useAppointments.query";

const VehicleDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { formData: prevFormData = {} } = route.params || {};

  const [brand, setBrand] = useState("");
  const [otherBrand, setOtherBrand] = useState("");
  const [model, setModel] = useState("");
  const [carModels, setCarModels] = useState([]);
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("Automatic");

  const [brandError, setBrandError] = useState("");
  const [modelError, setModelError] = useState("");
  const [yearError, setYearError] = useState("");

  const { data: vehiclesData } = useGetVehicles();

  const handleNext = () => {
    let isValid = true;

    const finalBrand = brand === "Others" ? otherBrand.trim() : brand;

    if (!finalBrand) {
      setBrandError("Please select a vehicle brand.");
      isValid = false;
    } else {
      setBrandError("");
    }

    if (brand === "Others" && finalBrand === "") {
      setBrandError("Please enter your vehicle brand.");
      isValid = false;
    }

    if (!model) {
      setModelError("Please select a vehicle model.");
      isValid = false;
    } else {
      setModelError("");
    }

    if (!year) {
      setYearError("Please select a vehicle year.");
      isValid = false;
    } else {
      setYearError("");
    }

    if (!isValid) {
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

  useEffect(() => {
    setCarModels(vehiclesData?.data?.models[brand]?.models);
    setModel(""); // Reset model when brand changes
  }, [brand]);

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
      >
        <View style={BookingformStyle.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={BookingformStyle.headerTitle}>
            Booking Vehicle details
          </Text>
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
              {vehiclesData?.data?.carMakes.map((car) => (
                <Picker.Item key={car} label={car} value={car} />
              ))}
              <Picker.Item key={"other"} label={"Others"} value={"Others"} />
            </Picker>
          </View>
          {/* <Text style={BookingformStyle.label}>Name</Text> */}
          {/* {brand === "other" && (
            <TextInput
              style={BookingformStyle.input}
              placeholder="Enter Vehicle Brand"
              placeholderTextColor="#aaa"
              value={otherBrand}
              onChangeText={(text) => setOtherBrand(text)}
            />
          )} */}

          {brandError ? (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                marginTop: -10,
                marginBottom: 5,
              }}
            >
              {brandError}
            </Text>
          ) : null}

          {brand === "Others" && (
            <>
              <Text style={BookingformStyle.label}>Enter Vehicle Brand</Text>
              <TextInput
                style={BookingformStyle.input}
                placeholder="Type your vehicle brand"
                placeholderTextColor="#aaa"
                value={otherBrand}
                onChangeText={setOtherBrand}
              />
            </>
          )}

          <Text style={BookingformStyle.label}>Model</Text>
          {brand === "Others" ? (
            <TextInput
              style={BookingformStyle.input}
              placeholder="Enter Vehicle Model"
              placeholderTextColor="#aaa"
              value={model}
              onChangeText={setModel}
            />
          ) : (
            <View style={BookingformStyle.pickerWrapper}>
              <Picker
                selectedValue={model}
                onValueChange={(itemValue) => setModel(itemValue)}
                style={BookingformStyle.picker}
                dropdownIconColor="#000"
              >
                <Picker.Item label="Select Model" value="" />
                {carModels?.map((model) => (
                  <Picker.Item key={model} label={model} value={model} />
                ))}
              </Picker>
            </View>
          )}

          {modelError ? (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                marginTop: -10,
                marginBottom: 5,
              }}
            >
              {modelError}
            </Text>
          ) : null}

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
          {yearError ? (
            <Text
              style={{
                color: "red",
                fontSize: 12,
                marginTop: -10,
                marginBottom: 5,
              }}
            >
              {yearError}
            </Text>
          ) : null}

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
                  backgroundColor:
                    transmission === "Automatic" ? "#D4AF37" : "#fff",
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
                  backgroundColor:
                    transmission === "Manual" ? "#D4AF37" : "#fff",
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

          <TouchableOpacity
            style={[
              BookingformStyle.nextBtn,
              (!brand ||
                !model ||
                !year ||
                (brand === "Others" && !otherBrand.trim())) && { opacity: 0.5 },
            ]}
            onPress={handleNext}
            disabled={
              !brand ||
              !model ||
              !year ||
              (brand === "Others" && !otherBrand.trim())
            }
          >
            <Text style={BookingformStyle.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default VehicleDetails;
