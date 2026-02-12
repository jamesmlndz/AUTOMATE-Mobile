import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoginStyle from "../../AllStyles/LoginStyle";
import authenticatedApi, { getAxiosErrorMessage } from "../../../api/axiosInstance";
import { useAuth } from "../../../context/authContext";


const Login = () => {
  const navigation = useNavigation();
  const { signIn, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity for card
  const slideAnim = useRef(new Animated.Value(50)).current; // translateY for card
  const buttonScale = useRef(new Animated.Value(1)).current; // button press
  const logoScale = useRef(new Animated.Value(0)).current; // logo animation

  useEffect(() => {
    // Animate logo and card together
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const validateLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      const response = await authenticatedApi.post("/auth/login", { email, password });
      const data = response.data;
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
      source={require("../../../assets/tierodmanbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* Animated Logo */}
      <Animated.View
        style={{
          transform: [{ scale: logoScale }],
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../../assets/Logo.png")} // 🔹 Replace with your actual logo path
          style={{ width: 250, height: 250, resizeMode: "contain" }}
        />
      </Animated.View>

      {/* Animated Login Card */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={LoginStyle.title}>LOGIN TO YOUR ACCOUNT</Text>

        {/* Toggle Buttons */}
        <View style={LoginStyle.buttonContainer}>
          <TouchableOpacity style={LoginStyle.ClickloginButton}>
            <Text style={LoginStyle.buttonTextLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={LoginStyle.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={LoginStyle.buttonTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Animated Login Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={LoginStyle.sendCodeButton}
            onPress={validateLogin}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={LoginStyle.sendCodeButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ marginTop: 10 }}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </Animated.View>
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
  forgotText: {
    marginTop: 10,
    color: "#3C6791",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 12,
    textDecorationLine: "underline",
  },
  
  
});

export default Login;
