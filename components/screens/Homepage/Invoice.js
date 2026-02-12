import React from "react";
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 StyleSheet,
 StatusBar,
 Platform,
 Dimensions,
 ScrollView,
 Clipboard
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";


const { width: SCREEN_WIDTH } = Dimensions.get("window");


const Invoice = () => {
 const navigation = useNavigation();
 const route = useRoute();
 const { bookingData } = route.params;


 const formatCurrency = (amount) => {
   if (!amount) return "₱ 0.00";
   return `₱ ${parseFloat(amount).toLocaleString(undefined, {
     minimumFractionDigits: 2,
     maximumFractionDigits: 2,
   })}`;
 };


 const copyToClipboard = () => {
   Clipboard.setString(bookingData?.refNo || "");
   Toast.show({
     type: 'success',
     text1: 'Reference Number Copied',
     position: 'bottom'
   });
 };


 const handleDownloadReceipt = () => {
   if (!bookingData.invoiceImgUrl) {
     Toast.show({
       type: 'error',
       text1: 'No receipt image found.',
     });
     return;
   }
   console.log("Downloading receipt from:", bookingData.invoiceImgUrl);
   Toast.show({
     type: 'info',
     text1: 'Starting download...',
   });
 };


 return (
   <View style={localStyles.container}>
     <StatusBar barStyle="light-content" />


     {/* TIGHTENED HEADER SECTION */}
     <View style={localStyles.headerWrapper}>
       <View style={localStyles.headerTop}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
           <MaterialIcons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={localStyles.headerTitle}>BILLING DETAILS</Text>
         <View style={{ width: 40 }} />
       </View>


       <View style={localStyles.heroSection}>
         <TouchableOpacity onPress={copyToClipboard} style={localStyles.refBadge}>
           <Text style={localStyles.refBadgeText}>#{bookingData?.refNo || "N/A"}</Text>
           <MaterialIcons name="content-copy" size={10} color="rgba(255,255,255,0.6)" />
         </TouchableOpacity>
        
         <Text style={localStyles.totalValue}>
           {formatCurrency(bookingData?.finalCost)}
         </Text>
        
         <View style={localStyles.statusBadge}>
           <MaterialIcons name="check-circle" size={12} color="#4ADE80" />
           <Text style={localStyles.statusBadgeText}>PAID IN FULL</Text>
         </View>
       </View>
     </View>


     <ScrollView
       contentContainerStyle={localStyles.scrollContent}
       showsVerticalScrollIndicator={false}
     >
       {/* RECEIPT IMAGE CARD */}
       <View style={localStyles.invoiceCard}>
         <View style={localStyles.cardHeader}>
           <View style={localStyles.cardHeaderLeft}>
             <MaterialIcons name="receipt-long" size={18} color="#0A2146" />
             <Text style={localStyles.cardHeaderText}>Official Receipt</Text>
           </View>
           <Text style={localStyles.dateText}>
             {bookingData?.scheduledTime ? new Date(bookingData?.scheduledTime).toLocaleDateString() : ""}
           </Text>
         </View>


         <View style={localStyles.imageFrame}>
           {bookingData.invoiceImgUrl ? (
             <Image
               source={{ uri: bookingData.invoiceImgUrl }}
               style={localStyles.receiptImage}
               resizeMode="contain"
             />
           ) : (
             <View style={localStyles.noImageContainer}>
               <MaterialIcons name="cloud-off" size={40} color="#CBD5E1" />
               <Text style={localStyles.noImageText}>Image not available.</Text>
             </View>
           )}
         </View>
       </View>


       {/* SUMMARY CARD */}
       <View style={localStyles.summaryCard}>
          <Text style={localStyles.summaryTitle}>Service Details</Text>
         
          <View style={localStyles.summaryRow}>
             <Text style={localStyles.summaryLabel}>Vehicle</Text>
             <Text style={localStyles.summaryValue}>
               {bookingData?.vehicle?.brand} {bookingData?.vehicle?.model}
             </Text>
          </View>


          <View style={[localStyles.summaryRow, { borderBottomWidth: 0 }]}>
             <Text style={localStyles.summaryLabel}>Service Type</Text>
             <Text style={localStyles.summaryValue}>
               {bookingData?.services?.map(s => s?.service?.name).join(", ") || "General Service"}
             </Text>
          </View>
       </View>


       <TouchableOpacity
         style={localStyles.primaryButton}
         activeOpacity={0.8}
         onPress={handleDownloadReceipt}
       >
         <MaterialIcons name="save-alt" size={20} color="white" />
         <Text style={localStyles.primaryButtonText}>DOWNLOAD RECEIPT</Text>
       </TouchableOpacity>
     </ScrollView>
     <Toast />
   </View>
 );
};


