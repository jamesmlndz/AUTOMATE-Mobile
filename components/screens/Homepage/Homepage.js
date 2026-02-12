import React, { useState } from "react";
import {
 View,
 Text,
 TouchableOpacity,
 ScrollView,
 Image,
 TextInput,
 StyleSheet,
 Platform,
 Dimensions,
 LayoutAnimation,
 UIManager,
 Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// IMPORTED ICONS FOR ENHANCED SECTIONS
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import { useAuth } from "../../../context/authContext";


const { width: SCREEN_WIDTH } = Dimensions.get("window");


// Enable LayoutAnimation on Android
if (
 Platform.OS === "android" &&
 UIManager.setLayoutAnimationEnabledExperimental
) {
 UIManager.setLayoutAnimationEnabledExperimental(true);
}


const Homepage = () => {
 const { currentUser } = useAuth();
 const navigation = useNavigation();
 const [searchQuery, setSearchQuery] = useState("");


 // 🌙 THEME STATE
 const [isDarkMode, setIsDarkMode] = useState(false);
 const toggleTheme = () => setIsDarkMode((prev) => !prev);


 // 🌈 REVISED MINIMAL DARK THEME COLORS
 const theme = {
   // General Colors (Minimal Dark)
   background: isDarkMode ? "#121212" : "#F6F8FC", // Near Black / Lightest background
   card: isDarkMode ? "#1F1F1F" : "#FFFFFF", // Card/Container background (slightly lighter than background)
   text: isDarkMode ? "#E0E0E0" : "#0A2146", // Primary text color (Soft Off-White)
   subtext: isDarkMode ? "#FFFFFF" : "#FFFFFF", // Secondary/Muted text color (Medium Grey)


   // Header & Search
   headerBg: isDarkMode ? "#000000" : "#0A2146", // Pure Black Header / Deep Blue Header
   searchBg: isDarkMode ? "#2D2D2D" : "#245097ff", // Search bar background
   searchInputText: isDarkMode ? "#FFFFFF" : "#FFFFFF", // Search input text color
   searchPlaceholder: isDarkMode ? "#FFFFFF" : "#FFFFFF", // Search placeholder color
   searchIcon: isDarkMode ? "#FFFFFF" : "#FFFFFF", // Search icon color
   greetingText: isDarkMode ? "#B0B0B0" : "#C5D4E8", // Muted text in header


   // Quick Access & Buttons
   iconCircle: isDarkMode ? "#333333" : "#274B88", // Icon circle background
   icon: isDarkMode ? "#E0E0E0" : "#F0F3F9", // Icon color
   quickCardBorder: isDarkMode ? "#3A3A3A" : "#E1E7F0", // Quick card border


   // Separators & Borders
   border: isDarkMode ? "#333333" : "#DDD", // General border color


   // Accent Colors
   accentBlue: isDarkMode ? "#245097ff" : "#274B88", // Primary accent color (links/buttons - Subtle Purple/Blue)
   accentYellow: isDarkMode ? "#FFD700" : "#FFD700", // Theme toggle sun/moon icon
  
   // Call to Action
   ctaBg: isDarkMode ? "#000000" : "#0d2147", // CTA container background
   ctaButtonBg: isDarkMode ? "#245097ff" : "#FFFFFF", // CTA button background (matches accent)
   ctaButtonText: isDarkMode ? "#000000" : "#0d2147", // CTA button text color (Black text on light accent)
  
 };


 const greetings =
   new Date().getHours() < 12
     ? "Good Morning"
     : new Date().getHours() < 18
     ? "Good Afternoon"
     : "Good Evening";


 const handleSearch = () => {
   if (!searchQuery.trim()) return;
   navigation.navigate("Services", { filter: { name: searchQuery.trim() } });
   setSearchQuery("");
 };


 // FUNCTIONS & DATA (NO CHANGE)
 const services = [
   { icon: "calendar-check-o", label: "Book", route: "Booking" },
   { icon: "list-alt", label: "Appointments", route: "UpcomingAppointment" },
   { icon: "road", label: "Service Tracker", route: "TrackingProgress" },
   { icon: "car", label: "My Vehicle", route: "Vehicles" },
 ];


 const recommended = [
   {
     title: "Engine Diagnostics",
     desc: "Advanced scanning for optimal performance",
     img: require("../../../assets/services/Check engine scanning.jpg"),
   },
   {
     title: "Battery Replacement",
     desc: "Quick, reliable, and tested performance",
     img: require("../../../assets/services/Battery and accessories.jpg"),
   },
   {
     title: "Wheel Alignment",
     desc: "Precision handling for every drive",
     img: require("../../../assets/services/Wheel Balancing.jpg"),
   },
 ];


 const customerStories = [
   {
     name: "John Dela Cruz",
     review: "Great Service",
     img: require("../../../assets/services/Customer.jpg"),
   },
   {
     name: "Jaypee Santos",
     review: "Solid Mechanics!",
     img: require("../../../assets/services/Customer2.jpg"),
   },
   {
     name: "Carlos Reyes",
     review: "The best car service management experience",
     img: require("../../../assets/services/Customer3.jpg"),
   },
   {
     name: "Angelo Cruz",
     review: "Will definitely come back",
     img: require("../../../assets/services/Customer.jpg"),
   },
 ];


 const [expanded, setExpanded] = useState(false);
 const toggleExpand = () => {
   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   setExpanded(!expanded);
 };


 const visibleStories = expanded
   ? customerStories
   : customerStories.slice(0, 2);


 // --- START OF RENDER ---
 return (
   <View style={[styles.container, { backgroundColor: theme.background }]}>
     <ScrollView showsVerticalScrollIndicator={false}>
       {/* ===== HEADER (NO CHANGE) ===== */}
       <View style={[styles.headerWrapper, { backgroundColor: theme.headerBg }]}>
         <View style={styles.headerTop}>
           <TouchableOpacity
             onPress={() => navigation.navigate("ProfileScreen")}
             style={[styles.avatarContainer, { borderColor: theme.searchBg, backgroundColor: isDarkMode ? "#21262D" : "#1B3B70" }]}
           >
             <SvgUri
               uri={`https://api.dicebear.com/9.x/initials/svg?seed=${
                 currentUser?.name || "User"
               }`}
               width="70"
               height="70"
             />
           </TouchableOpacity>


           <View style={styles.headerTextContainer}>
             <Text style={[styles.greetingText, { color: theme.greetingText }]}>
               {greetings},
             </Text>
             <Text style={[styles.userName, { color: theme.searchInputText }]}>
               {currentUser?.name || "User"}
             </Text>
             <Text style={[styles.headerTagline, { color: theme.searchPlaceholder }]}>
               Welcome to AutoMate
             </Text>
           </View>


           {/* THEME TOGGLE BUTTON */}
           <TouchableOpacity
             onPress={toggleTheme}
             style={{ marginLeft: "auto", padding: 10 }}
           >
             <FontAwesome
               name={isDarkMode ? "sun-o" : "moon-o"}
               size={26}
               color={isDarkMode ? theme.accentYellow : theme.searchInputText}
             />
           </TouchableOpacity>
         </View>


         {/* search */}
         <View style={styles.searchWrapper}>
           <View style={[styles.searchBar, { backgroundColor: theme.searchBg }]}>
             <FontAwesome
               name="search"
               size={18}
               color={theme.searchIcon}
               style={{ marginRight: 10 }}
             />
             <TextInput
               placeholder="Search services..."
               placeholderTextColor={theme.searchPlaceholder}
               value={searchQuery}
               onChangeText={setSearchQuery}
               style={[styles.searchInput, { color: theme.searchInputText }]}
               onSubmitEditing={handleSearch}
               returnKeyType="search"
             />
           </View>
         </View>
       </View>


       {/* ===== 💰 ENHANCED PROMOTIONS =====
       <View style={[styles.sectionWrap, { backgroundColor: theme.card }]}>
         <Text style={[styles.sectionTitle, { color: theme.text }]}>
           <MaterialCommunityIcons name="tag-outline" size={18} color={theme.accentBlue} /> Exclusive Offers
         </Text>
         <ScrollView
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={enhancedStyles.promoScrollContainer}
         >
           {[
             {
               title: "Buy 4 for the price of 3",
               desc: "Valid until Dec 30, 2025",
               img: require("../../../assets/Promo.jpg"),
             },
             {
               title: "Pachinko",
               desc: "Win a premium item",
               img: require("../../../assets/services/Promo2.jpg"),
             },
             {
               title: "GoodYear tires promo",
               desc: "Get up to php 1400 service voucher",
               img: require("../../../assets/services/Promo3.jpg"),
             },
           ].map((promo, idx) => (
             <TouchableOpacity
               key={idx}
               style={[enhancedStyles.promoCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}
               activeOpacity={0.9}
               onPress={() => navigation.navigate("Services")}
             >
               <Image source={promo.img} style={enhancedStyles.promoImage} />
               <View style={enhancedStyles.promoOverlay}>
                 <Text style={enhancedStyles.promoTitle}>{promo.title}</Text>
                 <Text style={enhancedStyles.promoDesc}>{promo.desc}</Text>
               </View>
             </TouchableOpacity>
           ))}
         </ScrollView>
       </View> */}


       {/* ===== ⚙️ ENHANCED QUICK ACCESS (AutoMate Hub) ===== */}
       <View style={[styles.sectionWrap, enhancedStyles.quickAccessSection, { backgroundColor: theme.background }]}>
         <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 0 }]}>AutoMate Hub</Text>
         <View style={enhancedStyles.quickGrid}>
           {services.map((item, index) => (
             <TouchableOpacity
               key={index}
               onPress={() => navigation.navigate(item.route)}
               activeOpacity={0.85}
               style={[enhancedStyles.quickCard, { backgroundColor: theme.card, borderColor: theme.quickCardBorder }]}
             >
               <View style={[styles.iconCircle, { backgroundColor: theme.iconCircle }]}>
                 <FontAwesome name={item.icon} size={20} color={theme.icon} />
               </View>
               <Text style={[enhancedStyles.quickLabel, { color: theme.text }]}>
                 {item.label}
               </Text>
             </TouchableOpacity>
           ))}
         </View>
       </View>


       {/* ===== ⭐ ENHANCED RECOMMENDED ===== */}
       <View style={[styles.sectionWrap, { backgroundColor: theme.card }]}>
         <Text style={[styles.sectionTitle, { color: theme.text }]}>
           Recommended for You
         </Text>
         <ScrollView
           horizontal
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={enhancedStyles.recommendScrollContainer}
         >
           {recommended.map((rec, rIdx) => (
             <TouchableOpacity
               key={rIdx}
               activeOpacity={0.9}
               style={[enhancedStyles.recommendCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}
               onPress={() =>
                 navigation.navigate("Services", { filter: { name: rec.title } })
               }
             >
               <Image source={rec.img} style={enhancedStyles.recommendImage} />
               <View style={enhancedStyles.recommendOverlay}>
                 <Text style={enhancedStyles.recommendTitle}>{rec.title}</Text>
                 <Text style={enhancedStyles.recommendDesc} numberOfLines={2}>
                   {rec.desc}
                 </Text>
                 <TouchableOpacity
                   style={[enhancedStyles.bookButton, { backgroundColor: theme.accentBlue }]}
                   activeOpacity={0.85}
                   onPress={() => navigation.navigate("Booking")}
                 >
                   <Text style={enhancedStyles.bookButtonText}>Book Now</Text>
                 </TouchableOpacity>
               </View>
             </TouchableOpacity>
           ))}
         </ScrollView>
       </View>


       {/* ===== 🔧 ENHANCED POPULAR SERVICES ===== */}
       <View style={[styles.sectionWrap, { backgroundColor: theme.background }]}>
         <View style={styles.categoryHeader}>
           <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 0 }]}>
             Popular Services
           </Text>
           <TouchableOpacity onPress={() => navigation.navigate("Services")}>
             <Text style={[styles.viewAll, { color: theme.accentBlue }]}>See All</Text>
           </TouchableOpacity>
         </View>


         <View style={enhancedStyles.categoriesContainer}>
           {[
             {
               label: "Change Oil",
               img: require("../../../assets/services/Change Oil.jpg"),
             },
             {
               label: "Brake Disc",
               img: require("../../../assets/services/BrakeDisc.jpg"),
             },
             {
               label: "Battery & Accessories",
               img: require("../../../assets/services/Battery and accessories.jpg"),
             },
             {
               label: "Wheel Balancing",
               img: require("../../../assets/services/Wheel Balancing.jpg"),
             },
           ].map((cat, idx) => (
             <TouchableOpacity
               key={idx}
               style={[enhancedStyles.categoryCard, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: isDarkMode ? 1 : 0 }]}
               activeOpacity={0.9}
               onPress={() =>
                 navigation.navigate("Services", { filter: { name: cat.label } })
               }
             >
               <Image source={cat.img} style={enhancedStyles.categoryImage} />
               <View style={enhancedStyles.categoryOverlay}>
                 <Text style={enhancedStyles.categoryLabel}>{cat.label}</Text>
               </View>
             </TouchableOpacity>
           ))}
         </View>
       </View>


       {/* ===== ⏱️ ENHANCED OPERATING HOURS ===== */}
       <View style={[enhancedStyles.hoursSection, { backgroundColor: theme.card, borderColor: theme.border }]}>
         <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 0 }]}>
            <Ionicons name="time-outline" size={18} color={theme.accentBlue} /> Operating Hours
         </Text>
         <View style={enhancedStyles.hoursSeparator} />


         <View style={enhancedStyles.hoursRow}>
           <Text style={[enhancedStyles.hoursDay, { color: theme.text }]}>
             Monday - Saturday
           </Text>
           <Text style={[enhancedStyles.hoursTime, { color: theme.accentBlue }]}>
             8:00 AM - 5:00 PM
           </Text>
         </View>


         <View style={enhancedStyles.hoursRow}>
           <Text style={[enhancedStyles.hoursDay, { color: theme.text }]}>Sunday</Text>
           <Text style={[enhancedStyles.hoursTime, { color: theme.subtext }]}>Closed</Text>
         </View>
       </View>


       {/* =====  CUSTOMER STORIES ===== */}
       <View style={[styles.sectionWrap, { backgroundColor: theme.background, marginTop: 0 }]}>
         <View style={styles.categoryHeader}>
           <View>
             <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 0 }]}>
               What Our Customers Say
             </Text>
             <Text style={[enhancedStyles.reviewSubtitle, { color: isDarkMode ? "#B0B0B0" : "#64748B" }]}>
               {customerStories.length}+ satisfied clients
             </Text>
           </View>
           <TouchableOpacity onPress={() => navigation.navigate("AllReviewsScreen")}>
              <Text style={[styles.viewAll, { color: theme.accentBlue }]}>View All</Text>
           </TouchableOpacity>
         </View>


         <ScrollView
           horizontal={!expanded}
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={[
             enhancedStyles.storyScrollContainer,
             expanded && enhancedStyles.expandedGrid,
           ]}
         >
           {visibleStories.map((s, i) => (
             <View
               key={i}
               style={[
                 enhancedStyles.modernStoryCard,
                 expanded && enhancedStyles.modernStoryCardExpanded,
                 { backgroundColor: theme.card, borderColor: theme.border },
               ]}
             >
               {/* Header: Avatar & Name */}
               <View style={enhancedStyles.storyHeader}>
                 <Image source={s.img} style={enhancedStyles.userAvatar} />
                 <View style={enhancedStyles.userInfo}>
                   <Text style={[enhancedStyles.userNameText, { color: theme.text }]} numberOfLines={1}>
                     {s.name}
                   </Text>
                   <View style={enhancedStyles.ratingRow}>
                     {[1, 2, 3, 4, 5].map((star) => (
                       <FontAwesome key={star} name="star" size={10} color="#FFD700" />
                     ))}
                   </View>
                 </View>
               </View>


               {/* Body: Review Text */}
               <View style={enhancedStyles.reviewBody}>
                 <Text style={[enhancedStyles.reviewText, { color: isDarkMode ? "#E0E0E0" : "#4A5568" }]} numberOfLines={3}>
                   “{s.review}”
                 </Text>
               </View>


               <View style={[enhancedStyles.timeBadge, { backgroundColor: isDarkMode ? "#2D2D2D" : "#F1F5F9" }]}>
                  <Text style={[enhancedStyles.timeText, { color: isDarkMode ? "#B0B0B0" : "#64748B" }]}>Recently</Text>
               </View>
             </View>
           ))}
         </ScrollView>


         {/* Toggle Expand Button (Nicely Styled) */}
         <TouchableOpacity
           activeOpacity={0.8}
           style={[enhancedStyles.expandToggle, { borderColor: theme.accentBlue }]}
           onPress={toggleExpand}
         >
           <Text style={[enhancedStyles.expandToggleText, { color: theme.accentBlue }]}>
             {expanded ? "Show Less" : "Quick View All"}
           </Text>
           <Ionicons
             name={expanded ? "chevron-up" : "chevron-down"}
             size={16}
             color={theme.accentBlue}
           />
         </TouchableOpacity>
       </View>


       {/* ===== 🛠️ ENHANCED TEAM SECTION (FROM PREVIOUS REQUEST) ===== */}
       <View style={localStyles.sectionWrapper}>
         <View style={[localStyles.enhancedCard, { backgroundColor: theme.card }]}>
           <View style={localStyles.titleRow}>
             <MaterialCommunityIcons
               name="account-group-outline"
               size={24}
               color={theme.accentBlue}
             />
             <Text style={[localStyles.enhancedSectionTitle, { color: theme.accentBlue }]}>
               Meet Our Dedicated Team
             </Text>
           </View>


           <Image
             source={require("../../../assets/services/Team.jpg")}
             style={localStyles.enhancedTeamGroupImage}
           />
          
           <Text style={[localStyles.enhancedTeamDescription, { color: theme.text }]}>
             At{" "}
             <Text
               style={{
                 color: theme.accentBlue,
                 fontFamily: "Poppins-Bold",
               }}
             >
               Tierodman Car Shop
             </Text>
             , our dedicated team of certified mechanics and expert advisors delivers
             precise, honest, and timely service. We value transparency and skill—your vehicle is in good hands.
           </Text>
         </View>
       </View>


       {/* ===== 🥇 ENHANCED ABOUT SECTION (FROM PREVIOUS REQUEST) ===== */}
       <View style={localStyles.sectionWrapper}>
         <View style={[localStyles.enhancedCard, { backgroundColor: theme.card }]}>
          
           <View style={localStyles.titleRow}>
             <Ionicons
               name="business-outline"
               size={24}
               color={theme.accentBlue}
             />
             <Text style={[localStyles.enhancedSectionTitle, { color: theme.accentBlue }]}>
               About Tierodman Car Shop
             </Text>
           </View>


           <View style={localStyles.aboutContentRow}>
            
             <View style={localStyles.aboutTextContainer}>
               <Text style={[localStyles.aboutLegacyText, { color: theme.text }]}>
                 Tierodman Auto Center Inc.
                 {"\n"}
                 <Text style={{ color: theme.accentBlue, fontSize: 18, fontFamily: "Poppins-Bold" }}>
                   Since 1986
                 </Text>
                 {"\n"}
                 <Text style={{ color: theme.text, fontSize: 14 }}>
                   Decades of Trust; Excellence in Every Repair.
                 </Text>
               </Text>
              
               <View style={localStyles.certificationBadge}>
                 <Ionicons name="checkmark-circle" size={16} color="green" />
                 <Text style={[localStyles.badgeText, { color: theme.text }]}>
                   Official Goodyear Autocare in Makati
                 </Text>
               </View>
             </View>
            
             <Image
               source={require("../../../assets/services/Shop.jpg")}
               style={localStyles.enhancedAboutImage}
             />
           </View>
         </View>
       </View>


       {/* ===== 📞 ENHANCED CONTACT US ===== */}
       <View style={[enhancedStyles.contactSection, { backgroundColor: theme.card }]}>
         <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 0 }]}>
           <FontAwesome name="address-book-o" size={18} color={theme.accentBlue} /> Contact Us
         </Text>
         <View style={enhancedStyles.contactDivider} />




         <TouchableOpacity style={enhancedStyles.contactRow} onPress={() => Linking.openURL("https://maps.app.goo.gl/YourMapLink")}>
           <FontAwesome name="map-marker" size={20} color={theme.accentBlue} />
           <Text style={[enhancedStyles.contactText, { color: theme.text }]}>
             246 PABLO OCAMPO EXT. COR. SAMPALOC ST. Makati, Philippines
           </Text>
         </TouchableOpacity>


         <TouchableOpacity style={enhancedStyles.contactRow} onPress={() => Linking.openURL("tel:+639178496894")}>
           <FontAwesome name="phone" size={20} color={theme.accentBlue} />
           <Text style={[enhancedStyles.contactText, { color: theme.text, textDecorationLine: 'underline' }]}>
             0917 849 6894
           </Text>
         </TouchableOpacity>


         <TouchableOpacity style={enhancedStyles.contactRow} onPress={() => Linking.openURL("mailto:tierodmanautocenter@gmail.com")}>
           <FontAwesome name="envelope" size={20} color={theme.accentBlue} />
           <Text style={[enhancedStyles.contactText, { color: theme.text, textDecorationLine: 'underline' }]}>
             tierodmanautoc@yahoo.com
           </Text>
         </TouchableOpacity>


         <TouchableOpacity style={enhancedStyles.contactRow} onPress={() => Linking.openURL("https://www.facebook.com/tierodmanautocenter")}>
           <FontAwesome name="facebook-square" size={20} color="#1877F2" />
           <Text style={[enhancedStyles.contactText, { color: "#1877F2", textDecorationLine: 'underline' }]}>
             Tierodman Car Shop (Facebook)
           </Text>
         </TouchableOpacity>
       </View>


       {/* ===== 🚨 ENHANCED CTA FOOTER ===== */}
       <View style={[enhancedStyles.ctaContainer, { backgroundColor: theme.ctaBg }]}>
         <Text style={enhancedStyles.ctaHeadline}>Ready to roll?</Text>
         <Text style={enhancedStyles.ctaSubheadline}>Schedule your service with AutoMate today!</Text>


         <TouchableOpacity
           style={[enhancedStyles.ctaButton, { backgroundColor: theme.ctaButtonBg }]}
           onPress={() => navigation.navigate("Booking")}
           activeOpacity={0.9}
         >
           <Text style={[enhancedStyles.ctaButtonText, { color: theme.ctaButtonText }]}>
             Book an Appointment
           </Text>
         </TouchableOpacity>


         <Text style={enhancedStyles.ctaFooter}>
           © {new Date().getFullYear()} Tierodman Car Shop
         </Text>
       </View>
     </ScrollView>
   </View>
 );
};


