import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ProfileStyle } from "../../AllStyles/ProfileStyle";
import LogoutPopup from "../../screens/Login/LogoutPopup";
import { useAuth } from "../../../context/authContext";
import { SvgUri } from "react-native-svg";

const ProfileScreen = () => {
  const { signOut, currentUser } = useAuth();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({
    name: "Ash Melendez",
    email: "asdf@gmail.com",
    mobileNumber: "+63 123 123 123",
    linkedAccounts: {
      google: true,
      facebook: true,
      apple: true,
    },
    ...currentUser,
    profileImage: `https://api.dicebear.com/9.x/initials/svg?seed=${
      currentUser?.name || "User"
    }`,
  });
  console.log(currentUser);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  useEffect(() => {
    console.log(profile);
    if (navigation && navigation.getState) {
      const routes = navigation.getState().routes;
      const lastRoute = routes[routes.length - 1];
      if (lastRoute.params && lastRoute.params.updatedProfile) {
        setProfile(lastRoute.params.updatedProfile);
        navigation.setParams({ updatedProfile: null });
        Alert.alert("Success", "Profile updated successfully.");
      }
    }
  }, [isFocused]);

  const handleLogout = () => {
    signOut();
    setIsLogoutVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/tierodmanbg.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View style={ProfileStyle.header}>
          <Text style={[ProfileStyle.profileText, { color: "white" }]}>
            PROFILE
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomePage")}
            style={ProfileStyle.headerArrow}
          >
            <FontAwesome name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={ProfileStyle.imageWrapper}>
          <View style={ProfileStyle.profileImage}>
            <SvgUri uri={profile.profileImage} />
          </View>
          <TouchableOpacity
            style={ProfileStyle.cameraIcon}
            onPress={() =>
              navigation.navigate("EditProfileScreen", { profile })
            }
          >
            <FontAwesome name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Info Card */}
        <View
          style={[
            ProfileStyle.profileCard,
            { backgroundColor: "rgba(255,255,255,0.9)" },
          ]}
        >
          <Text style={[ProfileStyle.nameText, { color: "#333" }]}>
            {profile.name}
          </Text>

          <View style={ProfileStyle.infoHeader}>
            <Text style={[ProfileStyle.infoHeaderText, { color: "#222" }]}>
              Personal Information
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfileScreen", { profile })
              }
            >
              <FontAwesome name="pencil" size={18} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Info Grid */}
          <View style={ProfileStyle.infoGrid}>
            <View style={ProfileStyle.infoBox}>
              <FontAwesome name="user" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>{profile.name}</Text>
            </View>

            <View style={ProfileStyle.infoBox}>
              <FontAwesome name="phone" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>{profile.mobileNumber}</Text>
            </View>

            <View style={ProfileStyle.infoBox}>
              <FontAwesome name="envelope" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>{profile.email}</Text>
            </View>

            <View style={ProfileStyle.infoBox}>
              <MaterialIcons name="person-outline" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>Not specified</Text>
            </View>
          </View>

          {/* Additional Info */}
          <View style={[ProfileStyle.infoGrid, { marginTop: 15 }]}>
            {/* <View style={ProfileStyle.infoBox}>
              <FontAwesome name="calendar" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>Member since: 2025</Text>
            </View> */}

            {/* <View style={ProfileStyle.infoBox}>
              <FontAwesome name="map-marker" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>Philippines</Text>
            </View> */}

            <View style={ProfileStyle.infoBox}>
              <FontAwesome name="briefcase" size={18} color="#444" />
              <Text style={ProfileStyle.infoText}>Customer</Text>
            </View>

            {/* <View style={ProfileStyle.infoBox}>
              <FontAwesome name="star" size={18} color="#f1c40f" />
              <Text style={ProfileStyle.infoText}>★★★★☆</Text>
            </View> */}
          </View>

          {/* Buttons */}
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              style={[
                ProfileStyle.switchAccountButton,
                { backgroundColor: "#333" },
              ]}
              onPress={() => setIsLogoutVisible(true)}
            >
              <Text style={[ProfileStyle.switchAccountText, { color: "#fff" }]}>
                Switch Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                ProfileStyle.switchAccountButton,
                { marginTop: 12, backgroundColor: "#e74c3c" },
              ]}
              onPress={() => setIsLogoutVisible(true)}
            >
              <Text style={[ProfileStyle.switchAccountText, { color: "#fff" }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Confirmation Popup */}
        <LogoutPopup
          visible={isLogoutVisible}
          onClose={() => setIsLogoutVisible(false)}
          onConfirm={handleLogout}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default ProfileScreen;
