import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { registerForPushNotificationsAsync, setupNotificationListeners } from '../utils/pushNotificationHelper';

export const usePushNotifications = (onNotificationReceived, apiBaseUrl, userToken) => {
  const unsubscribeRef = useRef(null);

  useEffect(() => {
  
    if (!userToken || !apiBaseUrl) {
      console.log('[PushNotifications] Waiting for auth before initializing...');
      return;
    }

    const initializePushNotifications = async () => {
      try {
        console.log('[PushNotifications] Initializing...');

        
        const token = await registerForPushNotificationsAsync();
        console.log('[PushNotifications] FCM Token:', token ? token.substring(0, 50) + '...' : 'NULL');

        if (token) {
          await AsyncStorage.setItem('fcmToken', token);

         
          const url = `${apiBaseUrl}/users/push-token`;
          console.log('[PushNotifications] Sending token to:', url);

          try {
            const response = await axios.post(
              url,
              { pushToken: token },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('[PushNotifications] Backend response:', response.data);
          } catch (err) {
            console.error('[PushNotifications] Error sending token to backend:', err.message);
            if (err.response) {
              console.error('[PushNotifications] Backend error:', err.response.data);
            }
          }
        } else {
          console.log('[PushNotifications] Failed to get push token');
        }

       
        const unsubscribe = setupNotificationListeners(onNotificationReceived);
        unsubscribeRef.current = unsubscribe;
      } catch (error) {
        console.error('[PushNotifications] Init error:', error);
      }
    };

    initializePushNotifications();

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [userToken, apiBaseUrl]);
};

export default usePushNotifications;
