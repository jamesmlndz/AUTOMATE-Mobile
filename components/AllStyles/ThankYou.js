import { StyleSheet } from "react-native";

export const ThankYouStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 80,
    backgroundColor: "#0A2A66",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D4A44A",
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  thankYouText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "#4F4F4F",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#7D7D7D",
    textAlign: "center",
  },
  dateTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A2A66",
    marginVertical: 5,
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: "#0A2A66",
    width: "80%",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 15,
  },
  doneText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  editText: {
    fontSize: 14,
    color: "#4F4F4F",
    textDecorationLine: "underline",
  },
});
