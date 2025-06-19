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
import authenticatedApi, {
  getAxiosErrorMessage,
} from "../../../api/axiosInstance";
import e from "cors";
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
    console.log(route);
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
        // navigation.navigate("HomePage", { userId: data.data.userId });
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
      source={require("../../../assets/GetBG.png")} // Make sure this path is correct
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.verifycontainer}>
        <Text style={LoginStyle.verifyTitle}>Verify Your Email</Text>
        <Text style={LoginStyle.verifyText}>A 4-digit code was sent to:</Text>
        <Text style={LoginStyle.emailText}>{userInfo.email}</Text>

        <View style={LoginStyle.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={LoginStyle.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={LoginStyle.getButton} onPress={handleVerify}>
          <Text style={LoginStyle.sendCodeButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("Resend code functionality here")}
        >
          <Text style={LoginStyle.resendText}>Didn't get the code? Resend</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Verify;
