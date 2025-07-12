// App.js - THIS IS THE RECOMMENDED LOCATION

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { AuthProvider } from "./context/authContext"; // Adjust path
import RootNavigator from "./RootNavigator"; // Your main navigator component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Wrap with SafeAreaView */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
        <Toast />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
