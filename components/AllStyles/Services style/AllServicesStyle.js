import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 5,
  },
  serviceImage: {
    width: "100%",
    height: height * 0.35,
    borderRadius: 10,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  locationText: {
    color: "#666",
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginRight: 4,
    color: "#0A2E5C",
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#444",
  },
  highlight: {
    color: "#0A2E5C",
    fontWeight: "500",
  },
  inquiryHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 4,
  },
  inquiryCard: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontWeight: "bold",
  },
  providerRole: {
    fontSize: 12,
    color: "#888",
  },
  contactIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: "#0A2E5C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30, // space from the bottom
    marginTop: "auto", // pushes to bottom inside flex container
  },

  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // service details styles
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  priceText: {
    fontSize: 13,
    color: "#0A2E5C",
    fontWeight: "bold",
  },
  priceValue: {
    fontSize: 13,
    color: "#0A2E5C",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeText: {
    fontSize: 13,
    color: "#0A2E5C",
    fontWeight: "bold",
  },
  timeValue: {
    fontSize: 13,
    color: "#0A2E5C",
  },
});

export default styles;
