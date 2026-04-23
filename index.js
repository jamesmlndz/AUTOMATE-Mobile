import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './App';

// Handles notifications when app is in background or killed
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('========================================');
  console.log('[PushNotifications] Background message received!');
  console.log('[PushNotifications] Title:', remoteMessage.notification?.title);
  console.log('[PushNotifications] Body:', remoteMessage.notification?.body);
  console.log('[PushNotifications] Data:', remoteMessage.data);
  console.log('========================================');
});

registerRootComponent(App);