import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const StepItem = ({ icon, title, description, color }) => {
  return (
    <View style={styles.step}>
      <MaterialIcons name={icon} size={45} color={color} style={styles.icon} />
      <View>
        <Text style={[styles.stepTitle, { color }]}>{title}</Text>  
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  step: { flexDirection: "row", alignItems: "center", marginBottom: 40 },
  icon: { marginRight: 15 },
  stepTitle: { fontSize: 20, fontWeight: "bold" },
  stepDescription: { fontSize: 14, color: "#555" },
});

export default StepItem;