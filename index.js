import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('========================================');
  console.log('[PushNotifications] Background message received!');
  console.log('[PushNotifications] Title:', remoteMessage.notification?.title);
  console.log('[PushNotifications] Body:', remoteMessage.notification?.body);
  console.log('[PushNotifications] Data:', remoteMessage.data);
  console.log('========================================');

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default' },
    },
  });
});

registerRootComponent(App);