// frontend/screens/Register.js
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

const Register = () => {
  const navigation = useNavigation();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !fname ||
      !lname ||
      !contactNum ||
      !email ||
      !password ||
      !passwordConfirm
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (!/^\d{11}$/.test(contactNum)) {
      Alert.alert("Error", "Mobile number must be 11 digits.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Enter a valid email.");
      return;
    }

    setIsLoading(true);

    try {
      const registerData = {
        name: `${fname} ${lname}`,
        mobileNumber: contactNum,
        email,
        password,
        passwordConfirm,
      };

      const response = await authenticatedApi.post(
        "/auth/register",
        registerData
      );
      let data = response.data.data;
      if (response.status === 201) {
        Alert.alert("Success", data.message || "Verification code sent.");
        navigation.navigate("Verify", {
          email: data.email,
          userId: data.userId,
        });
      } else {
        Alert.alert("Failed", "Something went wrong.");
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
      {/* Dark overlay for better readability */}
      <View style={styles.overlay} />

      {/* Card container for form */}
      <View style={styles.card}>
        <Text style={LoginStyle.Regtitle}>CREATE ACCOUNT</Text>

        {/* Toggle Buttons */}
        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity
            style={LoginStyle.loginButton}
            onPress={() => navigation.navigate("Login")}
            disabled={isLoading}
          >
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={LoginStyle.ClickregisterButton}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={LoginStyle.buttonText}>
              {isLoading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>First Name</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter First Name"
            value={fname}
            onChangeText={setFname}
            autoCapitalize="words"
            editable={!isLoading}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Last Name</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Last Name"
            value={lname}
            onChangeText={setLname}
            autoCapitalize="words"
            editable={!isLoading}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Mobile Number</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter 11-digit Mobile Number"
            value={contactNum}
            onChangeText={setContactNum}
            maxLength={11}
            keyboardType="phone-pad"
            editable={!isLoading}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Email</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Password</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Confirm Password</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={LoginStyle.sendCodeButton}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={LoginStyle.sendCodeButtonText}>
            {isLoading ? "REGISTERING..." : "REGISTER"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", 
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default Register;
