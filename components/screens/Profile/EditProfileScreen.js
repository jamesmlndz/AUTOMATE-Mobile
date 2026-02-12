import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import { useAuth } from "../../../context/authContext";
import { SvgUri } from "react-native-svg";
import styles from "../../AllStyles/EditProfileScreenStyle";

const EditScreenProfile = ({ navigation, route }) => {
  const { currentUser } = useAuth();
  const existingProfile = route.params?.profile;

  const [image, setImage] = useState(
    existingProfile?.profileImage ||
      `https://api.dicebear.com/9.x/initials/svg?seed=${
        currentUser?.name || "User"
      }`
  );
  const [name, setName] = useState(existingProfile?.name || "");
  const [email, setEmail] = useState(existingProfile?.email || "");
  const [mobileNumber, setMobileNumber] = useState(
    existingProfile?.mobileNumber?.replace("+63 ", "") || ""
  );

  const [linkedAccounts, setLinkedAccounts] = useState({
    google: true,
    facebook: true,
    apple: true,
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "You need to allow access to your media library to change the profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !mobileNumber.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const updatedProfile = {
      profileImage: image,
      name,
      email,
      mobileNumber: `+63 ${mobileNumber.trim()}`,
      linkedAccounts,
    };

    navigation.navigate("ProfileScreen", { updatedProfile });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../../assets/tierodmanbg.png")} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerArrowLeft}
              activeOpacity={0.7}
            >
              <FontAwesome name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>

          {/* Avatar */}
          <View style={styles.avatarSection}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={pickImage}
              activeOpacity={0.85}
            >
              {image && !image.startsWith("http") ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <SvgUri uri={image} style={styles.avatar} />
              )}
              <View style={styles.cameraButton}>
                <Entypo name="camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Card */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#777"
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#f1f1f1" }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="your.email@example.com"
              autoCapitalize="none"
              readOnly
            />

            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.mobileContainer}>
              <View style={styles.countryCode}>
                <Image
                  source={{ uri: "https://flagcdn.com/w40/ph.png" }}
                  style={styles.flag}
                />
                <Text style={styles.codeText}>+63</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                placeholder="912 345 6789"
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.85}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.switchButton}>
              <Text style={styles.switchButtonText}>Switch Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditScreenProfile;
