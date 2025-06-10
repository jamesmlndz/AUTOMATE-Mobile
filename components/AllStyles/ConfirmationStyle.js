import { StyleSheet } from "react-native";

export const ConfirmationStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    backgroundColor: "#12264A",
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: "#C9A23F",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Messina-Regular",
  },
  card: {
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#C9A23F",
    marginTop: 10,
    fontFamily: "Messina-Regular",
  },
  infoText: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
  carInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#12264A",
  },
  confirmButton: {
    backgroundColor: "#12264A",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Messina-Regular",
  },
});
