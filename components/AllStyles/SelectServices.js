import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const SelectServices = StyleSheet.create({
  // Matching BookingForm header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "rgba(10, 33, 70, 0.8)",
    backgroundColor: "#0A2156",  // dark blue semi-transparent
  },

  screenTitle: {
    flex: 1,
    color: "#F9D342", // golden yellow
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    paddingLeft: 2,
    paddingRight: 18,
    fontFamily: "SF-Pro-Text", // or fallback
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 25,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0A2146",
    marginBottom: 20,
  },

  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
    backgroundColor: "#F5F7FA",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  selectedService: {
    backgroundColor: "#0A2146",
    borderColor: "#0A2146",
  },

  serviceText: {
    fontSize: 15,
    color: "#0A2146",
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },

  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    color: "#0A2146",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 20,
  },

  textInput: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0A2146",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    textAlignVertical: "top",
  },

  nextButton: {
    backgroundColor: "#F9D342", // golden yellow
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 25,
    shadowColor: "#F9D342",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },

  buttonText: {
    color: "#0A2146",
    fontSize: 18,
    fontWeight: "700",
  },

  scrollContent: {
    paddingBottom: 20,
  },
});
