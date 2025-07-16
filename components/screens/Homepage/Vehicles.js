import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../AllStyles/ServicesStyles";
import { useGetAllServices } from "../../../hooks/useServices.query";
import VehicleCard from "../../VehicleCard";
import { useGetVehicles } from "../../../hooks/useAppointments.query";
import { useGetUserVehicles } from "../../../hooks/useVehicle.query";

const Vehicles = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetUserVehicles();
  console.log("🚀 ~ Vehicles ~ Vehicles:", data);

  return (
    <View style={[styles.container, { backgroundColor: "#0B2B66" }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>MY VEHICLES</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={data ? data.data : []}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Vehicles;