const localStyles = StyleSheet.create({
 container: { flex: 1, backgroundColor: "#F8FAFC" },
 headerWrapper: {
   backgroundColor: "#0A2146",
   paddingTop: Platform.OS === "ios" ? 45 : 30, // Reduced top padding
   paddingHorizontal: 25,
   paddingBottom: 50, // Reduced bottom padding (was 70)
   borderBottomLeftRadius: 35,
   borderBottomRightRadius: 35,
 },
 headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
 backButton: { padding: 5 },
 headerTitle: { fontSize: 15, fontFamily: "Poppins-Bold", color: "white", letterSpacing: 0.8 },
  heroSection: { alignItems: 'center', marginTop: 10 },
 refBadge: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: 'rgba(255,255,255,0.08)',
   paddingHorizontal: 10,
   paddingVertical: 3,
   borderRadius: 6,
   gap: 5,
   marginBottom: 5
 },
 refBadgeText: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Poppins-Medium" },
 totalValue: { color: "white", fontSize: 30, fontFamily: "Poppins-Bold" }, // Slightly smaller font
 statusBadge: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: 'rgba(74, 222, 128, 0.12)',
   paddingHorizontal: 8,
   paddingVertical: 3,
   borderRadius: 10,
   marginTop: 5
 },
 statusBadgeText: { color: "#4ADE80", fontSize: 9, fontFamily: "Poppins-Bold", marginLeft: 4 },


 scrollContent: { paddingHorizontal: 20, marginTop: -35, paddingBottom: 30 },
 invoiceCard: {
   backgroundColor: "white",
   borderRadius: 20,
   padding: 12,
   height: SCREEN_WIDTH * 1.1,
   shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 6,
 },
 cardHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: 10,
   paddingBottom: 8,
   borderBottomWidth: 1,
   borderBottomColor: '#F1F5F9'
 },
 cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
 cardHeaderText: { fontSize: 13, fontFamily: "Poppins-SemiBold", color: "#0A2146" },
 dateText: { fontSize: 11, fontFamily: "Poppins-Medium", color: "#64748B" },
  imageFrame: { flex: 1, backgroundColor: "#F8FAFC", borderRadius: 12, overflow: 'hidden' },
 receiptImage: { width: "100%", height: "100%" },
 noImageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
 noImageText: { color: "#94A3B8", fontFamily: "Poppins-Medium", fontSize: 13, marginTop: 10 },


 summaryCard: {
   backgroundColor: "white",
   borderRadius: 15,
   padding: 18,
   marginTop: 12,
   elevation: 2,
   shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8,
 },
 summaryTitle: { fontFamily: "Poppins-Bold", color: "#0A2146", marginBottom: 10, fontSize: 14 },
 summaryRow: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   paddingVertical: 10,
   borderBottomWidth: 1,
   borderBottomColor: '#F1F5F9'
 },
 summaryLabel: { fontFamily: "Poppins-Regular", color: "#64748B", fontSize: 12 },
 summaryValue: { fontFamily: "Poppins-SemiBold", color: "#0A2146", fontSize: 12, textAlign: 'right', flex: 1, marginLeft: 20 },


 primaryButton: {
   backgroundColor: "#0A2146",
   flexDirection: 'row',
   height: 55,
   borderRadius: 15,
   justifyContent: "center",
   alignItems: "center",
   marginTop: 15,
   gap: 8,
 },
 primaryButtonText: { color: "white", fontSize: 14, fontFamily: "Poppins-Bold" },
});


export default Invoice;

