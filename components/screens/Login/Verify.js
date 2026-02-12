// frontend/screens/Verify.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "../../AllStyles/LoginStyle";
import authenticatedApi, { getAxiosErrorMessage } from "../../../api/axiosInstance";
import { useAuth } from "../../../context/authContext";

const Verify = ({ route }) => {
  const { signIn, setUser } = useAuth();
  const navigation = useNavigation();
  const userInfo = route?.params || {};
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit code.");
      return;
    }
    try {
      const verifyData = {
        email: userInfo.email,
        otp: fullOtp,
      };

      const response = await authenticatedApi.post("/auth/verify", verifyData);
      let data = response.data;
      if (response.status === 200) {
        signIn(data.token);
        setUser(data.data);
        Alert.alert("Success", "Email verified!");
        navigation.navigate("AccountCreated");
      } else {
        Alert.alert("Failed", "Something went wrong.");
      }
    } catch (error) {
      const message = getAxiosErrorMessage(error);
      Alert.alert("Error", message);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/tierodmanbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>A 4-digit code was sent to:</Text>
          <Text style={styles.email}>{userInfo.email}</Text>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          {/* Resend */}
          <TouchableOpacity
            onPress={() => Alert.alert("Resend code functionality here")}
          >
            <Text style={styles.resendText}>Didn't get the code? Resend</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)", // soft dark overlay for readability
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "rgba(255,255,255,0.9)",
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
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  email: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3C6791",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    width: "80%",
  },
  otpInput: {
    width: 55,
    height: 55,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#3C6791",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  verifyButton: {
    backgroundColor: "#3C6791",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  resendText: {
    fontSize: 14,
    color: "#3C6791",
    textDecorationLine: "underline",
    fontWeight: "500",
    fontFamily: "Poppins",
  },
});

export default Verify;
