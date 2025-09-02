import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between", // ✅ Pushes content up & button down
    paddingHorizontal: 20,
    paddingTop: height * 0.05, // ✅ Smaller top padding (~5% of screen)
    paddingBottom: height * 0.03, // ✅ Smaller bottom padding
  },

  content: {
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#08285E",
    marginBottom: 8, // ✅ Tighter spacing
  },

  image: {
    width: height * 0.35,
    height: height * 0.25,
    resizeMode: "contain",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08285E",
    textAlign: "center",
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: "#000",
  },

  button: {
    backgroundColor: "#D39505",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles;
