import { StyleSheet } from "react-native";

const EditProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
  },

  header: {
    backgroundColor: "#102c5b",
    height: 140,
    paddingTop: 60,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
  },

  headerArrowLeft: {
    position: "absolute",
    top: 58,
    left: 20,
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 30,
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  avatarWrapper: {
    position: "absolute",
    bottom: -55,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 55,
    overflow: "hidden",
    width: 110,
    height: 110,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    elevation: 8,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#102c5b",
    padding: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "white",
  },

  formContainer: {
    marginTop: 70,
    paddingHorizontal: 28,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#102c5b",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
    borderWidth: 1,
    borderColor: "#d0d4db",
    marginBottom: 22,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },

  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8eaf6",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderWidth: 1,
    borderColor: "#d0d4db",
    marginRight: 8,
  },

  flag: {
    width: 28,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },

  codeText: {
    fontSize: 16,
    color: "#102c5b",
    fontWeight: "700",
  },

  phoneInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 1,
    borderColor: "#d0d4db",
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e2e6f0",
  },

  linkIconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  linkText: {
    fontSize: 16,
    color: "#102c5b",
    fontWeight: "600",
    marginLeft: 6,
  },

  saveButton: {
    backgroundColor: "#102c5b",
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 34,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 14,
    elevation: 10,
  },

  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.6,
  },

  switchAccount: {
    textAlign: "center",
    marginTop: 22,
    fontWeight: "700",
    fontSize: 16,
    color: "#102c5b",
    textDecorationLine: "underline",
  },
});

export default EditProfileScreenStyle;
