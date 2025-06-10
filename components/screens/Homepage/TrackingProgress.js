import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TrackingProgressStyles } from "../../AllStyles/TrackingProgressStyles";

const steps = [
  {
    title: "Arrival Time",
    description: "Your vehicle has arrived at the service center.",
    icon: "access-time",
  },
  {
    title: "Vehicle Assessment",
    description: "Mechanics are assessing the condition of your vehicle.",
    icon: "search",
  },
  {
    title: "Repair Progress",
    description: "Repairs are currently being done.",
    icon: "build",
  },
  {
    title: "Repair Completion",
    description: "Repair has been completed. Ready for review.",
    icon: "done",
  },
  {
    title: "Vehicle Release",
    description: "Vehicle is released and ready for pickup.",
    icon: "directions-car",
  },
];

const TrackingProgress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentId } = route.params || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [vehicleInfo, setVehicleInfo] = useState({
    plateNumber: "",
    vehicle: "",
  });

  useEffect(() => {
    if (!appointmentId) {
      console.error("No appointment ID provided");
      return;
    }

    fetch(`http://localhost:5000/api/appointments/${appointmentId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCurrentStep(data.trackingStep ?? 0);
        setVehicleInfo({
          plateNumber: data.plateNumber || "N/A",
          vehicle: data.carModel || data.vehicle || "N/A",
        });
      })
      .catch((error) => {
        console.error("Error fetching appointment:", error);
      });
  }, [appointmentId]);

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")} // adjust path if needed
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.85)" }}>
        {/* Header */}
        <View style={TrackingProgressStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={TrackingProgressStyles.title}>TRACKING PROGRESS</Text>

          <View style={TrackingProgressStyles.carDetails}>
            <MaterialIcons name="directions-car" size={60} color="#08285e" />
            <Text style={TrackingProgressStyles.carText}>{vehicleInfo.plateNumber}</Text>
            <Text style={TrackingProgressStyles.carText}>{vehicleInfo.vehicle}</Text>
          </View>

          {steps.map((step, index) => (
            <View style={TrackingProgressStyles.timelineItem} key={index}>
              <View style={TrackingProgressStyles.iconContainer}>
                <View
                  style={
                    index <= currentStep
                      ? TrackingProgressStyles.activeIconCircle
                      : TrackingProgressStyles.inactiveIconCircle
                  }
                >
                  <MaterialIcons
                    name={step.icon}
                    size={20}
                    color={index <= currentStep ? "white" : "#666"}
                  />
                </View>
                {index < steps.length - 1 && (
                  <View
                    style={[
                      TrackingProgressStyles.timelineLine,
                      index < currentStep &&
                        TrackingProgressStyles.activeTimelineLine,
                    ]}
                  />
                )}
              </View>

              <View style={TrackingProgressStyles.textContainer}>
                <Text style={TrackingProgressStyles.stepTitle}>{step.title}</Text>
                <Text style={TrackingProgressStyles.stepDesc}>{step.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom buttons */}
        <View
          style={[
            TrackingProgressStyles.buttonContainer,
            { paddingHorizontal: 20, paddingBottom: 20 },
          ]}
        >
          <TouchableOpacity
            style={TrackingProgressStyles.button}
            onPress={() => navigation.navigate("Invoice")}
          >
            <Text style={TrackingProgressStyles.buttonText}>SEE INVOICE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={TrackingProgressStyles.button}
            onPress={() => navigation.navigate("AptScreen")}
          >
            <Text style={TrackingProgressStyles.buttonText}>YOUR BOOKING FORM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TrackingProgress;
