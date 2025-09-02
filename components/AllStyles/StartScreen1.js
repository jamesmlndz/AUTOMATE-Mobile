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
  
});

export default styles;
