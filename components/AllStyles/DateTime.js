import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const DateTime = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // Removed margin and padding for edge-to-edge header
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "rgba(10, 33, 70, 0.8)",
    backgroundColor: "#0A2156"
    // Removed border radius for full width
  },
  title: {
    flex: 1,
    color: "#F9D342",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "SF-Pro-Text",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 0,  // no rounding on edges
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 0,
    marginVertical: 0,
    shadowColor: "transparent",
    elevation: 0,
  },
  calendarWrapper: {
    borderRadius: 0,
    overflow: "hidden",
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A2146",
    marginBottom: 10,
    textAlign: "center",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  timeButton: {
    backgroundColor: "#F5F7FA",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    margin: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "transparent",
    elevation: 0,
  },
  timeButtonSelected: {
    backgroundColor: "#F9D342",
    borderColor: "#F9D342",
  },
  timeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0A2146",
  },
  timeTextSelected: {
    color: "#0A2146",
    fontWeight: "700",
  },
  amPmRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  amPmButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 26,
    marginHorizontal: 8,
    backgroundColor: "#F5F7FA",
    shadowColor: "transparent",
    elevation: 0,
  },
  amPmButtonSelected: {
    backgroundColor: "#0A2146",
  },
  amPmText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0A2146",
  },
  amPmTextSelected: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F9D342",
  },
  nextButton: {
    backgroundColor: "#F9D342",
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 25,
    marginBottom: 30,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: "#F9D342",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: "#0A2146",
    fontSize: 18,
    fontWeight: "700",
  },
});
