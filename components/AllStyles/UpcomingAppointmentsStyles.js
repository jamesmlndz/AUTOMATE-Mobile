import { StyleSheet } from "react-native";

export const Upstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFC",
  },
  header: {
    height: 70,
    backgroundColor: "#0A2146",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    color: "#FFD700",
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    fontFamily: "SFdisplay-Semibold",
  },
  headerSubTitle: {
    color: "#FFD700",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "SFdisplay-Semibold",
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#4A6B94",
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  activeTab: {
    backgroundColor: "#0A2156",
  },
  activeTabText: {
    color: "white",
    fontSize: 14,
    fontFamily: "SFdisplay-Semibold",
    marginTop: 2,
  },
  inactiveTabText: {
    color: "white",
    fontSize: 14,
    fontFamily: "SFdisplay-Semibold",
    marginTop: 2,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  // Appointment Card
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    alignItems: "center",
    elevation: 3,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  dateBox: {
    backgroundColor: "#4A6B94",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 15,
  },
  dateText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  monthText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  userText: {
    fontSize: 14,
    color: "#6B7280",
  },
  newBadge: {
    backgroundColor: "#F3FDE8",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  newBadgeText: {
    color: "#C4A200",
    fontSize: 12,
    fontFamily: "Messina-Regular",
  },
  moreOptions: {
    padding: 5,
  },
});
