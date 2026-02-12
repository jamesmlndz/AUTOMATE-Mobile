import React, { useState } from "react";
import {
 View,
 Text,
 TextInput,
 Image,
 TouchableOpacity,
 ScrollView,
 Alert,
 StatusBar,
 Platform,
 StyleSheet,
 Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useAuth } from "../../../context/authContext";
import { SvgUri } from "react-native-svg";


const { width: SCREEN_WIDTH } = Dimensions.get("window");


const EditScreenProfile = ({ navigation, route }) => {
 const { currentUser } = useAuth();
 const existingProfile = route.params?.profile;


 // Theme constants to match ProfileScreen
 const theme = {
   background: "#F6F8FC",
   card: "#FFFFFF",
   headerBg: "#0A2146",
   text: "#0A2146",
   subtext: "#666666",
   accentBlue: "#274B88",
   border: "#E1E7F0",
 };


 const [image, setImage] = useState(
   existingProfile?.profileImage ||
     `https://api.dicebear.com/9.x/initials/svg?seed=${
       currentUser?.name || "User"
     }`
 );
 const [name, setName] = useState(existingProfile?.name || "");
 const [email, setEmail] = useState(existingProfile?.email || "");
 const [mobileNumber, setMobileNumber] = useState(
   existingProfile?.mobileNumber?.replace("+63 ", "") || ""
 );


 const pickImage = async () => {
   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
   if (!permissionResult.granted) {
     Alert.alert("Permission required", "Allow access to your library to change the picture.");
     return;
   }


   const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [1, 1],
     quality: 1,
   });


   if (!result.canceled) {
     setImage(result.assets[0].uri);
   }
 };


 const handleSave = () => {
   if (!name.trim() || !email.trim() || !mobileNumber.trim()) {
     Alert.alert("Validation Error", "Please fill in all fields.");
     return;
   }


   const updatedProfile = {
     profileImage: image,
     name,
     email,
     mobileNumber: `+63 ${mobileNumber.trim()}`,
   };


   navigation.navigate("ProfileScreen", { updatedProfile });
 };


 return (
   <View style={[styles.container, { backgroundColor: theme.background }]}>
     <StatusBar barStyle="light-content" />
    
     {/* HEADER - Matches Profile & Tracking Header */}
     <View style={[styles.headerWrapper, { backgroundColor: theme.headerBg }]}>
       <View style={styles.headerTop}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <MaterialIcons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>EDIT PROFILE</Text>
         <View style={{ width: 40 }} />
       </View>


       {/* Avatar Section */}
       <View style={styles.avatarContainer}>
         <View style={styles.imageWrapper}>
           <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
               <View style={[styles.imageCircle, { borderColor: theme.accentBlue }]}>
                   {image && !image.startsWith("http") ? (
                       <Image source={{ uri: image }} style={styles.avatar} />
                   ) : (
                       <SvgUri uri={image} width="100%" height="100%" />
                   )}
               </View>
               <View style={[styles.editBadge, { backgroundColor: theme.accentBlue }]}>
                   <Entypo name="camera" size={14} color="white" />
               </View>
           </TouchableOpacity>
         </View>
       </View>
     </View>


     <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
       <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        
         <Text style={[styles.inputLabel, { color: theme.text }]}>Full Name</Text>
         <TextInput
           style={[styles.input, { borderColor: theme.border }]}
           value={name}
           onChangeText={setName}
           placeholder="Enter your name"
         />


         <Text style={[styles.inputLabel, { color: theme.text }]}>Email Address (Read Only)</Text>
         <TextInput
           style={[styles.input, { borderColor: theme.border, backgroundColor: '#f9f9f9', color: '#999' }]}
           value={email}
           readOnly
         />


         <Text style={[styles.inputLabel, { color: theme.text }]}>Mobile Number</Text>
         <View style={[styles.mobileInputContainer, { borderColor: theme.border }]}>
           <View style={styles.countryCode}>
               <Image source={{ uri: "https://flagcdn.com/w40/ph.png" }} style={styles.flag} />
               <Text style={styles.codeText}>+63</Text>
           </View>
           <TextInput
             style={styles.flexInput}
             value={mobileNumber}
             onChangeText={setMobileNumber}
             keyboardType="phone-pad"
             placeholder="912 345 6789"
           />
         </View>


         <TouchableOpacity
           style={[styles.saveButton, { backgroundColor: theme.headerBg }]}
           onPress={handleSave}
           activeOpacity={0.8}
         >
           <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
         </TouchableOpacity>


       </View>
     </ScrollView>
   </View>
 );
};


const styles = StyleSheet.create({
 container: { flex: 1 },
 headerWrapper: {
   paddingTop: Platform.OS === "ios" ? 50 : 30,
   paddingHorizontal: 20,
   paddingBottom: 60,
   borderBottomLeftRadius: 35,
   borderBottomRightRadius: 35,
 },
 headerTop: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   marginBottom: 20,
 },
 backButton: { padding: 8 },
 headerTitle: {
   fontSize: 18,
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
   width: 110,
   height: 110,
 },
 imageCircle: {
   width: 110,
   height: 110,
   borderRadius: 55,
   backgroundColor: "white",
   borderWidth: 3,
   padding: 3,
   overflow: "hidden",
 },
 avatar: {
   width: '100%',
   height: '100%',
   borderRadius: 55,
 },
 editBadge: {
   position: "absolute",
   bottom: 5,
   right: 5,
   width: 34,
   height: 34,
   borderRadius: 17,
   justifyContent: "center",
   alignItems: "center",
   borderWidth: 3,
   borderColor: "#0A2146",
 },
 scrollBody: {
   paddingHorizontal: 20,
   paddingBottom: 40,
   paddingTop: 30,
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
 inputLabel: {
   fontSize: 12,
   fontFamily: "Poppins-Bold",
   marginBottom: 8,
   textTransform: 'uppercase',
 },
 input: {
   height: 55,
   borderWidth: 1,
   borderRadius: 12,
   paddingHorizontal: 15,
   fontSize: 15,
   fontFamily: "Poppins-Regular",
   marginBottom: 20,
 },
 mobileInputContainer: {
   flexDirection: 'row',
   height: 55,
   borderWidth: 1,
   borderRadius: 12,
   alignItems: 'center',
   marginBottom: 30,
 },
 countryCode: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingHorizontal: 12,
   borderRightWidth: 1,
   borderRightColor: '#E1E7F0',
 },
 flag: { width: 24, height: 16, borderRadius: 2, marginRight: 8 },
 codeText: { fontSize: 15, fontFamily: "Poppins-SemiBold" },
 flexInput: {
   flex: 1,
   paddingHorizontal: 15,
   fontSize: 15,
   fontFamily: "Poppins-Regular",
 },
 saveButton: {
   height: 55,
   borderRadius: 16,
   justifyContent: "center",
   alignItems: "center",
   elevation: 2,
 },
 saveButtonText: {
   color: "white",
   fontSize: 16,
   fontFamily: "Poppins-Bold",
   letterSpacing: 1,
 },
});


export default EditScreenProfile;

