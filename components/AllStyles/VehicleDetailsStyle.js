import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const VehicleDetailsStyle = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "rgba(10, 33, 70, 0.8)",  // semi-transparent dark blue
  },

  backBtn: {
    padding: 10,
    marginRight: 10,
  },

  headerTitle: {
    flex: 1,
    color: "#F9D342", // golden yellow
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    paddingLeft:2,
    paddingRight:18,
    fontFamily: "SF-Pro-Text",
  },

  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A2146",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#0A2146",
    fontWeight: "600",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F5F7FA",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0A2146",
    marginBottom: 15,
  },

  pickerWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F5F7FA",
    marginBottom: 20,
  },

  picker: {
    height: 50,
    color: "#0A2146",
  },

  nextBtn: {
    backgroundColor: "#F9D342",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#F9D342",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  btnText: {
    color: "#0A2146",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VehicleDetailsStyle;
