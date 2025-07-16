import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeStyle from "../../AllStyles/HomepageStyles";
import { useAuth } from "../../../context/authContext";
import { SvgUri } from "react-native-svg";

const Homepage = () => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const greetings =
    new Date().getHours() < 12
      ? "Good Morning!"
      : new Date().getHours() < 18
      ? "Good Afternoon!"
      : "Good Evening!";

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    navigation.navigate("Services", {
      filter: { name: searchQuery.trim() },
    });
  };

  return (
    <ImageBackground
      source={require("../../../assets/StartBG1 (1).png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            flexDirection: "row-reverse",
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            {/* Removed sidebar hamburger button */}

            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "#D9D9D9",
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  overflow: "hidden",
                }}
              >
                <SvgUri
                  uri={`https://api.dicebear.com/9.x/initials/svg?seed=${
                    currentUser?.name || "User"
                  }`}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: "SFdisplay-Semibold",
                fontSize: 18,
                color: "#000000",
              }}
            >
              Welcome {currentUser?.name || "User"}!
            </Text>
            <Text
              style={{
                fontFamily: "SFdisplay-Light",
                fontSize: 16,
                color: "#000000",
              }}
            >
              {greetings}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={HomeStyle.searchBar}>
          <TextInput
            placeholder="Search services..."
            placeholderTextColor="#ffff"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[
              HomeStyle.searchInput,
              { fontFamily: "SFdisplay-Semibold" },
            ]}
          />
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <Image
          source={require("../../../assets/Promo.jpg")}
          style={HomeStyle.promoBanner}
          resizeMode="cover"
        />

        {/* Services Title */}
        <Text
          style={[
            HomeStyle.servicesTitle,
            { color: "#000000", fontFamily: "SFdisplay-Semibold" },
          ]}
        >
          Services
        </Text>

        {/* Service Options */}
        <View style={HomeStyle.serviceOptions}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Booking")}
              style={HomeStyle.iconButton}
            >
              <FontAwesome name="plus" size={32} color="white" />
            </TouchableOpacity>
            <Text
              style={[
                HomeStyle.iconLabel,
                { fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              Book
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpcomingAppointment")}
              style={HomeStyle.iconButton}
            >
              <FontAwesome name="list" size={32} color="white" />
            </TouchableOpacity>
            <Text
              style={[
                HomeStyle.iconLabel,
                { fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              Appointments
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("TrackingProgress")}
              style={HomeStyle.iconButton}
            >
              <FontAwesome name="clock-o" size={32} color="white" />
            </TouchableOpacity>
            <Text
              style={[
                HomeStyle.iconLabel,
                { fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              Service Tracker
            </Text>
          </View>
        </View>

        <View style={HomeStyle.serviceOptions}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Vehicles")}
              style={HomeStyle.iconButton}
            >
              <FontAwesome name="car" size={32} color="white" />
            </TouchableOpacity>
            <Text
              style={[
                HomeStyle.iconLabel,
                { fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              My Vehicle
            </Text>
          </View>
        </View>

        {/* Categories Header */}
        <View style={HomeStyle.servicesHeader}>
          <Text
            style={[
              HomeStyle.sectionTitle,
              { color: "#000000", fontFamily: "SFdisplay-Semibold" },
            ]}
          >
            Categories
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Services")}>
            <Text
              style={[
                HomeStyle.viewAll,
                { color: "#000000", fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={HomeStyle.categoriesContainer}>
          <TouchableOpacity style={HomeStyle.categoryBox}>
            <Image
              source={require("../../../assets/services/Change Oil.jpg")}
              style={HomeStyle.categoryImage}
            />
            <Text
              style={[
                HomeStyle.categoryLabel,
                { fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              CHANGE OIL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={HomeStyle.categoryBox}>
            <Image
              source={require("../../../assets/services/Check engine scanning.jpg")}
              style={HomeStyle.categoryImage}
            />
            <Text
              style={[
                HomeStyle.categoryLabel,
                { fontFamily: "SFdisplay-Semibold" },
              ]}
            >
              BRAKE DISC
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Homepage;
