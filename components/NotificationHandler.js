import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '../context/authContext';


export const NotificationHandler = () => {
  const { notificationPayload, setNotificationPayload } = useAuth();

  useEffect(() => {
    if (notificationPayload && notificationPayload.notification) {
      const { title, body } = notificationPayload.notification;

      Toast.show({
        type: 'info',
        position: 'top',
        text1: title || 'Notification',
        text2: body || '',
        duration: 4000,
        topOffset: 50,
        onPress: () => {
          Toast.hide();
        
          if (notificationPayload.data?.appointmentId) {
            console.log(
              'Notification tapped. Appointment ID:',
              notificationPayload.data.appointmentId
            );
        
          }
        },
      });

   
      setNotificationPayload(null);
    }
  }, [notificationPayload, setNotificationPayload]);

  return null; 
};

export default NotificationHandler;
