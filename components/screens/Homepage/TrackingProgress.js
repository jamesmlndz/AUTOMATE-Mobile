import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TrackingProgressStyles } from "../../AllStyles/TrackingProgressStyles";
import { useGetTodayAppointment } from "../../../hooks/useServices.query";
import AppointmentTrackerCard from "./AppointmentTrackerCard";
import { getStatusStyle } from "../../../utils/statusStyles.js";

const steps = [
  {
    title: "Booked",
    description: "Your appointment has been booked.",
    icon: "event-available",
  },
  {
    title: "Vehicle Arrived",
    description: "Your vehicle has arrived at the service center.",
    icon: "access-time",
  },
  {
    title: "Assessment",
    description: "Mechanics are assessing the condition of your vehicle.",
    icon: "search",
  },
  {
    title: "In Progress",
    description: "Repairs are currently being done.",
    icon: "build",
  },
  {
    title: "Completed",
    description: "Repair has been completed. Ready for review/pickup.",
    icon: "done-all",
  },
];

const backendStatusOrder = [
  "Booked",
  "Vehicle Arrived",
  "Assessment",
  "In Progress",
  "Completed",
];

const TrackingProgress = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { data: appointment } = useGetTodayAppointment();
  const appointmentId = appointment?.data?._id;
  const [currentStep, setCurrentStep] = useState(0);
  const [vehicleInfo, setVehicleInfo] = useState({
    plateNumber: "",
    vehicle: "",
  });

  useEffect(() => {
    console.log(appointment);
    if (appointment?.data) {
      // Check if appointment data exists
      if (appointment.data.status === "Completed") {
        setCurrentStep(steps.length - 1); // Set to the index of the last step to color all steps
      } else {
        const stepIndex = backendStatusOrder.indexOf(appointment.data.status);
        setCurrentStep(stepIndex !== -1 ? stepIndex : 0); // Default to 0 if status not found
      }
    }
  }, [appointment?.data?.status]);

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

        {appointment?.data ? (
          <>
            {/* Scrollable content */}
            <ScrollView
              contentContainerStyle={{
                padding: 20,
                paddingBottom: 100,
              }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={TrackingProgressStyles.title}>
                TRACKING PROGRESS
              </Text>
              <AppointmentTrackerCard appointment={appointment?.data} />
              {/* <View style={TrackingProgressStyles.carDetails}>
                <MaterialIcons name="directions-car" size={60} color="#08285e" />
                <Text style={TrackingProgressStyles.carText}>
                  {appointment?.vehicle?.plateNumber}
                </Text>
                <Text style={TrackingProgressStyles.carText}>
                  {appointment?.vehicle?.brand} {appointment?.vehicle?.model}
                </Text>
              </View> */}
              <View style={{ marginBottom: 10 }}></View>
              {steps.map((step, index) => (
                <View style={[TrackingProgressStyles.timelineItem]} key={index}>
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

                  <View
                    style={[
                      TrackingProgressStyles.textContainer,
                      {
                        backgroundColor:
                          index <= currentStep &&
                          getStatusStyle(step.title).backgroundColor,
                      },
                    ]}
                  >
                    <Text style={TrackingProgressStyles.stepTitle}>
                      {step.title}
                    </Text>
                    <Text style={TrackingProgressStyles.stepDesc}>
                      {step.description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Bottom buttons */}
            <View style={TrackingProgressStyles.footerButtonContainer}>
              <TouchableOpacity
                style={TrackingProgressStyles.footerButton}
                onPress={() =>
                  navigation.navigate("Invoice", {
                    bookingData: appointment?.data,
                  })
                }
              >
                <Text style={TrackingProgressStyles.footerButtonText}>
                  SEE INVOICE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={TrackingProgressStyles.footerButton}
                onPress={() =>
                  navigation.navigate("AptScreen", {
                    bookingData: appointment?.data,
                  })
                }
              >
                <Text style={TrackingProgressStyles.footerButtonText}>
                  YOUR BOOKING FORM
                </Text>
              </TouchableOpacity>
              {appointment?.data?.status === "Completed" && (
                <TouchableOpacity
                  style={TrackingProgressStyles.footerButton}
                  onPress={() =>
                    navigation.navigate("LeaveFeedbackScreen", {
                      bookingData: appointment?.data,
                    })
                  }
                >
                  <Text style={TrackingProgressStyles.footerButtonText}>
                    LEAVE FEEDBACK
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, color: "#4B5563" }}>
              No appointment found for today.
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default TrackingProgress;