export default Homepage;




// --------------------------------------------------------------------------
// --- BASE & UNCHANGED STYLES ---
// --------------------------------------------------------------------------
const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 headerWrapper: {
   borderBottomLeftRadius: 26,
   borderBottomRightRadius: 26,
   paddingTop: Platform.OS === "ios" ? 68 : 48,
   paddingHorizontal: 22,
   paddingBottom: 20,
   shadowColor: "#000",
   shadowOpacity: 0.1,
   shadowRadius: 8,
   elevation: 6,
 },
 headerTop: {
   flexDirection: "row",
   alignItems: "center",
 },
 avatarContainer: {
   width: 70,
   height: 70,
   justifyContent: "center",
   alignItems: "center",
   marginRight: 12,
   borderRadius: 35,
   overflow: "hidden",
   borderWidth: 2,
   shadowColor: "#000",
   shadowOpacity: 0.25,
   shadowOffset: { width: 0, height: 2 },
   shadowRadius: 3.5,
   elevation: 4,
 },
 greetingText: {
   fontSize: 16,
   fontFamily: "Poppins-Regular",
 },
 userName: {
   fontSize: 22,
   fontFamily: "Poppins-Bold",
 },
 headerTagline: {
   fontSize: 15,
   fontFamily: "Poppins-Regular",
   marginTop: 2,
 },
 searchWrapper: {
   marginTop: 14,
 },
 searchBar: {
   flexDirection: "row",
   alignItems: "center",
   borderRadius: 14,
   paddingHorizontal: 14,
   paddingVertical: 10,
   marginHorizontal: 12,
 },
 searchInput: {
   flex: 1,
   fontFamily: "Poppins-Regular",
   fontSize: 15,
 },
 sectionWrap: {
   marginTop: 20,
   paddingVertical: 30,
   paddingHorizontal: 20,
   borderRadius: 20,
   shadowColor: "#000",
   shadowOpacity: 0.05,
   shadowRadius: 6,
   elevation: 2,
 },
 sectionTitle: {
   fontFamily: "Poppins-Bold",
   fontSize: 18,
   marginLeft: 5,
   marginBottom: 12,
   flexDirection: 'row',
   alignItems: 'center',
 },
 sectionSubtitle: {
   fontSize: 13,
   marginBottom: 18,
   fontFamily: "Poppins-Regular",
   paddingHorizontal: 20,
 },
 viewAll: {
   fontFamily: "Poppins-Bold",
   fontSize: 13,
   marginBottom: 12,
 },
 categoryHeader: {
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   marginHorizontal: 0,
   marginBottom: 8,
   paddingHorizontal: 5,
 },
 iconCircle: {
   width: 54,
   height: 54,
   borderRadius: 27,
   alignItems: "center",
   justifyContent: "center",
   marginBottom: 10,
 },
 scrollContainer: {
   paddingBottom: 10,
   paddingHorizontal: 10,
 },
 storyCard: {
   borderRadius: 16,
   marginRight: 14,
   marginBottom: 16,
   width: SCREEN_WIDTH * 0.7,
   shadowColor: "#000",
   shadowOpacity: 0.08,
   shadowRadius: 5,
   elevation: 3,
   overflow: "hidden",
   borderWidth: 1,
 },
 storyCardExpanded: {
   width: "47%",
   marginHorizontal: 4,
   marginVertical: 4,
   elevation: 5,
   shadowOpacity: 0.2,
   transform: [{ scale: 1.0 }],
 },
 storyImage: {
   width: "100%",
   height: 140,
   borderTopLeftRadius: 16,
   borderTopRightRadius: 16,
 },
 storyContent: {
   padding: 15,
 },
 storyName: {
   fontSize: 15,
   fontFamily: "Poppins-Bold",
   marginBottom: 4,
 },
 storyReview: {
   fontSize: 12,
   lineHeight: 18,
   fontFamily: "Poppins-Regular",
 },
 viewAllBtn: {
   borderRadius: 25,
   paddingVertical: 10,
   paddingHorizontal: 30,
   alignItems: "center",
   alignSelf: "center",
   marginTop: 15,
   marginBottom: 5,
   elevation: 3,
   shadowColor: "#000",
   shadowOpacity: 0.15,
   shadowRadius: 4,
 },
 viewAllText: {
   color: "#fff",
   fontSize: 14,
   fontFamily: "Poppins-Bold",
   letterSpacing: 0.5,
 },
 expandedScroll: {
   flexDirection: "row",
   flexWrap: "wrap",
   justifyContent: "space-between",
   paddingBottom: 10,
   paddingHorizontal: 10,
 },
 // Placeholders for removed old styles (Team/About)
 teamSection: { width: 0, height: 0, padding: 0, margin: 0 },
 aboutSection: { width: 0, height: 0, padding: 0, margin: 0 },
 aboutCard: { width: 0, height: 0, padding: 0, margin: 0 },
});




