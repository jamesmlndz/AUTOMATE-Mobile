import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import Bookingform from "./components/screens/Booking/Bookingform";
import SelectServicesScreen from "./components/screens/Booking/SelectServicesScreen";
import ProfileScreen from "./components/screens/Profile/ProfileScreen";
import BookingConfirmation from "./components/screens/Booking/BookingConfirmation";
import DateAndTime from "./components/screens/Booking/DateAndTime";
import BookedScreen from "./components/screens/Booking/BookedScreen";
import Homepage from "./components/screens/Homepage/Homepage";
import Services from "./components/screens/Homepage/Services";
import Login from "./components/screens/Login/Login";
import Register from "./components/screens/Login/Register";
import GetStarted from "./components/screens/Login/GetStarted";
import Verify from "./components/screens/Login/Verify";
import AccountCreated from "./components/screens/Login/AccountCreated";
import UpcomingAppointments from "./components/screens/Homepage/UpcomingAppointments";
import HistoryAppointments from "./components/screens/Homepage/HistoryAppointments";
import AppointmentDetails from "./components/screens/Homepage/AppointmentDetails";
import TrackingProgress from "./components/screens/Homepage/TrackingProgress";
import Invoice from "./components/screens/Homepage/Invoice";
import MyAppointment from "./components/screens/Homepage/MyAppointment";
import StartScreen3 from "./components/screens/Login/StartScreen3";
import StartScreen1 from "./components/screens/Login/StartScreen1";
import StartScreen2 from "./components/screens/Login/StartScreen2";
import EditProfileScreen from "./components/screens/Profile/EditProfileScreen";
import EditProfileScreenStyle from "./components/AllStyles/EditProfileScreenStyle";
import VehicleDetails from "./components/screens/Booking/VehicleDetails";
import DateAndTimeScreen from "./components/screens/Booking/DateAndTimeScreen";
import GoodYearTire from "./components/screens/Services/GoodYearTire";
import AutoElectrical from "./components/screens/Services/AutoElectrical";
import BatteryAndAccessories from "./components/screens/Services/BatteryAndAccessories";
import BodyliftBodyLowered from "./components/screens/Services/BodyliftBodyLowered";
import BrakeDiscDrumRefacing from "./components/screens/Services/BrakeDiscDrumRefacing";
import BrakesOverhaul from "./components/screens/Services/BrakesOverhaul";
import CamberCorrection from "./components/screens/Services/CamberCorrection";
import ChangeOilTuneUp from "./components/screens/Services/ChangeOilTuneUp";
import CheckEngineScanning from "./components/screens/Services/CheckEngineScanning";
import Comuterized4WAlignment from "./components/screens/Services/Comuterized4wAlignment";
import KalampagProblem from "./components/screens/Services/KalampagProblem";
import PowerSteeringOverhaul from "./components/screens/Services/PowerSteeringOverhaul";
import UnderchasisSuspension from "./components/screens/Services/UnderchasisSuspension";
import WheelBalancing from "./components/screens/Services/WheelBalancing";
import LogoutPopup from "./components/screens/Login/LogoutPopup";
import AptScreen from "./components/screens/Homepage/AptScreen";
import ForgotPassword from "./components/screens/Login/ForgotPassword";
import ResetPassword from "./components/screens/Login/ResetPassword";
import VerifyResetOtp from "./components/screens/Login/VerifyResetOtp";

const Stack = createNativeStackNavigator();

// 🔹 Load fonts before rendering the app
const loadFonts = async () => {
  await Font.loadAsync({
    "SFdisplay-Light": require("./assets/fonts/SF-Pro-Display-Light.ttf"),
    "SFdisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    Messina: require("./assets/fonts/Messina.ttf"),
  });
};

export default function RootNavigator() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function fetchFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }
    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="StartScreen1" component={StartScreen1} />
        <Stack.Screen name="StartScreen2" component={StartScreen2} />
        <Stack.Screen name="StartScreen3" component={StartScreen3} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="VerifyResetOtp" component={VerifyResetOtp} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} />

        <Stack.Screen name="HomePage" component={Homepage} />
        <Stack.Screen name="TrackingProgress" component={TrackingProgress} />
        <Stack.Screen
          name="UpcomingAppointment"
          component={UpcomingAppointments}
        />
        <Stack.Screen
          name="HistoryAppointment"
          component={HistoryAppointments}
        />
        <Stack.Screen
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="MyAppointment" component={MyAppointment} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="AptScreen" component={AptScreen} />

        <Stack.Screen name="Booking" component={Bookingform} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
        <Stack.Screen name="SelectServices" component={SelectServicesScreen} />
        <Stack.Screen name="DateAndTimeScreen" component={DateAndTimeScreen} />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmation}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="BookedScreen" component={BookedScreen} />
        <Stack.Screen name="LogoutPopup" component={LogoutPopup} />

        <Stack.Screen name="GoodYearTire" component={GoodYearTire} />
        <Stack.Screen name="WheelBalancing" component={WheelBalancing} />
        <Stack.Screen name="Comuterized" component={Comuterized4WAlignment} />
        <Stack.Screen name="KalampagProblem" component={KalampagProblem} />
        <Stack.Screen name="ChangeOil" component={ChangeOilTuneUp} />
        <Stack.Screen
          name="UnderchasisSuspension"
          component={UnderchasisSuspension}
        />
        <Stack.Screen name="BrakeDisc" component={BrakeDiscDrumRefacing} />
        <Stack.Screen name="BrakesOverhaul" component={BrakesOverhaul} />
        <Stack.Screen name="PowerSteering" component={PowerSteeringOverhaul} />
        <Stack.Screen name="CamberCorrection" component={CamberCorrection} />
        <Stack.Screen name="BodyLift" component={BodyliftBodyLowered} />
        <Stack.Screen name="CheckEngine" component={CheckEngineScanning} />
        <Stack.Screen name="AutoElectrical" component={AutoElectrical} />
        <Stack.Screen name="Battery" component={BatteryAndAccessories} />

        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
