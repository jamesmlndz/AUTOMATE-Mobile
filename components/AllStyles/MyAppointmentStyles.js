import { StyleSheet } from "react-native";

const MyAppointmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2146", // dark navy blue
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backBtn: {
    padding: 6,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0A2146",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    fontFamily: "Courier",
  },

  value: {
    fontSize: 14,
    color: "#0A2146",
    fontFamily: "Courier",
    textAlign: "right",
    maxWidth: "60%",
  },

  buttonContainer: {
    marginTop: 20,
  },

  actionButton: {
    backgroundColor: "#FFD700", // gold
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A2146",
    letterSpacing: 1,
  },

  scrollView: {
    paddingBottom: 30,
  },
});

export default MyAppointmentStyles;
