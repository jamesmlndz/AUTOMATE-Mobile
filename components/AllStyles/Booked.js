import { StyleSheet } from "react-native";

export const Booked = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    backgroundColor: "#0B2C5E",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute", 
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, 
  },
  backButton: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Messina-Regular",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    paddingTop: 60, 
  },
  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  thankYouText: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Messina-Regular",
  },
  subText: {
    fontSize: 16,
    color: "#56677D",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: "#56677D",
    textAlign: "center",
    marginBottom: 20,
  },
  dateText: {
    fontWeight: "bold",
  },
  doneButton: {
    width: "100%",
    backgroundColor: "#0B2C5E",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Messina-Regular",
  },
  editText: {
    color: "#56677D",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
