import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('========================================');
  console.log('[PushNotifications] Background message received!');
  console.log('[PushNotifications] Title:', remoteMessage.data?.title);
  console.log('[PushNotifications] Body:', remoteMessage.data?.body);
  console.log('[PushNotifications] Data:', remoteMessage.data);
  console.log('========================================');

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.data?.title,
    body: remoteMessage.data?.body,
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default' },
    },
  });
});

registerRootComponent(App);