import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { submitFeedback } from "../../../api/appointments";

const LeaveFeedbackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingData } = route.params;
  console.log(bookingData);
  const [feedback, setFeedback] = useState(
    bookingData?.feedback?.comment || ""
  );
  const [rating, setRating] = useState(bookingData?.feedback?.rating || 0); // State for rating
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Toast.show({
        type: "error",
        text1: "Feedback cannot be empty.",
      });
      return;
    }
    if (rating === 0) {
      Toast.show({
        type: "error",
        text1: "Please provide a rating.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedback(bookingData._id, feedback, rating); // Pass rating
      Toast.show({
        type: "success",
        text1: "Feedback submitted successfully!",
      });
      setFeedback(""); // Clear feedback after submission
      setRating(0); // Clear rating after submission
      navigation.navigate("TrackingProgress");
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
      imageStyle={{ opacity: 0.08 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={28} color="#F9D342" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave Feedback</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Provide Your Feedback</Text>
        <Text style={styles.subtitle}>
          Help us improve by sharing your experience for appointment ID:{" "}
          {bookingData._id}
        </Text>

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              disabled={isSubmitting}
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={30}
                color="#D4AF37"
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.feedbackInput}
          placeholder="Enter your feedback here..."
          multiline
          numberOfLines={6}
          value={feedback}
          onChangeText={setFeedback}
          editable={!isSubmitting}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitFeedback}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0A2156",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    color: "#F9D342",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Courier",
    textAlign: "center",
    marginBottom: 10,
    color: "#0A2146",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#0A2146",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LeaveFeedbackScreen;
