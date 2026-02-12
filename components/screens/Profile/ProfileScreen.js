import React, { useState, useEffect } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 ScrollView,
 Alert,
 StyleSheet,
 Dimensions,
 StatusBar,
 Platform,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Added MaterialIcons for the back arrow
import { useNavigation, useIsFocused } from "@react-navigation/native";
import LogoutPopup from "../../screens/Login/LogoutPopup";
import { useAuth } from "../../../context/authContext";
import { SvgUri } from "react-native-svg";


const { width: SCREEN_WIDTH } = Dimensions.get("window");


const ProfileScreen = () => {
 const { signOut, currentUser } = useAuth();
 const navigation = useNavigation();
 const isFocused = useIsFocused();
  const theme = {
   background: "#F6F8FC",
   card: "#FFFFFF",
   text: "#0A2146",
   subtext: "#666666",
   headerBg: "#0A2146",
   accentBlue: "#274B88",
   border: "#E1E7F0",
   iconCircle: "#F0F3F9",
 };


 const [profile, setProfile] = useState({
   name: currentUser?.name || "User",
   email: currentUser?.email || "user@example.com",
   mobileNumber: currentUser?.mobileNumber || "+63 XXX XXX XXXX",
   profileImage: `https://api.dicebear.com/9.x/initials/svg?seed=${currentUser?.name || "User"}`,
 });


 const [isLogoutVisible, setIsLogoutVisible] = useState(false);


 useEffect(() => {
   if (isFocused && navigation.getState) {
     const routes = navigation.getState().routes;
     const lastRoute = routes[routes.length - 1];
     if (lastRoute.params?.updatedProfile) {
       setProfile(lastRoute.params.updatedProfile);
       navigation.setParams({ updatedProfile: null });
       Alert.alert("Success", "Profile updated successfully.");
     }
   }
 }, [isFocused]);


 const handleLogout = () => {
   signOut();
   setIsLogoutVisible(false);
   navigation.reset({ index: 0, routes: [{ name: "Login" }] });
 };


 const InfoRow = ({ icon, label, value }) => (
   <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
     <View style={[styles.iconCircle, { backgroundColor: theme.iconCircle }]}>
       <FontAwesome name={icon} size={16} color={theme.accentBlue} />
     </View>
     <View style={styles.infoTextContainer}>
       <Text style={[styles.infoLabel, { color: theme.subtext }]}>{label}</Text>
       <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
     </View>
   </View>
 );


 return (
   <View style={[styles.container, { backgroundColor: theme.background }]}>
     <StatusBar barStyle="light-content" />
    
     {/* HEADER SECTION - Matches TrackingProgress Header Structure */}
     <View style={[styles.headerWrapper, { backgroundColor: theme.headerBg }]}>
       <View style={styles.headerTop}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <MaterialIcons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
        
         <Text style={styles.headerTitle}>MY PROFILE</Text>
        
         {/* Invisible View to keep title centered (Matches back button width) */}
         <View style={{ width: 40 }} />
       </View>


       <View style={styles.avatarContainer}>
         <View style={styles.imageWrapper}>
           <View style={[styles.imageCircle, { borderColor: theme.accentBlue }]}>
             <SvgUri uri={profile.profileImage} width="100%" height="100%" />
           </View>
           <TouchableOpacity
             style={[styles.editBadge, { backgroundColor: theme.accentBlue }]}
             onPress={() => navigation.navigate("EditProfileScreen", { profile })}
           >
             <FontAwesome name="pencil" size={12} color="white" />
           </TouchableOpacity>
         </View>
         <Text style={styles.userName}>{profile.name}</Text>
         <Text style={styles.userEmail}>{profile.email}</Text>
       </View>
     </View>


     <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
       <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
         <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Details</Text>
        
         <InfoRow icon="user" label="Full Name" value={profile.name} />
         <InfoRow icon="envelope" label="Email Address" value={profile.email} />
         <InfoRow icon="phone" label="Mobile Number" value={profile.mobileNumber} />
         <InfoRow icon="shield" label="Account Role" value="Customer" />


         <View style={styles.buttonGroup}>
           <TouchableOpacity
             style={[styles.actionButton, { backgroundColor: theme.iconCircle }]}
             onPress={() => setIsLogoutVisible(true)}
           >
             <MaterialIcons name="swap-horiz" size={20} color={theme.text} />
             <Text style={[styles.actionButtonText, { color: theme.text }]}>Switch Account</Text>
           </TouchableOpacity>


           <TouchableOpacity
             style={[styles.logoutButton, { backgroundColor: "#e74c3c" }]}
             onPress={() => setIsLogoutVisible(true)}
           >
             <MaterialIcons name="logout" size={20} color="white" />
             <Text style={[styles.actionButtonText, { color: "white" }]}>Logout</Text>
           </TouchableOpacity>
         </View>
       </View>


       <Text style={[styles.footerText, { color: theme.subtext }]}>
         AutoMate v1.0.4 • Tierodman Car Shop {"\n"} © {new Date().getFullYear()}
       </Text>
     </ScrollView>


     <LogoutPopup
       visible={isLogoutVisible}
       onClose={() => setIsLogoutVisible(false)}
       onConfirm={handleLogout}
     />
   </View>
 );
};


