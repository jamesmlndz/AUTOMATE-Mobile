import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

export async function registerForPushNotificationsAsync() {
  // Request permission (Android 13+)
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log('[PushNotifications] Permission denied');
    return null;
  }

  const token = await messaging().getToken();
  console.log('[PushNotifications] FCM Token:', token.substring(0, 50) + '...');
  console.log('[DEBUG] FULL FCM TOKEN:', token);
  console.log('========================================');
  console.log('[DEBUG] FULL FCM TOKEN:', token);
  console.log('[DEBUG] First 20 chars:', token.substring(0, 20));
  console.log('========================================');
  return token;
}

export function setupNotificationListeners(onNotificationReceived) {
  // Foreground messages
  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('========================================');
    console.log('[PushNotifications] Foreground message received!');
    console.log('[PushNotifications] Title:', remoteMessage.notification?.title);
    console.log('[PushNotifications] Body:', remoteMessage.notification?.body);
    console.log('[PushNotifications] Data:', remoteMessage.data);
    console.log('========================================');
    if (onNotificationReceived) onNotificationReceived(remoteMessage);
  });

  return () => {
    unsubscribeForeground();
  };
}
