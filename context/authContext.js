import React, { createContext, useContext, useState, useEffect } from "react";
import {
  deleteToken,
  getToken,
  saveCurrentUser,
  saveToken,
} from "../utils/secureStore";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { BASE_API_URL } from "../utils/helpers";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationPayload, setNotificationPayload] = useState(null);

  const handleNotificationReceived = (remoteMessage) => {
    console.log("Notification payload received in context:", remoteMessage);
    setNotificationPayload(remoteMessage);
  };

  
  usePushNotifications(
    handleNotificationReceived,
    userToken ? BASE_API_URL : null,  
    userToken                        
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await getToken(); 
      } catch (e) {}
      setUserToken(token);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (token) => {
      await saveToken(token);
      setUserToken(token);
    },
    signOut: async () => {
      await deleteToken();
      setUserToken(null);
    },
    setUser: async (user) => {
      setCurrentUser(user);
      await saveCurrentUser(user);
    },
    userToken,
    currentUser,
    notificationPayload,
    setNotificationPayload,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
