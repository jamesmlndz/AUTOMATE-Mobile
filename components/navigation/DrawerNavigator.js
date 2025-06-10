import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from '../screens/Homepage/Homepage';
import Services from '../screens/Homepage/Services';
import Bookingform from '../screens/Booking/Bookingform';
import TrackingProgress from '../screens/Homepage/TrackingProgress';
import UpcomingAppointments from '../screens/Homepage/UpcomingAppointments';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#0A2156',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen name="Homepage" component={Homepage} />
      <Drawer.Screen name="Services" component={Services} />
      <Drawer.Screen name="Booking" component={Booking} />
      <Drawer.Screen name="TrackingProgress" component={TrackingProgress} />
      <Drawer.Screen name="UpcomingAppointment" component={UpcomingAppointment} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