const styles = StyleSheet.create({
 container: { flex: 1 },
 headerWrapper: {
   paddingTop: Platform.OS === "ios" ? 50 : 30, // Balanced for status bar
   paddingHorizontal: 20,
   paddingBottom: 50, // More breathing room for the bottom curve
   borderBottomLeftRadius: 35,
   borderBottomRightRadius: 35,
   elevation: 8,
   shadowColor: "#000",
   shadowOpacity: 0.15,
   shadowRadius: 10,
 },
 headerTop: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
 },
 backButton: {
   padding: 8, // Exact padding from TrackingProgress
 },
 headerTitle: {
   fontSize: 18, // Matches the TrackingProgress feel
   fontFamily: "Poppins-Bold",
   color: "white",
   letterSpacing: 1.5,
 },
 avatarContainer: {
   alignItems: "center",
   marginTop: 10,
 },
 imageWrapper: {
   position: 'relative',
   width: 100,
   height: 100,
   marginBottom: 10,
 },
 imageCircle: {
   width: 100,
   height: 100,
   borderRadius: 50,
   backgroundColor: "white",
   borderWidth: 3,
   padding: 3,
   overflow: "hidden",
 },
 editBadge: {
   position: "absolute",
   bottom: 0,
   right: 0,
   width: 32,
   height: 32,
   borderRadius: 16,
   justifyContent: "center",
   alignItems: "center",
   borderWidth: 3,
   borderColor: "#0A2146",
 },
 userName: {
   fontSize: 22,
   fontFamily: "Poppins-Bold",
   color: "white",
 },
 userEmail: {
   fontSize: 14,
   fontFamily: "Poppins-Regular",
   color: "rgba(255,255,255,0.7)",
 },
 scrollBody: {
   paddingHorizontal: 20,
   paddingBottom: 40,
   paddingTop: 30, // Space between header curve and card
 },
 card: {
   borderRadius: 24,
   padding: 24,
   borderWidth: 1,
   elevation: 4,
   shadowColor: "#000",
   shadowOpacity: 0.05,
   shadowRadius: 10,
 },
 sectionTitle: {
   fontSize: 18,
   fontFamily: "Poppins-Bold",
   marginBottom: 20,
 },
 infoRow: {
   flexDirection: "row",
   alignItems: "center",
   paddingVertical: 14,
   borderBottomWidth: 1,
 },
 iconCircle: {
   width: 42,
   height: 42,
   borderRadius: 12,
   justifyContent: "center",
   alignItems: "center",
   marginRight: 15,
 },
 infoTextContainer: { flex: 1 },
 infoLabel: {
   fontSize: 11,
   fontFamily: "Poppins-Regular",
   textTransform: 'uppercase',
   letterSpacing: 0.5,
   marginBottom: 2,
 },
 infoValue: {
   fontSize: 15,
   fontFamily: "Poppins-SemiBold",
 },
 buttonGroup: {
   marginTop: 30,
 },
 actionButton: {
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center",
   height: 55,
   borderRadius: 16,
   marginBottom: 12,
 },
 logoutButton: {
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center",
   height: 55,
   borderRadius: 16,
 },
 actionButtonText: {
   fontSize: 16,
   fontFamily: "Poppins-Bold",
   marginLeft: 10,
 },
 footerText: {
   textAlign: "center",
   marginTop: 30,
   fontSize: 12,
   fontFamily: "Poppins-Regular",
   lineHeight: 18,
 },
});


export default ProfileScreen;

