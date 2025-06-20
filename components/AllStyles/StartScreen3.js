import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
    // ❌ Removed backgroundColor so it doesn’t block background image
    // backgroundColor: "#ffffff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#08285E",
    marginBottom: 20,
    
  },

  image: {
    width: 220,
    height: 500,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08285E",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#000",
  },

  button: {
    backgroundColor: "#D39505",
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // ✅ Corrected from "#ffff" (which is invalid)
  },
});

export default styles;
