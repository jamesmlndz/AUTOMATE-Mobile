import { StyleSheet } from "react-native";

export const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb", // clean modern background
  },

  header: {
    backgroundColor: "#0d2147",
    height: 140,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  headerArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
    zIndex: 10,
  },

  profileText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: 1.2,
    position: "absolute",
    top: 58,
    left: 155,
  },

  imageWrapper: {
    alignSelf: "center",
    marginTop: -60,
    zIndex: 2,
    marginBottom: 25,
    shadowColor: "#102c5b",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 57.5,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#d9d9d9",
    overflow: "hidden",
    marginTop: 20,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0d2147",
    padding: 7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 3,
  },

  profileCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 18,
    marginTop: 20,
    borderRadius: 26,
    padding: 28,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 5,
  },

  nameText: {
    fontSize: 25,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    marginBottom: 14,
    color: "#0d2147",
    textAlign: "center",
  },

  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 14,
  },

  infoHeaderText: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    fontWeight: "600",
    color: "#333",
  },

  // 💡 Enhanced form section for text inputs
  formContainer: {
    marginTop: 10,
    width: "100%",
  },

  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500",
    letterSpacing: 0.3,
    
  },

  inputField: {
    backgroundColor: "#f9fbff",
    borderWidth: 1.2,
    borderColor: "#d8deeb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
    shadowColor: "#e4e9f2",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  inputFocused: {
    borderColor: "#0d2147",
    shadowColor: "#0d2147",
    shadowOpacity: 0.25,
    elevation: 4,
  },

  // Info boxes remain consistent with other sections
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },

  infoBox: {
    width: "48%",
    backgroundColor: "#f9fbff",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e1e5ee",
    shadowColor: "#d1d9e6",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },

  switchAccountButton: {
    backgroundColor: "#0d2147",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  logoutButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 12,
  },

  switchAccountText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