// --------------------------------------------------------------------------
// --- ENHANCED STYLES FOR TEAM/ABOUT (localStyles) ---
// --------------------------------------------------------------------------
const localStyles = StyleSheet.create({
 sectionWrapper: {
   paddingHorizontal: 16,
   paddingVertical: 10,
 },
 enhancedCard: {
   borderRadius: 15,
   padding: 20,
   elevation: 8,
   shadowColor: "#000",
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.15,
   shadowRadius: 6,
   borderWidth: 1,
   borderColor: '#E0E0E0',
   marginBottom: 10,
 },
 titleRow: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 15,
 },
 enhancedSectionTitle: {
   fontSize: 20,
   fontFamily: "Poppins-Bold",
   marginLeft: 10,
 },
  enhancedTeamGroupImage: {
   width: '100%',
   height: 180,
   borderRadius: 10,
   marginBottom: 15,
   resizeMode: 'cover',
 },
 enhancedTeamDescription: {
   fontSize: 14,
   lineHeight: 22,
   fontFamily: "Poppins-Regular",
   textAlign: 'justify',
 },
  aboutContentRow: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'flex-start',
 },
 aboutTextContainer: {
   flex: 1,
   paddingRight: 15,
 },
 aboutLegacyText: {
   fontSize: 15,
   lineHeight: 22,
   marginBottom: 10,
   fontFamily: "Poppins-Regular",
 },
 enhancedAboutImage: {
   width: 120,
   height: 120,
   borderRadius: 10,
   resizeMode: 'cover',
 },
 certificationBadge: {
   flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: '#E6F3FF',
   padding: 8,
   borderRadius: 8,
   borderLeftWidth: 3,
   borderLeftColor: 'green',
   marginTop: 5,
 },
 badgeText: {
   fontSize: 12,
   fontFamily: 'Poppins-SemiBold',
   marginLeft: 5,
 }
});




