import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { InvoiceStyles } from "../../AllStyles/InvoiceStyles";

const Invoice = () => {
  const navigation = useNavigation();

  return (
    <View style={InvoiceStyles.container}>
      {/* Header */}
      <View style={InvoiceStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Invoice Title */}
      <Text style={InvoiceStyles.title}>INVOICE</Text>

      {/* Receipt Image Placeholder */}
      <View style={InvoiceStyles.receiptContainer}>
        <Text style={InvoiceStyles.receiptText}>IMAGE OF RECEIPT</Text>
      </View>
    </View>
  );
};

export default Invoice;
