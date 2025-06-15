// App.js - THIS IS THE RECOMMENDED LOCATION

import React from "react";
import { AuthProvider } from "./context/authContext"; // Adjust path
import RootNavigator from "./RootNavigator"; // Your main navigator component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}
