import { StyleSheet } from "react-native";

export const TrackingProgressStyles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#08285e",
    justifyContent: "center",
    paddingHorizontal: 15,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#08285e",
    textAlign: "center",
    marginVertical: 20,
    
  },
  carDetails: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  carText: {
    fontSize: 16,
    color: "#08285e",
    marginTop: 6,
    fontWeight: "600",
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  activeIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#08285e",
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#d3d3d3",
  },
  activeTimelineLine: {
    backgroundColor: "#08285e",
    width: 3, // Make active line slightly thicker
  },
  textContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15, // Slightly more padding
    borderRadius: 12,
    borderWidth: 1, // Add border
    borderColor: "#e0e0e0", // Light border color
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08285e",
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: "#333",
  },
  footerButtonContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10, // Space between buttons
  },
  footerButton: {
    backgroundColor: "#08285e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#08285e",
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  yesButtonOutline: {
    borderColor: "#28a745",
    backgroundColor: "transparent",
  },
  noButtonOutline: {
    borderColor: "#dc3545",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  yesButtonText: {
    color: "#333",
  },
  noButtonText: {
    color: "#333",
  },
});
