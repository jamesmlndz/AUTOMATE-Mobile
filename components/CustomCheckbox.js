import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomCheckbox = ({ checked, onPress, style, label }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#08285E",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkedBox: {
    backgroundColor: "#08285E",
    borderColor: "#08285E",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    marginLeft: 8,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
});

export default CustomCheckbox;
