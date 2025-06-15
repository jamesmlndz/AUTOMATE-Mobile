// frontend/screens/Login.js
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
import { useAuth } from "../../../context/authContext";
import { saveCurrentUser } from "../../../utils/secureStore";

const Login = () => {
  const navigation = useNavigation();
  const { signIn, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = async () => {
    console.log("Login initiated!");
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const loginData = {
      email,
      password,
    };
    try {
      const response = await authenticatedApi.post("/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        signIn(data.token);
        setUser(data.data);
        Alert.alert("Success", "Logged in successful!");
        navigation.navigate("HomePage", { userId: data.userId });
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
      source={require("../../../assets/LoginBG.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={LoginStyle.container}>
        <View style={LoginStyle.overlay}>
          <Text style={LoginStyle.title}>LOGIN TO YOUR ACCOUNT</Text>
        </View>

        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity style={LoginStyle.ClickloginButton}>
            <Text style={LoginStyle.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={LoginStyle.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={LoginStyle.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Email</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={LoginStyle.inputContainer}>
          <Text style={LoginStyle.label}>Password</Text>
          <TextInput
            style={LoginStyle.input}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={LoginStyle.sendCodeButton}
          onPress={validateLogin}
        >
          <Text style={LoginStyle.sendCodeButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  forgotText: {
    marginTop: 10,
    color: "#3C6791",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 12,
    marginRight: 8,
    fontFamily: "Poppins",
    textDecorationLine: "underline",
  },
});

export default Login;
