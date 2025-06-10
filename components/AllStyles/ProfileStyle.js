import { StyleSheet } from "react-native";

export const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // darker overlay for contrast
  },

  header: {
    backgroundColor: "#102c5b",
    height: 140,
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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

  profileText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },

  headerArrow: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 8,
    zIndex: 10,
  },

  imageWrapper: {
    alignSelf: "center",
    marginTop: -50,
    zIndex: 2,
    marginBottom: 30,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
  },

  cameraIcon: {
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

  profileCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 24,
    padding: 24,
    paddingBottom: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 7,
  },

  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#102c5b",
    textAlign: "center",
  },

  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginBottom: 16,
  },

  infoHeaderText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },

  infoBox: {
    width: "48%",
    backgroundColor: "#f7f9fc",
    padding: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  infoText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },

  switchAccountButton: {
    backgroundColor: "#102c5b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 28,
    alignItems: "center",
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },

  logoutButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 28,
    alignItems: "center",
    alignSelf: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 12,
  },

  switchAccountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
});
