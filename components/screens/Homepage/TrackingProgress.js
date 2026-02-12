import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 ScrollView,
 ImageBackground,
 StyleSheet,
 StatusBar,
 Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useGetTodayAppointment } from "../../../hooks/useServices.query";
import AppointmentTrackerCard from "./AppointmentTrackerCard";
import ConfirmDialog from "../../ConfirmDialog.js";
import { useAppointmentsMutation } from "../../../hooks/useAppointments.mutation.js";


const steps = [
 { title: "Pending", description: "Waiting for confirmation.", icon: "hourglass-empty" },
 { title: "Booked", description: "Your appointment is set.", icon: "event-available" },
 { title: "Vehicle Arrived", description: "Car is at the shop.", icon: "directions-car" },
 { title: "Assessment", description: "Mechanics are assessing.", icon: "search" },
 { title: "In Progress", description: "Repairs are underway.", icon: "build" },
 { title: "Completed", description: "Ready for review/pickup.", icon: "check-circle" },
];


const backendStatusOrder = ["Pending", "Booked", "Vehicle Arrived", "Assessment", "In Progress", "Completed"];


const TrackingProgress = () => {
 const navigation = useNavigation();
 const route = useRoute();
 const { id } = route.params || {};
 const { updateAppointment } = useAppointmentsMutation();
 const { data: appointment, isLoading, refetch } = useGetTodayAppointment(id);
  const appointmentId = id ? appointment?._id : appointment?.data?._id;
 const [currentStep, setCurrentStep] = useState(0);
 const [modalVisible, setModalVisible] = useState(false);


 const handleOpenModal = () => setModalVisible(true);
 const handleConfirm = () => {
   updateAppointment.mutate({ id: appointmentId, status: "Vehicle Arrived" });
   setModalVisible(false);
 };
 const handleCancel = () => setModalVisible(false);


 useEffect(() => {
   if (appointment?.data) {
     if (appointment.data.status === "Completed") {
       setCurrentStep(steps.length - 1);
     } else {
       const stepIndex = backendStatusOrder.indexOf(appointment.data.status);
       setCurrentStep(stepIndex !== -1 ? stepIndex : 0);
     }
   }
 }, [appointment?.data?.status]);


 useEffect(() => { refetch(); }, [id]);


 return (
   <ImageBackground
     source={require("../../../assets/automatebg.jpg")}
     style={{ flex: 1 }}
     resizeMode="cover"
   >
     <View style={localStyles.mainOverlay}>
       <StatusBar barStyle="light-content" />
      
       {/* Modern Synchronized Header */}
       <View style={localStyles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
           <MaterialIcons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={localStyles.headerTitle}>TRACKING PROGRESS</Text>
         <View style={{ width: 40 }} />
       </View>


       {isLoading ? (
         <View style={localStyles.centerContent}>
           <Text style={localStyles.statusText}>Loading details...</Text>
         </View>
       ) : appointment?.data ? (
         <>
           <ScrollView contentContainerStyle={localStyles.scrollBody} showsVerticalScrollIndicator={false}>
             <AppointmentTrackerCard appointment={appointment?.data} />


             <View style={localStyles.timelineWrapper}>
               {steps.map((step, index) => {
                 const isPast = index < currentStep;
                 const isCurrent = index === currentStep;
                 const isActive = index <= currentStep;


                 return (
                   <View style={localStyles.stepRow} key={index}>
                     <View style={localStyles.indicatorColumn}>
                       <View style={[
                         localStyles.dot,
                         isActive ? localStyles.activeDot : localStyles.inactiveDot,
                         isCurrent && localStyles.currentDotGlow
                       ]}>
                         <MaterialIcons
                           name={isPast ? "check" : step.icon}
                           size={16}
                           color={isActive ? "white" : "#94A3B8"}
                         />
                       </View>
                       {index < steps.length - 1 && (
                         <View style={[localStyles.line, isPast && localStyles.activeLine]} />
                       )}
                     </View>


                     <View style={localStyles.contentColumn}>
                       <View style={[localStyles.stepCard, isCurrent && localStyles.activeStepCard]}>
                         <Text style={[localStyles.stepTitle, isActive ? {color: '#0A2146'} : {color: '#94A3B8'}]}>
                           {step.title}
                         </Text>
                         <Text style={localStyles.stepDesc}>{step.description}</Text>


                         {step.title === "Booked" && appointment?.data?.status === "Booked" && (
                           <View style={localStyles.arrivalPrompt}>
                             <Text style={localStyles.arrivalPromptText}>Has your vehicle arrived?</Text>
                             <TouchableOpacity style={localStyles.arrivalButton} onPress={handleOpenModal}>
                               <Text style={localStyles.arrivalButtonText}>YES, I'M HERE</Text>
                             </TouchableOpacity>
                           </View>
                         )}
                       </View>
                     </View>
                   </View>
                 );
               })}
             </View>
           </ScrollView>


           {/* FIXED BOTTOM ACTION FOOTER */}
           <View style={localStyles.footer}>
             {/* Secondary Action - Always Full Width */}
             <TouchableOpacity
               style={localStyles.invoiceButton}
               onPress={() => navigation.navigate("Invoice", { bookingData: appointment?.data })}
             >
               <MaterialIcons name="receipt" size={18} color="#274B88" />
               <Text style={localStyles.invoiceButtonText}>VIEW INVOICE</Text>
             </TouchableOpacity>


             {/* Primary Actions Row - Scales Automatically */}
             <View style={localStyles.primaryActionRow}>
               <TouchableOpacity
                 style={localStyles.bookingButton}
                 onPress={() => navigation.navigate("AptScreen", { bookingData: appointment?.data })}
               >
                 <Text style={localStyles.bookingButtonText}>BOOKING FORM</Text>
               </TouchableOpacity>


               {appointment?.data?.status === "Completed" && (
                 <TouchableOpacity
                   style={localStyles.feedbackButton}
                   onPress={() => navigation.navigate("LeaveFeedbackScreen", { bookingData: appointment?.data })}
                 >
                   <MaterialIcons size={18} color="white" />
                   <Text style={localStyles.feedbackButtonText}>FEEDBACK</Text>
                 </TouchableOpacity>
               )}
             </View>
           </View>
         </>
       ) : (
         <View style={localStyles.centerContent}>
           <Text style={localStyles.statusText}>No appointment found for today.</Text>
         </View>
       )}
     </View>


     <ConfirmDialog
       visible={modalVisible}
       title="Confirm Arrival"
       message="Are you sure your vehicle is at the service center?"
       onConfirm={handleConfirm}
       onCancel={handleCancel}
     />
   </ImageBackground>
 );
};


const localStyles = StyleSheet.create({
 mainOverlay: { flex: 1, backgroundColor: "rgba(248, 250, 252, 0.95)" },
 header: {
   backgroundColor: "#0A2146",
   paddingTop: Platform.OS === "ios" ? 50 : 35,
   paddingHorizontal: 20,
   paddingBottom: 25,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   borderBottomLeftRadius: 30,
   borderBottomRightRadius: 30,
 },
 backButton: { padding: 8 },
 headerTitle: { color: "white", fontFamily: "Poppins-Bold", fontSize: 16, letterSpacing: 1.5 },
 scrollBody: { padding: 20, paddingBottom: 160 },
  timelineWrapper: { marginTop: 30 },
 stepRow: { flexDirection: "row" },
 indicatorColumn: { alignItems: "center", width: 30, marginRight: 15 },
 dot: { width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center", zIndex: 2 },
 activeDot: { backgroundColor: "#274B88" },
 inactiveDot: { backgroundColor: "#E2E8F0", borderWidth: 1, borderColor: "#CBD5E1" },
 currentDotGlow: { shadowColor: "#274B88", shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 },
 line: { width: 2, flex: 1, backgroundColor: "#E2E8F0", marginVertical: 4 },
 activeLine: { backgroundColor: "#274B88" },
  contentColumn: { flex: 1, paddingBottom: 30 },
 stepCard: { backgroundColor: "white", padding: 15, borderRadius: 16, borderWidth: 1, borderColor: "#F1F5F9" },
 activeStepCard: { borderColor: "#274B88", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5 },
 stepTitle: { fontFamily: "Poppins-Bold", fontSize: 15 },
 stepDesc: { fontFamily: "Poppins-Regular", fontSize: 13, color: "#64748B", marginTop: 2 },
  arrivalPrompt: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: "#F1F5F9", alignItems: "center" },
 arrivalPromptText: { fontFamily: "Poppins-Medium", fontSize: 13, color: "#0A2146", marginBottom: 10 },
 arrivalButton: { backgroundColor: "#274B88", paddingHorizontal: 25, paddingVertical: 10, borderRadius: 10 },
 arrivalButtonText: { color: "white", fontFamily: "Poppins-Bold", fontSize: 12 },


 footer: {
   position: "absolute",
   bottom: 0,
   width: "100%",
   backgroundColor: "white",
   paddingHorizontal: 20,
   paddingTop: 15,
   paddingBottom: Platform.OS === "ios" ? 35 : 20,
   borderTopLeftRadius: 30,
   borderTopRightRadius: 30,
   elevation: 25,
   shadowColor: "#000",
   shadowOpacity: 0.15,
   shadowRadius: 15,
 },
 invoiceButton: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#F0F4FA',
   paddingVertical: 12,
   borderRadius: 14,
   marginBottom: 12,
   gap: 8,
 },
 invoiceButtonText: { color: "#274B88", fontFamily: "Poppins-Bold", fontSize: 13 },
 primaryActionRow: { flexDirection: 'row', gap: 10 },
 bookingButton: {
   flex: 1,
   backgroundColor: "#0A2146",
   height: 55,
   borderRadius: 14,
   justifyContent: "center",
   alignItems: "center",
 },
 bookingButtonText: { color: "white", fontFamily: "Poppins-Bold", fontSize: 14 },
 feedbackButton: {
   flex: 1,
   flexDirection: 'row',
   backgroundColor: "#28a745",
   height: 55,
   borderRadius: 14,
   justifyContent: "center",
   alignItems: "center",
   gap: 6,
 },
 feedbackButtonText: { color: "white", fontFamily: "Poppins-Bold", fontSize: 14 },
  centerContent: { flex: 1, justifyContent: "center", alignItems: "center" },
 statusText: { fontFamily: "Poppins-Medium", fontSize: 16, color: "#64748B" },
});


export default TrackingProgress;

