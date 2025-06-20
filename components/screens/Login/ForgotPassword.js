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
import authenticatedApi, {
  getAxiosErrorMessage,
} from "../../../api/axiosInstance";

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
      source={require("../../../assets/LoginBG.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.container}>
        <View style={LoginStyle.section}>
          <Text style={LoginStyle.title}>Reset Your Password</Text>
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Enter your email address</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={LoginStyle.sendCodeButton}
          onPress={handleSendReset}
          disabled={isLoading}
        >
          <Text style={LoginStyle.sendCodeButtonText}>
            {isLoading ? "SENDING..." : "SEND RESET LINK"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={LoginStyle.resendText}>Back to Login</Text>
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

export default ForgotPassword;
