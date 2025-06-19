import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#0A2156", // semi-transparent dark blue
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
    paddingLeft: 2,
    paddingRight: 18,
    fontFamily: "SF-Pro-Text", // or fallback
  },

  formContainer: {
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
    fontSize: 24,
    fontWeight: "700",
    color: "#0A2156", // deep blue
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    color: "#0A2146",
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0A2146",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  pickerWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 25,
    backgroundColor: "#F5F7FA",
    elevation: 3,
  },

  picker: {
    height: 50,
    color: "#0A2146",
  },

  nextBtn: {
    backgroundColor: "#F9D342", // golden yellow
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#F9D342",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },

  btnText: {
    color: "#0A2146",
    fontSize: 18,
    fontWeight: "700",
  },
});
