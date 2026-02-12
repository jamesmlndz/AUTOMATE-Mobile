import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardSize = (width - 50) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E8F0", // slightly darker soft background
  },

  /* TESLA HEADER */
  header: {
    paddingTop: 40, // shortened from 55
    paddingBottom: 12, // shortened from 18
    paddingHorizontal: 20,
    backgroundColor: "#0B1B3F", // slightly darker than #0D2147
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFFFFF", // white text
    letterSpacing: 0.3,
  },

  headerArrow: {
    tintColor: "#FFFFFF", // white arrow/icon
  },

  /* SEARCH BAR */
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE0EB", // slightly darker input
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C5CAE9",
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111",
  },

  /* GRID */
  grid: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 50,
  },

  /* TESLA CARD */
  card: {
    width: cardSize,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    margin: 8,
  },

  cardImage: {
    width: "100%",
    height: 120,
  },

  cardFooter: {
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0D2147", // card title uses theme color
    flexShrink: 1,
  },

  /* STATES */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 16,
    color: "#888",
  },

  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default styles;
