import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // same overlay as ProfileScreen
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  // 💙 Blue Header (same size + rounded bottom as ProfileScreen)
  header: {
    backgroundColor: "#0d2147",
    height: 140,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    
  },

  headerArrowLeft: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
    zIndex: 10,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: 1.2,
    position: "absolute",
    top: 58,
    left: 142,
    
  },

  // 🧍‍♂️ Avatar Section (centered and overlapping)
  avatarSection: {
    alignItems: "center",
    marginTop: -40, // same overlap as ProfileScreen
    zIndex: 2,
    marginBottom: 20,
  },

  avatarWrapper: {
    position: "relative",
    alignSelf: "center",
  },

  // 👤 Circular Avatar
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#d9d9d9",
    overflow: "hidden",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#102c5b",
    padding: 6,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 3,
  },

  // 🪶 White Form Card (same style as Profile Card)
  formCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    marginHorizontal: 16,
    marginTop: 60,
    borderRadius: 24,
    padding: 24,
    paddingBottom: 60,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 7,
    
  },

  label: {
    fontSize: 15,
    color: "#102c5b",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    fontFamily: "Poppins-Bold",
  },

  input: {
    backgroundColor: "#f7f9fc",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },

  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 14,
    paddingHorizontal: 10,
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
  },

  flag: {
    width: 22,
    height: 16,
    borderRadius: 2,
    marginRight: 6,
  },

  codeText: {
    color: "#333",
    fontWeight: "600",
  },

  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  // 💾 Save Button (matches Profile buttons)
  saveButton: {
    backgroundColor: "#102c5b",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  // 🔄 Switch Button
  switchButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },

  switchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
