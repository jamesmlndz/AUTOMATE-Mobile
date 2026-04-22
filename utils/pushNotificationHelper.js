import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';


export async function registerForPushNotificationsAsync() {
  
  if (!Device.isDevice) {
    console.warn('[PushNotifications] Push Notifications are only available on physical devices.');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  
  if (existingStatus !== 'granted') {
    console.log('[PushNotifications] Permission not granted, requesting...');
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('[PushNotifications] User did not grant permission for push notifications.');
    return null;
  }

  let token;
  try {
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log('[PushNotifications] Native Push Token:', token.substring(0, 50) + '...');
  } catch (e) {
    console.error('[PushNotifications] Failed to get native push token', e);
    return null;
  }

  if (Platform.OS === 'android') {
    console.log('[PushNotifications] Setting up Android notification channel...');
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
    console.log('[PushNotifications] Android notification channel configured.');
  }

  return token;
}

export function setupNotificationListeners(onNotificationReceived) {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

 
  const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {
    console.log('[PushNotifications] Foreground notification received:', notification);
    if (onNotificationReceived) {
      onNotificationReceived(notification);
    }
  });

  
  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('[PushNotifications] User tapped notification:', response);
    if (onNotificationReceived) {
      onNotificationReceived(response.notification);
    }
  });

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}
