import * as SecureStore from "expo-secure-store";

export async function saveToken(token) {
  await SecureStore.setItemAsync("userToken", token);
}

export async function getToken() {
  return await SecureStore.getItemAsync("userToken");
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync("userToken");
}

export async function saveCurrentUser(user) {
  await SecureStore.setItemAsync("user", user);
}

export async function getCurrentUser() {
  return await SecureStore.getItemAsync("user");
}

export async function deleteCurrentUser() {
  await SecureStore.deleteItemAsync("user");
}
