// frontend/screens/ForgotPassword.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "../../AllStyles/LoginStyle";
import authenticatedApi, { getAxiosErrorMessage } from "../../../api/axiosInstance";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authenticatedApi.post("/auth/forgot-password", {
        email,
      });

      const data = await response.data;

      if (response.status === 200) {
        Alert.alert(
          "Success",
          data.message || "Check your email for reset instructions."
        );
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Unable to send reset link.");
      }
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/tierodmanbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.subtitle}>
            Enter your registered email and we’ll send you a reset link.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleSendReset}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? "SENDING..." : "SEND RESET LINK"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.backText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // dim overlay
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#334155",
    fontFamily: "Poppins",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#3C6791",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: "Poppins",
    color: "#1E293B",
  },
  resetButton: {
    backgroundColor: "#3C6791",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  backText: {
    fontSize: 14,
    color: "#3C6791",
    textDecorationLine: "underline",
    fontWeight: "500",
    fontFamily: "Poppins",
  },
});

export default ForgotPassword;
