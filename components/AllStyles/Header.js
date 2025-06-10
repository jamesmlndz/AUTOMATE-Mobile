import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <MaterialIcons name="arrow-back" size={24} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  
    header: {
      backgroundColor: "#0d2c5b", 
      height: 80,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: "center",
      paddingHorizontal: 20,
  },
});

export default Header;