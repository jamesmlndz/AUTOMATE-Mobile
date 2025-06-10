// components/navigation/CustomDrawer.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <View style={styles.avatar} />
          <Text style={styles.name}>Ash Melendez</Text>
          <Text style={styles.email}>ash123@gmail.com</Text>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <DrawerItem
            label="Home"
            icon={({ color, size }) => <FontAwesome name="home" color={color} size={size} />}
            onPress={() => props.navigation.navigate('Homepage')}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Services"
            icon={({ color, size }) => <FontAwesome name="cogs" color={color} size={size} />}
            onPress={() => props.navigation.navigate('Services')}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Parts and Accessories"
            icon={({ color, size }) => <FontAwesome name="th-large" color={color} size={size} />}
            onPress={() => {}}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Settings"
            icon={({ color, size }) => <FontAwesome name="gear" color={color} size={size} />}
            onPress={() => {}}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <DrawerItem
            label="Use Chat"
            icon={({ color, size }) => <FontAwesome name="comments" color={color} size={size} />}
            onPress={() => {}}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
          <DrawerItem
            label="Help"
            icon={({ color, size }) => <FontAwesome name="question-circle" color={color} size={size} />}
            onPress={() => {}}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Login')}>
          <FontAwesome name="sign-out" size={20} color="#000" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  drawerItem: {
    backgroundColor: '#f1f1f1',
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  drawerLabel: {
    marginLeft: -16,
    fontSize: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingLeft: 10,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
});

export default CustomDrawer;
