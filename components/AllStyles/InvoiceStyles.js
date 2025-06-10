import { StyleSheet } from "react-native";

export const InvoiceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0d2c5b", 
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center", 
    paddingHorizontal: 20,
    width:'100%',
  },
  title: {
    fontSize: 25,  
        color: "#d39505", 
        marginTop: 20,
        textAlign: 'center',
        fontFamily: "Messina-Regular",
  },
  receiptContainer: {
    backgroundColor: "#D1D5DB", 
    marginHorizontal: 20,
    height: 300,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  receiptText: {
    color: "#0A1F50",
    fontSize: 14,
    fontWeight: "bold",
  },
});
