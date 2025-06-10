import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A2156",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  searchInput: {
    flex: 1,
    color:"#ffff",
    fontSize: 16,
    marginRight: 10,
    
  },

  promoBanner: {
    width: "90%",
    height: 150,
    borderRadius: 15,
    marginTop: 25,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  servicesTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginTop: 30,
    marginLeft: 20,
  },

  serviceOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    
  },

  iconButton: {
    width: 100,
    height: 100,
    backgroundColor: "#08285E",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  iconLabel: {
    fontSize: 15,
    color: "#000000",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 0.5,
  },

  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },

  viewAll: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#0A2156",
    textDecorationLine: "underline",
  },

  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },

  categoryBox: {
    width: "48%",
    backgroundColor: "#003366",
    borderRadius: 16,
    marginBottom: 15,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 7,
  },

  categoryImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },

  categoryLabel: {
    paddingVertical: 10,
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
});

export default HomeStyle;
