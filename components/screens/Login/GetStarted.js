import React, { useRef, useEffect } from 'react';
import {
 View,
 Text,
 Image,
 TouchableOpacity,
 Animated,
 Easing,
 StyleSheet,
 Dimensions,
 StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const { height, width } = Dimensions.get('window');


const GetStarted = () => {
 const nPage = useNavigation();


 const fadeAnim = useRef(new Animated.Value(0)).current;
 const slideAnim = useRef(new Animated.Value(30)).current;
 const scaleAnim = useRef(new Animated.Value(1)).current;


 useEffect(() => {
   // Subtle background zoom (Slow but keeps the feel alive)
   Animated.loop(
     Animated.sequence([
       Animated.timing(scaleAnim, {
         toValue: 1.1,
         duration: 10000,
         easing: Easing.linear,
         useNativeDriver: true,
       }),
       Animated.timing(scaleAnim, {
         toValue: 1,
         duration: 10000,
         easing: Easing.linear,
         useNativeDriver: true,
       }),
     ])
   ).start();


   // SNAPPY CONTENT ENTRANCE (Reduced from 15000ms to 600ms)
   Animated.parallel([
     Animated.timing(fadeAnim, {
       toValue: 1,
       duration: 600,
       useNativeDriver: true,
     }),
     Animated.timing(slideAnim, {
       toValue: 0,
       duration: 700,
       easing: Easing.out(Easing.back(1.2)), // Snappy bounce
       useNativeDriver: true,
     }),
   ]).start();
 }, []);


 const getButton = () => {
   nPage.navigate('Login');
 };


 return (
   <View style={styles.container}>
     <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
    
     {/* ANIMATED BACKGROUND */}
     <Animated.Image
       source={require('../../../assets/tierodmanbg.png')}
       style={[
         styles.backgroundImage,
         { transform: [{ scale: scaleAnim }] }
       ]}
       resizeMode="cover"
     />


     <View style={styles.vignette} />


     <View style={styles.contentWrapper}>
       <Animated.View
        style={[
          styles.topSection,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Image
          source={require('../../../assets/Logo.png')}
          style={[styles.logo, { transform: [{ scale: 1.3 }] }]}
          resizeMode="contain"
        />
      </Animated.View>



       {/* INFO SECTION */}
       <View style={styles.bottomSection}>
         <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
           <Text style={styles.brandTag}>AUTOMATE</Text>
           <Text style={styles.title}>
             Precision Service,{"\n"}
             <Text style={{ color: '#FFB703' }}>Simplified.</Text>
           </Text>
           <Text style={styles.subtitle}>
             Experience AutoMate's seamless tracking and booking system.
           </Text>
         </Animated.View>


         {/* GET STARTED BUTTON */}
         <Animated.View
           style={[
             styles.buttonContainer,
             { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
           ]}
         >
           <TouchableOpacity
             style={styles.getButton}
             onPress={getButton}
             activeOpacity={0.8}
           >
             <Text style={styles.getText}>Get Started</Text>
             <View style={styles.arrowCircle}>
               <MaterialIcons name="arrow-forward-ios" size={16} color="#0A2146" />
             </View>
           </TouchableOpacity>
          
           <View style={styles.footerRow}>
             <View style={styles.dot} />
             <Text style={styles.versionText}>POWERED BY AUTOMATE</Text>
             <View style={styles.dot} />
           </View>
         </Animated.View>
       </View>
     </View>
   </View>
 );
};


const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: '#000' },
 backgroundImage: { ...StyleSheet.absoluteFillObject, width: width, height: height },
 vignette: {
   ...StyleSheet.absoluteFillObject,
   backgroundColor: 'rgba(5, 15, 35, 0.4)',
   borderBottomWidth: height * 0.5,
   borderBottomColor: 'rgba(10, 33, 70, 0.95)',
 },
 contentWrapper: { flex: 1, paddingHorizontal: 35, justifyContent: 'space-between' },
 topSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
 logo: { width: 160, height: 160 }, // Clean logo, no ring
 bottomSection: { paddingBottom: 50 },
 brandTag: {
   color: '#FFB703',
   fontFamily: 'Poppins-Bold',
   fontSize: 12,
   letterSpacing: 3,
   marginBottom: 10,
 },
 title: { fontSize: 36, fontFamily: "Poppins-Bold", color: '#fff', lineHeight: 44, marginBottom: 15 },
 subtitle: { fontSize: 15, fontFamily: "Poppins-Regular", color: 'rgba(255,255,255,0.6)', lineHeight: 24, marginBottom: 40 },
 buttonContainer: { width: '100%' },
 getButton: {
   backgroundColor: '#FFB703',
   height: 65,
   borderRadius: 20,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingHorizontal: 25,
   elevation: 8,
 },
 getText: { fontSize: 18, fontFamily: "Poppins-Bold", color: '#0A2146' },
 arrowCircle: {
   backgroundColor: 'rgba(255,255,255,0.9)',
   width: 36,
   height: 36,
   borderRadius: 18,
   justifyContent: 'center',
   alignItems: 'center',
 },
 footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25, gap: 10 },
 dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)' },
 versionText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'Poppins-Bold', letterSpacing: 1 },
});


export default GetStarted;

