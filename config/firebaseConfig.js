import { initializeApp } from '@react-native-firebase/app';
import { getMessaging, onMessage } from '@react-native-firebase/messaging';


let firebaseApp = null;

export const initializeFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    firebaseApp = initializeApp();
    console.log('Firebase App initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    return null;
  }
};

export const getMessagingInstance = () => {
  try {
    return getMessaging();
  } catch (error) {
    console.error('Error getting Firebase Messaging instance:', error);
    return null;
  }
};

export default initializeFirebaseApp;