// --------------------------------------------------------------------------
// --- ENHANCED STYLES FOR ALL OTHER SECTIONS (enhancedStyles) ---
// --------------------------------------------------------------------------
const enhancedStyles = StyleSheet.create({
 // ** PROMOTIONS **
 promoScrollContainer: {
   paddingHorizontal: 5, // Tighter padding for scroll
 },
 promoCard: {
   width: SCREEN_WIDTH * 0.75, // Slightly wider card
   height: 160, // Slightly taller
   borderRadius: 14,
   marginRight: 12,
   overflow: "hidden",
   shadowColor: "#000",
   shadowOpacity: 0.1,
   shadowRadius: 5,
   elevation: 4,
 },
 promoImage: {
   width: "100%",
   height: "100%",
   resizeMode: "cover",
 },
 promoOverlay: {
   position: "absolute",
   bottom: 0,
   padding: 15,
   backgroundColor: "rgba(0,0,0,0.4)", // Darker overlay for better text readability
   width: "100%",
 },
 promoTitle: {
   color: "#FFFFFF",
   fontFamily: "Poppins-Bold",
   fontSize: 16,
 },
 promoDesc: {
   color: "#E0E0E0",
   fontFamily: "Poppins-Regular",
   fontSize: 12,
 },


 // ** QUICK ACCESS **
 quickAccessSection: {
   marginHorizontal: 0,
   paddingHorizontal: 20,
   paddingTop: 10,
   paddingBottom: 25,
 },
 quickGrid: {
   flexDirection: "row",
   flexWrap: "wrap",
   justifyContent: "space-around", // Centered alignment
 },
 quickCard: {
   width: SCREEN_WIDTH * 0.42, // Adjusted for better spacing
   borderRadius: 14,
   alignItems: "center",
   justifyContent: "center",
   paddingVertical: 18,
   marginBottom: 14,
   borderWidth: 1,
   shadowColor: "#000",
   shadowOpacity: 0.05,
   shadowRadius: 4,
   elevation: 2,
 },
 quickLabel: {
   fontFamily: "Poppins-Regular", // Slightly stronger font
   fontSize: 14,
 },


 // ** RECOMMENDED **
 recommendScrollContainer: {
   paddingHorizontal: 5,
 },
 recommendCard: {
   width: SCREEN_WIDTH * 0.7, // Slightly larger card
   height: 180, // Taller card for more balanced ratio
   borderRadius: 14,
   marginRight: 12,
   overflow: "hidden",
   shadowColor: "#000",
   shadowOpacity: 0.15,
   shadowRadius: 8,
   elevation: 6,
 },
 recommendImage: {
   width: "100%",
   height: "100%",
   resizeMode: "cover",
 },
 recommendOverlay: {
   position: "absolute",
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: "rgba(10,33,70,0.65)",
   padding: 12,
 },
 recommendTitle: {
   color: "#F0F3F9",
   fontFamily: "Poppins-Bold",
   fontSize: 16,
   marginBottom: 4,
 },
 recommendDesc: {
   color: "#DCE4F2",
   fontFamily: "Poppins-Regular",
   fontSize: 12,
   marginBottom: 8,
 },
 bookButton: {
   alignSelf: "flex-end",
   paddingVertical: 7,
   paddingHorizontal: 15,
   borderRadius: 10,
 },
 bookButtonText: {
   color: "#FFFFFF",
   fontFamily: "Poppins-Bold",
   fontSize: 13,
 },


 // ** POPULAR SERVICES **
 categoriesContainer: {
   flexDirection: "row",
   justifyContent: "space-between",
   flexWrap: "wrap",
   marginHorizontal: 0,
 },
 categoryCard: {
   width: SCREEN_WIDTH * 0.42, // Proportional width
   height: 140, // Reduced height for better card stacking
   borderRadius: 14,
   overflow: "hidden",
   marginBottom: 16,
   shadowColor: "#000",
   shadowOpacity: 0.08,
   shadowRadius: 5,
   elevation: 3,
 },
 categoryImage: {
   width: "100%",
   height: "100%",
   resizeMode: "cover",
 },
 categoryOverlay: {
   position: "absolute",
   bottom: 0,
   width: "100%",
   paddingVertical: 8,
   backgroundColor: "rgba(0,0,0,0.5)",
   alignItems: "center",
 },
 categoryLabel: {
   color: "#FFFFFF",
   fontFamily: "Poppins-SemiBold",
   fontSize: 13,
 },


 // ** OPERATING HOURS **
 hoursSection: {
   marginTop: 25,
   paddingHorizontal: 24,
   paddingVertical: 20,
   borderRadius: 18,
   shadowColor: "#000",
   shadowOpacity: 0.15,
   shadowRadius: 8,
   elevation: 5,
   width: "90%",
   alignSelf: "center",
   marginBottom: 30,
 },
 hoursSeparator: {
   height: 1,
   backgroundColor: '#3333331A', // Light separator
   marginVertical: 10,
 },
 hoursRow: {
   flexDirection: "row",
   justifyContent: "space-between",
   marginBottom: 8,
   alignItems: 'center',
 },
 hoursDay: {
   fontFamily: "Poppins-Regular",
   fontSize: 15,
 },
 hoursTime: {
   fontFamily: "Poppins-Bold",
   fontSize: 15,
 },


 // ** CONTACT US **
 contactSection: {
   marginTop: 35,
   paddingHorizontal: 24,
   paddingVertical: 20,
   borderRadius: 18,
   shadowColor: "#000",
   shadowOpacity: 0.15,
   shadowRadius: 8,
   elevation: 5,
   width: "90%",
   alignSelf: "center",
   marginBottom: 30,
 },
 contactDivider: {
   height: 1,
   backgroundColor: '#3333331A',
   marginVertical: 10,
   marginBottom: 15,
 },
 contactRow: {
   flexDirection: "row",
   alignItems: "flex-start",
   marginBottom: 15, // Increased spacing
 },
 contactText: {
   marginLeft: 15, // Increased indentation
   fontFamily: "Poppins-Regular",
   fontSize: 14,
   flexShrink: 1,
 },


 // ** CTA FOOTER **
ctaContainer: {
   paddingVertical: 40, // Increased padding
   paddingHorizontal: 20,
   marginTop: 10,
   alignItems: "center",
 },
 ctaHeadline: {
     color: "#FFFFFF",
     fontFamily: "Poppins-Bold",
     fontSize: 24, // Larger headline
     marginBottom: 8,
 },
 ctaSubheadline: {
     color: "#C5D4E8",
     fontFamily: "Poppins-Regular",
     fontSize: 15,
     marginBottom: 20,
     textAlign: 'center',
 },
 ctaButton: {
     borderRadius: 30, // Pill shape
     paddingVertical: 14,
     paddingHorizontal: 35,
     marginBottom: 15,
     width: "90%",
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     elevation: 0, // <-- Set to 0 to remove Android shadow
     shadowOpacity: 0, // <-- Set to 0 to remove iOS shadow
     shadowRadius: 0,
 },
 ctaButtonText: {
     fontFamily: "Poppins-Bold",
     fontSize: 17,
     letterSpacing: 0.5,
     marginRight: 8,
 },
 ctaFooter: {
     color: "#9AA4B5",
     fontFamily: "Poppins-Regular",
     fontSize: 12,
     marginTop: 10,
 },
 // ** ENHANCED CUSTOMER STORIES **
 storyScrollContainer: {
   paddingVertical: 10,
   paddingLeft: 5,
 },
 reviewSubtitle: {
   fontSize: 13,
   fontFamily: "Poppins-Regular",
   marginTop: -8,
   marginBottom: 15,
 },
 modernStoryCard: {
   width: SCREEN_WIDTH * 0.75,
   borderRadius: 20,
   padding: 16,
   marginRight: 15,
   borderWidth: 1,
   elevation: 4,
   shadowColor: "#000",
   shadowOpacity: 0.05,
   shadowRadius: 10,
   position: 'relative',
   overflow: 'hidden',
 },
 modernStoryCardExpanded: {
   width: '100%',
   marginRight: 0,
   marginBottom: 12,
 },
 expandedGrid: {
   paddingHorizontal: 0,
 },
 storyHeader: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 12,
 },
 userAvatar: {
   width: 45,
   height: 45,
   borderRadius: 22.5,
   borderWidth: 2,
   borderColor: '#E2E8F0',
 },
 userInfo: {
   marginLeft: 12,
   flex: 1,
 },
 userNameText: {
   fontSize: 15,
   fontFamily: "Poppins-Bold",
 },
 ratingRow: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 2,
 },
 verifiedBadge: {
   flexDirection: 'row',
   alignItems: 'center',
   marginLeft: 8,
   backgroundColor: 'rgba(36, 80, 151, 0.1)',
   paddingHorizontal: 6,
   paddingVertical: 1,
   borderRadius: 4,
 },
 verifiedText: {
   fontSize: 8,
   fontFamily: "Poppins-Bold",
   marginLeft: 2,
   textTransform: 'uppercase',
 },
 reviewBody: {
   marginTop: 2,
 },
 reviewText: {
   fontSize: 13,
   fontFamily: "Poppins-Italic",
   lineHeight: 20,
 },
 timeBadge: {
   alignSelf: 'flex-start',
   marginTop: 12,
   paddingHorizontal: 8,
   paddingVertical: 3,
   borderRadius: 6,
 },
 timeText: {
   fontSize: 10,
   fontFamily: "Poppins-Medium",
 },
 expandToggle: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: 10,
   paddingVertical: 12,
   borderWidth: 1,
   borderRadius: 12,
   borderStyle: 'dashed',
   gap: 8,
 },
 expandToggleText: {
   fontFamily: "Poppins-Bold",
   fontSize: 14,
 },
});

