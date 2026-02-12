import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../../AllStyles/ServicesStyles";
import { useGetAllServices } from "../../../hooks/useServices.query";

const Services = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { filter } = route.params || {};

  const { data: services, isLoading, error } = useGetAllServices(filter);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ServiceDetails", {
          service: { ...item, image: item.imageUrl },
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

      <View style={styles.cardFooter}>
        <Text style={styles.cardTitle}>{item.title || item.name}</Text>
        <AntDesign name="right" size={18} color="#111" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color="#ffffffff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>All Services</Text>

        <View style={{ width: 26 }} /> {/* Placeholder for spacing */}
      </View>

      {/* MAIN CONTENT */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading services...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>
          Error loading services: {error.message}
        </Text>
      ) : (
        <FlatList
          data={services ? services.data : []}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Services;
