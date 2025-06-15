import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import {
  deleteToken,
  getCurrentUser,
  getToken,
  getUser,
  saveCurrentUser,
  saveToken,
} from "../utils/secureStore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await getToken();
      } catch (e) {
        // Restoring token failed
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (token) => {
      await saveToken(token);
      setUserToken(token);
      console.log("Sign in successful.");
    },
    signOut: async () => {
      await deleteToken();
      setUserToken(null);
      console.log("Sign out successful.");
    },
    setUser: async (user) => {
      setCurrentUser(user), await saveCurrentUser(user);
    },
    userToken,
    currentUser,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
