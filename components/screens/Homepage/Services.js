import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../../AllStyles/ServicesStyles";
import { useGetAllServices } from "../../../hooks/useServices.query";

const services = [
  {
    id: 1,
    title: "Goodyear Tires",
    screen: "GoodYearTire",
    image: require("../../../assets/services/GoodYearTires.jpg"),
  },
  {
    id: 2,
    title: "Wheel Balancing",
    screen: "WheelBalancing",
    image: require("../../../assets/services/Wheel Balancing.jpg"),
  },
  {
    id: 3,
    title: "Comuterized 4w Alignment",
    screen: "Comuterized",
    image: require("../../../assets/services/Comuterized 4w alignment.jpg"),
  },
  {
    id: 4,
    title: "Kalampag Problem",
    screen: "KalampagProblem",
    image: require("../../../assets/services/Kalampag.jpg"),
  },
  {
    id: 5,
    title: "Change Oil / Tune Up",
    screen: "ChangeOil",
    image: require("../../../assets/services/Change Oil.jpg"),
  },
  {
    id: 6,
    title: "Underchasis / Suspension",
    screen: "UnderchasisSuspension",
    image: require("../../../assets/services/Underchasis Suspension.jpeg"),
  },
  {
    id: 7,
    title: "Brake Disc / Drum Refacing",
    screen: "BrakeDisc",
    image: require("../../../assets/services/BrakeDisc.jpg"),
  },
  {
    id: 8,
    title: "Brakes Overhaul",
    screen: "BrakesOverhaul",
    image: require("../../../assets/services/Brakes overhaul.jpg"),
  },
  {
    id: 9,
    title: "Power Steering Overhaul",
    screen: "PowerSteering",
    image: require("../../../assets/services/Power steering overhaul.jpg"),
  },
  {
    id: 10,
    title: "Camber Correction",
    screen: "CamberCorrection",
    image: require("../../../assets/services/Camber correction.jpg"),
  },
  {
    id: 11,
    title: "Bodylift / Body Lowered",
    screen: "BodyLift",
    image: require("../../../assets/services/BodyLift.jpg"),
  },
  {
    id: 12,
    title: "Check Engine Scanning",
    screen: "CheckEngine",
    image: require("../../../assets/services/Check engine scanning.jpg"),
  },
  {
    id: 13,
    title: "Auto Electrical",
    screen: "AutoElectrical",
    image: require("../../../assets/services/Auto electrical.jpg"),
  },
  {
    id: 14,
    title: "Battery and Accessories",
    screen: "Battery",
    image: require("../../../assets/services/Battery and accessories.jpg"),
  },
];
const getServiceImage = (service) => {
  const serviceItem = services.find(
    (s) => s.title.toLowerCase().trim() === service.name.toLowerCase().trim()
  );
  return serviceItem
    ? serviceItem.image
    : require("../../../assets/LogoScreen.png");
};
const Services = () => {
  const navigation = useNavigation();
  const { data: services, isLoading, error } = useGetAllServices();

  const renderItem = ({ item }) => {
    const imageSource = getServiceImage(item);
    return (
      <TouchableOpacity
        style={styles.serviceCard}
        onPress={() =>
          navigation.navigate("ServiceDetails", {
            service: { ...item, image: imageSource },
          })
        }
      >
        <Image source={imageSource} style={styles.serviceImage} />
        <View style={styles.textContainer}>
          <Text style={styles.serviceText}>{item.title || item.name}</Text>
          <AntDesign name="right" size={16} color="white" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>ALL SERVICES</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={services}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Services;
