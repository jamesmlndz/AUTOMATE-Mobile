import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 ActivityIndicator,
 TouchableOpacity,
 SafeAreaView,
 StatusBar,
 Dimensions
} from "react-native";
import { getAllFeedback } from "../../../api/appointments";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";


const { width } = Dimensions.get("window");


const AllReviewsScreen = ({ navigation }) => {
 const [reviews, setReviews] = useState([]);
 const [loading, setLoading] = useState(true);


 // --- ESTABLISHED FUNCTIONS (UNCHANGED) ---
 useEffect(() => {
   fetchReviews();
 }, []);


 const fetchReviews = async () => {
   try {
     const res = await getAllFeedback();
     const reviewsData = res.data || res;
     setReviews(
       reviewsData.map((review) => ({
         name: review.name || "Anonymous Customer",
         comment: review.comment,
         rating: review.rating,
         date: review.date,
         refNo: review.refNo || "N/A",
       }))
     );
   } catch (err) {
     console.log("Error fetching reviews:", err.message);
   } finally {
     setLoading(false);
   }
 };


 const renderStars = (rating) => {
   return [...Array(5)].map((_, i) => (
     <Ionicons
       key={i}
       name={i < rating ? "star" : "star-outline"}
       size={14}
       color="#FFD700"
       style={{ marginRight: 2 }}
     />
   ));
 };


 // Helper for Avatar
 const getInitials = (name) => {
   return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
 };


 const averageRating = reviews.length > 0
   ? (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1)
   : "0.0";


 return (
   <View style={styles.screen}>
     <StatusBar barStyle="light-content" />
     <SafeAreaView style={{ flex: 1 }}>
      
       {/* ENHANCED HEADER */}
       <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Ionicons name="chevron-back" size={28} color="#fff" />
         </TouchableOpacity>
         <View style={styles.headerTitleContainer}>
           <Text style={styles.headerTitle}>Customer Feedback</Text>
           <Text style={styles.headerSubtitle}>{reviews.length} total reviews</Text>
         </View>
         <View style={{ width: 40 }} />
       </View>


       {loading ? (
         <View style={styles.centerBox}>
           <ActivityIndicator size="large" color="#FFD700" />
           <Text style={styles.loadingText}>Fetching stories...</Text>
         </View>
       ) : reviews.length === 0 ? (
         <View style={styles.centerBox}>
           <MaterialCommunityIcons name="comment-off-outline" size={60} color="rgba(255,255,255,0.2)" />
           <Text style={styles.noData}>No reviews available yet.</Text>
         </View>
       ) : (
         <ScrollView
           contentContainerStyle={styles.list}
           showsVerticalScrollIndicator={false}
         >
           {/* RATING SUMMARY CARD */}
           <View style={styles.summaryCard}>
               <View>
                   <Text style={styles.summaryScore}>{averageRating}</Text>
                   <View style={{ flexDirection: 'row' }}>{renderStars(Math.round(averageRating))}</View>
               </View>
               <View style={styles.summaryDivider} />
               <Text style={styles.summaryText}>
                   Overall customer satisfaction based on recent visits.
               </Text>
           </View>


           {/* REVIEWS LIST */}
           {reviews.map((review, index) => (
             <View key={index} style={styles.reviewCard}>
               <View style={styles.cardTop}>
                 <View style={styles.avatar}>
                   <Text style={styles.avatarText}>{getInitials(review.name)}</Text>
                 </View>
                 <View style={styles.nameInfo}>
                   <Text style={styles.name}>{review.name}</Text>
                   <View style={styles.starsRow}>
                       {renderStars(review.rating)}
                       <Text style={styles.dateText}>
                           • {review.date ? new Date(review.date).toLocaleDateString() : ""}
                       </Text>
                   </View>
                 </View>
                 <View style={styles.refBadge}>
                   <Text style={styles.refText}>#{review.refNo}</Text>
                 </View>
               </View>


               <View style={styles.commentContainer}>
                 <Ionicons name="quote" size={20} color="rgba(255,215,0,0.2)" style={styles.quoteIcon} />
                 <Text style={styles.comment}>{review.comment}</Text>
               </View>
             </View>
           ))}
         </ScrollView>
       )}
     </SafeAreaView>
   </View>
 );
};


const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: "#0A2146" },
 header: {
   flexDirection: "row",
   alignItems: "center",
   paddingHorizontal: 16,
   paddingVertical: 20,
   justifyContent: "space-between",
 },
 backBtn: {
   padding: 8,
   backgroundColor: 'rgba(255,255,255,0.1)',
   borderRadius: 12,
 },
 headerTitleContainer: { alignItems: 'center' },
 headerTitle: { color: "white", fontSize: 20, fontFamily: "Poppins-Bold" },
 headerSubtitle: { color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Poppins-Regular" },
  list: { padding: 20 },
  summaryCard: {
   flexDirection: 'row',
   backgroundColor: 'rgba(255,255,255,0.05)',
   borderRadius: 20,
   padding: 20,
   alignItems: 'center',
   marginBottom: 25,
   borderWidth: 1,
   borderColor: 'rgba(255,255,255,0.1)',
 },
 summaryScore: { color: 'white', fontSize: 32, fontFamily: 'Poppins-Bold', lineHeight: 35 },
 summaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 20 },
 summaryText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, flex: 1, fontFamily: 'Poppins-Regular' },


 reviewCard: {
   backgroundColor: "white",
   borderRadius: 22,
   padding: 20,
   marginBottom: 20,
   elevation: 4,
   shadowColor: "#000",
   shadowOpacity: 0.2,
   shadowRadius: 10,
 },
 cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
 avatar: {
   width: 45,
   height: 45,
   borderRadius: 15,
   backgroundColor: '#FFB703',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: 12,
 },
 avatarText: { color: '#0A2146', fontFamily: 'Poppins-Bold', fontSize: 16 },
 nameInfo: { flex: 1 },
 name: { color: "#0A2146", fontSize: 16, fontFamily: "Poppins-Bold" },
 starsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
 dateText: { color: "#64748B", fontSize: 11, marginLeft: 5, fontFamily: 'Poppins-Medium' },
  refBadge: {
   backgroundColor: '#F1F5F9',
   paddingHorizontal: 8,
   paddingVertical: 4,
   borderRadius: 8,
 },
 refText: { color: '#64748B', fontSize: 10, fontFamily: 'Poppins-Bold' },


 commentContainer: { position: 'relative', paddingVertical: 5 },
 quoteIcon: { position: 'absolute', top: -10, left: -5 },
 comment: {
   color: "#475569",
   fontSize: 14,
   lineHeight: 22,
   fontFamily: "Poppins-Regular",
   fontStyle: 'italic'
 },
  verifiedRow: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 12,
   paddingTop: 12,
   borderTopWidth: 1,
   borderTopColor: '#F1F5F9'
 },
 verifiedText: { color: "#4ADE80", fontSize: 11, fontFamily: "Poppins-Bold", marginLeft: 5 },


 centerBox: { flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 100 },
 loadingText: { color: 'white', marginTop: 15, fontFamily: 'Poppins-Medium', opacity: 0.6 },
 noData: { color: "rgba(255,255,255,0.4)", fontSize: 16, marginTop: 15, fontFamily: "Poppins-Bold" },
});


export default AllReviewsScreen;

