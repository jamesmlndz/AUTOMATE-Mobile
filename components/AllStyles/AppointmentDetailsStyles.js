import { StyleSheet } from "react-native";

export const AppointmentDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 60,
    backgroundColor: "#0A2146", // ← matched to booking form
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsContainer: {
    margin: 20,
    borderWidth: 2,
    borderColor: "#1E73BE",
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D4AF37", // ← matched to booking form sectionTitle
    textAlign: "center",
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D4AF37", // ← matched
    marginTop: 10,
  },
  infoContainer: {
    marginVertical: 5,
  },
  carContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  infoText: {
    fontSize: 14,
    color: "black",
  },
  plateNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F2C59",
  },
});
