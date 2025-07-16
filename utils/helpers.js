// src/api/client.js (or wherever you configure your API)
import Constants from "expo-constants";

const getBaseUrl = () => {
  // The 'debuggerHost' property contains the IP address of the machine running Metro.
  // It looks like '192.168.1.100:8081'. We just need the IP part.
  const debuggerHost = Constants.expoConfig?.hostUri;
  const ip = debuggerHost?.split(":")[0];

  if (__DEV__ && ip) {
    // In development, use the machine's IP with your API's port.
    console.log(`🔌 Using development API URL: http://${ip}:5001/api`);
    return `http://${ip}:5001/api`;
  } else {
    // In production, use your deployed API URL.
    return (
      process.env.EXPO_PUBLIC_API_URL ||
      "https://automate-backend-gdgr.onrender.com/api"
    );
  }
};

export const BASE_API_URL = getBaseUrl();
