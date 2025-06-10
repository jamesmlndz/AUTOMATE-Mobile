import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles, { HomeStyle } from "../../AllStyles/HomepageStyles";
import { useNavigation } from "@react-navigation/native";

const Sidebar = ({ isVisible, toggleSidebar }) => {
  const navigation = useNavigation(); 

  if (!isVisible) return null; 

  return (
    <View style={HomeStyle.sidebarContainer}>
      <View style={HomeStyle.profileSection}>
        <View style={HomeStyle.profileCircle}></View>
        <Text style={HomeStyle.profileName}>ASH LEE</Text>
        <Text style={HomeStyle.profileEmail}>ash123@gmail.com</Text>
      </View>

      <TouchableOpacity style={HomeStyle.sidebarButton} onPress={toggleSidebar}>
        <Text style={HomeStyle.sidebarButtonText}>HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={HomeStyle.sidebarButton}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Text style={HomeStyle.sidebarButtonText}>PROFILE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={HomeStyle.sidebarButton}
        onPress={() => navigation.navigate("Services")}
      >
        <Text style={HomeStyle.sidebarButtonText}>SERVICES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={HomeStyle.sidebarButton}
        onPress={() => navigation.navigate("Deals")}
      >
        <Text style={HomeStyle.sidebarButtonText}>DEALS</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={HomeStyle.logoutButton}
        onPress={() => {
          toggleSidebar(); 
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }], 
          });
        }}
      >
        <FontAwesome name="sign-out" size={24} color="black" />
        <Text style={HomeStyle.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;

