import React from "react";
import {
 View,
 Text,
 TouchableOpacity,
 FlatList,
 ActivityIndicator,
 StyleSheet,
 StatusBar,
 Platform,
 Dimensions
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import VehicleCard from "../../VehicleCard";
import { useGetUserVehicles } from "../../../hooks/useVehicle.query";


const { width: SCREEN_WIDTH } = Dimensions.get("window");


const Vehicles = () => {
 const navigation = useNavigation();
 const { data, isLoading, error } = useGetUserVehicles();


 const vehicleData = data?.data || [];


 if (isLoading) {
   return (
     <View style={localStyles.centerMessage}>
       <ActivityIndicator size="large" color="#0A2146" />
       <Text style={localStyles.messageText}>Fetching your garage...</Text>
     </View>
   );
 }


 if (error) {
   return (
     <View style={localStyles.centerMessage}>
       <MaterialIcons name="cloud-off" size={50} color="#E04C4C" />
       <Text style={[localStyles.messageText, { color: '#E04C4C' }]}>
         We couldn't reach your vehicles.
       </Text>
     </View>
   );
 }


 const ListHeader = () => (
   <View style={localStyles.listHeaderContainer}>
     <Text style={localStyles.listTitle}>Registered Vehicles</Text>
     <View style={localStyles.badge}>
       <Text style={localStyles.badgeText}>{vehicleData.length}</Text>
     </View>
   </View>
 );


 const ListEmptyComponent = () => (
   <View style={localStyles.emptyStateCard}>
     <View style={localStyles.emptyIconCircle}>
       <FontAwesome5 name="car-alt" size={40} color="#274B88" />
     </View>
     <Text style={localStyles.emptyTitle}>Your Garage is Empty</Text>
     <Text style={localStyles.emptySubtitle}>
       Once you add vehicles to your profile, they will appear here for quick booking.
     </Text>
   </View>
 );


 return (
   <View style={localStyles.container}>
     <StatusBar barStyle="light-content" />


     {/* ===== HEADER SECTION ===== */}
     <View style={localStyles.topSection}>
       <View style={localStyles.headerActions}>
         {/* Matched back button from Profile screen */}
         <TouchableOpacity
           onPress={() => navigation.goBack()}
           style={localStyles.backButton}
         >
           <MaterialIcons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
        
         <Text style={localStyles.headerTitle}>AutoMate Garage</Text>
         <View style={{ width: 40 }} />
       </View>
      
       <View style={localStyles.headerInfo}>
         <Text style={localStyles.greeting}>Manage your vehicle</Text>
         <Text style={localStyles.subGreeting}>View and select your registered vehicles below.</Text>
       </View>
     </View>


     {/* ===== VEHICLE LIST ===== */}
     <FlatList
       data={vehicleData}
       keyExtractor={(item) => item._id.toString()}
       renderItem={({ item }) => (
         <View style={localStyles.cardContainer}>
           <VehicleCard vehicle={item} />
         </View>
       )}
       ListHeaderComponent={vehicleData.length > 0 ? ListHeader : null}
       contentContainerStyle={localStyles.listPadding}
       showsVerticalScrollIndicator={false}
       ListEmptyComponent={ListEmptyComponent}
     />
   </View>
 );
};


export default Vehicles;


const localStyles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#F6F8FC",
 },
 topSection: {
   backgroundColor: "#0A2146",
   paddingTop: Platform.OS === "ios" ? 55 : 40,
   paddingHorizontal: 25,
   paddingBottom: 35,
   borderBottomLeftRadius: 30,
   borderBottomRightRadius: 30,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 10 },
   shadowOpacity: 0.15,
   shadowRadius: 10,
   elevation: 8,
 },
 headerActions: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
 },
 // Replaced iconButton with backButton style from ProfileScreen
 backButton: {
   padding: 8,
 },
 headerTitle: {
   color: "white",
   fontSize: 18,
   fontFamily: "Poppins-Bold",
   letterSpacing: 0.5,
 },
 headerInfo: {
   marginTop: 25,
 },
 greeting: {
   color: "white",
   fontSize: 24,
   fontFamily: "Poppins-Bold",
 },
 subGreeting: {
   color: "rgba(255,255,255,0.7)",
   fontSize: 14,
   fontFamily: "Poppins-Regular",
   marginTop: 4,
 },
 listPadding: {
   paddingHorizontal: 20,
   paddingBottom: 40,
   paddingTop: 25,
 },
 listHeaderContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 15,
   marginLeft: 5,
 },
 listTitle: {
   fontSize: 16,
   fontFamily: "Poppins-Bold",
   color: "#0A2146",
 },
 badge: {
   backgroundColor: "#274B88",
   paddingHorizontal: 10,
   paddingVertical: 2,
   borderRadius: 12,
   marginLeft: 10,
 },
 badgeText: {
   color: "white",
   fontSize: 12,
   fontFamily: "Poppins-Bold",
 },
 cardContainer: {
   marginBottom: 15,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.05,
   shadowRadius: 10,
   elevation: 3,
 },
 centerMessage: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: '#F6F8FC',
 },
 messageText: {
   fontSize: 16,
   fontFamily: "Poppins-Medium",
   color: "#0A2146",
   marginTop: 15,
 },
 emptyStateCard: {
   backgroundColor: 'white',
   borderRadius: 25,
   padding: 40,
   alignItems: 'center',
   marginTop: 40,
   borderWidth: 1,
   borderColor: '#E1E7F0',
 },
 emptyIconCircle: {
   width: 80,
   height: 80,
   borderRadius: 40,
   backgroundColor: '#F0F4FA',
   justifyContent: 'center',
   alignItems: 'center',
   marginBottom: 20,
 },
 emptyTitle: {
   fontSize: 18,
   fontFamily: "Poppins-Bold",
   color: "#0A2146",
   textAlign: 'center',
 },
 emptySubtitle: {
   fontSize: 14,
   fontFamily: "Poppins-Regular",
   color: "#666",
   textAlign: "center",
   marginTop: 10,
   lineHeight: 22,
 },
});

