import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { InvoiceStyles } from "../../AllStyles/InvoiceStyles";
import { useGetAppointmentById } from "../../../hooks/useAppointments.query";

const Invoice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookingData } = route.params;
  // const { data } = useGetAppointmentById(appointmentId, {
  //   withInvoice: true,
  // });
  console.log("🚀 ~ Invoice ~ data:", bookingData);

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
        {bookingData.invoiceImgUrl ? (
          <Image
            source={{ uri: bookingData.invoiceImgUrl }}
            style={InvoiceStyles.receiptImage}
          />
        ) : (
          <Text style={InvoiceStyles.noImageText}>
            No receipt image available.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Invoice;
