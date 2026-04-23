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
          console.log('========================================');
          console.log('[DEBUG] FULL FCM TOKEN:', token);
          console.log('[DEBUG] First 20 chars:', token.substring(0, 20));
          console.log('========================================');
        }

        if (token) {
          await AsyncStorage.setItem('fcmToken', token);

         
          const url = `${apiBaseUrl}/users/push-token`;
          console.log('[PushNotifications] Sending token to:', url);
          console.log('[DEBUG] User Token (JWT):', userToken ? userToken.substring(0, 30) + '...' : 'NULL');

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
            console.log('========================================');
            console.log('[PUSH-TOKEN-SUCCESS] ✓ Token sent to backend!');
            console.log('[PUSH-TOKEN-SUCCESS] Response:', response.data);
            console.log('========================================');
          } catch (err) {
            console.log('========================================');
            console.error('[PUSH-TOKEN-ERROR] ✗ Failed to send token to backend!');
            console.error('[PUSH-TOKEN-ERROR] Error message:', err.message);
            if (err.response) {
              console.error('[PUSH-TOKEN-ERROR] Backend error:', err.response.data);
              console.error('[PUSH-TOKEN-ERROR] Status code:', err.response.status);
            }
            console.log('========================================');
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
