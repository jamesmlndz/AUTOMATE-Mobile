// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from './components/screens/Homepage/Homepage';
import ProfileScreen from './components/screens/Profile/ProfileScreen';
import Services from './components/screens/Homepage/Services';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomePage">
      <Drawer.Screen name="HomePage" component={Homepage} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="Services" component={Services} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
