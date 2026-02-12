import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // ↓ reduced from 30
    paddingTop: 30, // ↓ reduced from 60
    paddingBottom: 20, // ↓ reduced from 40
  },
  
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#08285E",
    marginBottom: 6, // ↓ reduced from 10
  },
  
  image: {
    width: 220,
    height: 350, // ↓ reduced from 500
    marginBottom: 8, // ↑ slightly increased for balance
  },
  
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#08285E",
    textAlign: "center",
    marginBottom: 6, // ↓ reduced from 10
  },
  
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 14, // ↓ reduced from 20
    lineHeight: 20, // ↓ reduced from 22
  },
  
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16, // ↓ reduced from 30
  },
  
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 3, // ↓ reduced from 4
  },
  
  activeDot: {
    backgroundColor: "#000",
  },
  
  button: {
    backgroundColor: "#D39505",
    paddingVertical: 12, // ↓ reduced from 14
    paddingHorizontal: 80, // ↓ reduced from 100
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
    marginTop: 12, // ↑ slightly increased for balance
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  //updated 

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // darker overlay for readability
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    zIndex: 2,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 260,
    height: 260,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#D39505",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: "#ddd",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 15,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#aaa",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#D39505",
    width: 20,
  },
  button: {
    backgroundColor: "#D39505",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  
});

export default styles;
