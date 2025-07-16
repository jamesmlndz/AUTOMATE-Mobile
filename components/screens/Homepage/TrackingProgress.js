import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { TrackingProgressStyles } from "../../AllStyles/TrackingProgressStyles";
import { useGetTodayAppointment } from "../../../hooks/useServices.query";
import AppointmentTrackerCard from "./AppointmentTrackerCard";
import { getStatusStyle } from "../../../utils/statusStyles.js";
import { Button } from "react-native-web";
import ConfirmDialog from "../../ConfirmDialog.js";
import {
  useAppointmentsMutation,
  useUpdateAppointment,
} from "../../../hooks/useAppointments.mutation.js";

const steps = [
  {
    title: "Pending",
    description: "Waiting for confirmation.",
    icon: "event-available",
  },
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
  "Pending",
  "Booked",
  "Vehicle Arrived",
  "Assessment",
  "In Progress",
  "Completed",
];

const TrackingProgress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {}; //appointment ID from route params
  console.log("🚀 ~ TrackingProgress ~ id:", id);
  const { updateAppointment } = useAppointmentsMutation();
  const { data: appointment, isLoading, refetch } = useGetTodayAppointment(id);
  console.log("🚀 ~ TrackingProgress ~ appointment:", appointment);
  const appointmentId = id ? appointment?._id : appointment?.data?._id;
  const [currentStep, setCurrentStep] = useState(0);
  const [vehicleInfo, setVehicleInfo] = useState({
    plateNumber: "",
    vehicle: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    console.log("Confirmed!", appointmentId);
    // Add any logic you want to execute on confirmation
    updateAppointment.mutate({
      id: appointmentId,
      status: "Vehicle Arrived",
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setModalVisible(false);
  };

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

  useEffect(() => {
    refetch();
  }, [id]);
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
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, color: "#4B5563" }}>
              Loading appointment details...
            </Text>
          </View>
        ) : appointment?.data ? (
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
                        name={index <= currentStep ? "check" : step.icon}
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
                  <View style={{ flex: 1 }}>
                    <View
                      style={[
                        TrackingProgressStyles.textContainer,
                        {
                          backgroundColor:
                            index <= currentStep &&
                            getStatusStyle(steps[currentStep].title)
                              .backgroundColor,
                        },
                      ]}
                    >
                      <Text style={TrackingProgressStyles.stepTitle}>
                        {step.title}
                      </Text>
                      <Text style={TrackingProgressStyles.stepDesc}>
                        {step.description}
                      </Text>
                      {step.title === "Booked" &&
                        appointment?.data?.status === "Booked" && (
                          <View
                            style={{
                              flex: 1,
                              backgroundColor: "rgba(255,255,255,0.9)",
                              padding: 15, // Slightly more padding
                              borderRadius: 12,
                              borderWidth: 1, // Add border
                              borderColor: "#e0e0e0", // Light border color
                              marginTop: 20,
                            }}
                          >
                            <Text style={TrackingProgressStyles.stepDesc}>
                              Does your vehicle arrived?
                            </Text>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: 10,
                                gap: 10,
                              }}
                            >
                              <View
                                style={TrackingProgressStyles.buttonContainer}
                              >
                                {/* Using a function in the style prop to handle press state */}
                                <Pressable
                                  onPress={handleOpenModal}
                                  style={({ pressed }) => [
                                    TrackingProgressStyles.button,
                                    TrackingProgressStyles.yesButtonOutline,
                                    pressed && { backgroundColor: "#e9f5ec" }, // Light green tint on press
                                  ]}
                                >
                                  <Text
                                    style={[
                                      TrackingProgressStyles.buttonText,
                                      TrackingProgressStyles.yesButtonText,
                                    ]}
                                  >
                                    Yes
                                  </Text>
                                </Pressable>
                                {/* <Pressable
                                  style={({ pressed }) => [
                                    TrackingProgressStyles.button,
                                    TrackingProgressStyles.noButtonOutline,
                                    pressed && { backgroundColor: "#fdeded" }, // Light red tint on press
                                  ]}
                                >
                                  <Text
                                    style={[
                                      TrackingProgressStyles.buttonText,
                                      TrackingProgressStyles.yesButtonText,
                                    ]}
                                  >
                                    No
                                  </Text>
                                </Pressable> */}
                              </View>
                            </View>
                          </View>
                        )}
                    </View>
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
      <ConfirmDialog
        visible={modalVisible}
        title="Confirm Action"
        message="Are you sure you want to perform this action? This cannot be undone."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ImageBackground>
  );
};

export default TrackingProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  yesButtonOutline: {
    borderColor: "#28a745",
    backgroundColor: "transparent",
  },
  noButtonOutline: {
    borderColor: "#dc3545",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  yesButtonText: {
    color: "#28a745",
  },
  noButtonText: {
    color: "#dc3545",
  },
});
