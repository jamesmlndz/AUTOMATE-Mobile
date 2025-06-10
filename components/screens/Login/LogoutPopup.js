import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const LogoutPopup = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          
          {/* Logo */}
          <View style={{ width: 200, height: 200 }}>
              <Image
                source={require('./Start screen.png')}
                style={{ width: '100%', height: '130%', borderRadius: 10 }}
                resizeMode="cover"/>
              </View>

          {/* Message */}
          <Text style={styles.title}>Come back soon!</Text>
          <Text style={styles.subtitle}>Are you sure you want to logout?</Text>

          {/* Yes Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={onConfirm}>
            <Text style={styles.logoutButtonText}>Yes, Logout</Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  logo: {
    width: 600,
    height: 200,
    marginBottom: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
});
