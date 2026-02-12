import React, { useState } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 TextInput,
 ActivityIndicator,
 StyleSheet,
 ImageBackground,
 StatusBar,
 Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { submitFeedback } from "../../../api/appointments";


const LeaveFeedbackScreen = () => {
 const navigation = useNavigation();
 const route = useRoute();
 const { bookingData } = route.params;


 // ESTABLISHED STATES (UNCHANGED)
 const [feedback, setFeedback] = useState(bookingData?.feedback?.comment || "");
 const [rating, setRating] = useState(bookingData?.feedback?.rating || 0);
 const [isSubmitting, setIsSubmitting] = useState(false);


 // ESTABLISHED FUNCTION (UNCHANGED)
 const handleSubmitFeedback = async () => {
   if (!feedback.trim()) {
     Toast.show({ type: "error", text1: "Feedback cannot be empty." });
     return;
   }
   if (rating === 0) {
     Toast.show({ type: "error", text1: "Please provide a rating." });
     return;
   }


   setIsSubmitting(true);
   try {
     await submitFeedback(bookingData._id, feedback, rating);
     Toast.show({ type: "success", text1: "Feedback submitted successfully!" });
     setFeedback("");
     setRating(0);
     navigation.navigate("HomePage");
   } catch (error) {
     Toast.show({
       type: "error",
       text1: "Failed to submit feedback.",
       text2: error.message,
     });
   } finally {
     setIsSubmitting(false);
   }
 };


 return (
   <ImageBackground
     source={require("../../../assets/automatebg.jpg")}
     style={styles.background}
   >
     <View style={styles.mainOverlay}>
       <StatusBar barStyle="light-content" />


       {/* MODERN SYNCHRONIZED HEADER */}
       <View style={styles.header}>
         <TouchableOpacity
           onPress={() => navigation.goBack()}
           style={styles.backBtn}
           activeOpacity={0.7}
         >
           <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>LEAVE FEEDBACK</Text>
         <View style={{ width: 40 }} />
       </View>


       <View style={styles.contentContainer}>
         {/* FEEDBACK CARD */}
         <View style={styles.card}>
           <Text style={styles.title}>How was your experience?</Text>
           <Text style={styles.subtitle}>
             Ref No: <Text style={styles.refNo}>{bookingData.refNo}</Text>
           </Text>


           {/* STAR RATING */}
           <View style={styles.ratingWrapper}>
             {[1, 2, 3, 4, 5].map((star) => (
               <TouchableOpacity
                 key={star}
                 onPress={() => setRating(star)}
                 disabled={isSubmitting}
                 style={styles.starTouch}
               >
                 <Ionicons
                   name={star <= rating ? "star" : "star-outline"}
                   size={38}
                   color={star <= rating ? "#F9D342" : "#CBD5E1"}
                 />
               </TouchableOpacity>
             ))}
           </View>


           {/* INPUT SECTION */}
           <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Your Comments</Text>
           </View>
           <TextInput
             style={styles.feedbackInput}
             placeholder="Tell us what you liked or what we can improve..."
             placeholderTextColor="#94A3B8"
             multiline
             numberOfLines={6}
             value={feedback}
             onChangeText={setFeedback}
             editable={!isSubmitting}
           />


           {/* SUBMIT BUTTON */}
           <TouchableOpacity
             style={[
               styles.submitButton,
               (isSubmitting || !feedback.trim() || rating === 0) && styles.disabledButton
             ]}
             onPress={handleSubmitFeedback}
             disabled={isSubmitting}
           >
             {isSubmitting ? (
               <ActivityIndicator color="#fff" />
             ) : (
               <>
                 <Ionicons name="send" size={18} color="white" style={{marginRight: 8}} />
                 <Text style={styles.submitButtonText}>Submit Review</Text>
               </>
             )}
           </TouchableOpacity>
         </View>
       </View>
     </View>
   </ImageBackground>
 );
};


const styles = StyleSheet.create({
 background: {
   flex: 1,
 },
 mainOverlay: {
   flex: 1,
   backgroundColor: "rgba(10, 33, 70, 0.92)", // Matches your dark theme brand color
 },
 header: {
   backgroundColor: "transparent",
   paddingTop: Platform.OS === "ios" ? 55 : 40,
   paddingHorizontal: 20,
   paddingBottom: 20,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
 },
 backBtn: {
   padding: 8,
   backgroundColor: "rgba(255,255,255,0.1)",
   borderRadius: 10,
 },
 headerTitle: {
   color: "white",
   fontSize: 16,
   fontFamily: "Poppins-Bold",
   letterSpacing: 1.5,
 },
 contentContainer: {
   flex: 1,
   paddingHorizontal: 20,
   justifyContent: 'center', // Centers the card on the screen
   paddingBottom: 40,
 },
 card: {
   backgroundColor: "white",
   borderRadius: 30,
   padding: 25,
   shadowColor: "#000",
   shadowOpacity: 0.2,
   shadowRadius: 15,
   elevation: 10,
 },
 title: {
   fontSize: 22,
   fontFamily: "Poppins-Bold",
   textAlign: "center",
   color: "#0A2146",
   marginBottom: 5,
 },
 subtitle: {
   fontSize: 14,
   color: "#64748B",
   textAlign: "center",
   marginBottom: 25,
   fontFamily: "Poppins-Regular",
 },
 refNo: {
   fontFamily: "Poppins-Bold",
   color: "#274B88",
 },
 ratingWrapper: {
   flexDirection: "row",
   justifyContent: "center",
   marginBottom: 30,
   gap: 8,
 },
 starTouch: {
   padding: 2,
 },
 inputLabelContainer: {
   width: '100%',
   marginBottom: 8,
 },
 inputLabel: {
   fontFamily: "Poppins-SemiBold",
   fontSize: 14,
   color: "#0A2146",
 },
 feedbackInput: {
   backgroundColor: "#F8FAFC",
   borderWidth: 1,
   borderColor: "#E2E8F0",
   borderRadius: 18,
   padding: 15,
   minHeight: 140,
   textAlignVertical: "top",
   fontSize: 15,
   fontFamily: "Poppins-Regular",
   color: "#0A2146",
 },
 submitButton: {
   backgroundColor: "#0A2146",
   height: 55,
   borderRadius: 15,
   flexDirection: 'row',
   alignItems: "center",
   justifyContent: "center",
   marginTop: 25,
   shadowColor: "#0A2146",
   shadowOpacity: 0.3,
   shadowRadius: 10,
   elevation: 5,
 },
 disabledButton: {
   backgroundColor: "#94A3B8",
   shadowOpacity: 0,
   elevation: 0,
 },
 submitButtonText: {
   color: "white",
   fontSize: 16,
   fontFamily: "Poppins-Bold",
 },
});


export default LeaveFeedbackScreen;

