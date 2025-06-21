import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getStatusStyle } from "../../../utils/statusStyles";

// --- Reusable Appointment Tracker Card Component ---
export default AppointmentTrackerCard = ({ appointment }) => {
  // Helper function to determine badge style based on status

  // Format the services list into a single string
  const serviceNames =
    appointment?.services?.map((s) => s.service.name).join(" & ") ||
    "No services listed";

  // Format the estimated completion time (assuming you add this to your schema)
  // For now, we'll use a placeholder.
  // const estCompletionTime = appointment?.estCompletionTime
  //   ? `Est. Completion: ${new Date(
  //       appointment.estCompletionTime
  //     ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  //   : "Est. Completion: TBD";

  const statusStyle = getStatusStyle(appointment?.status);

  return (
    <View style={styles.card}>
      {/* Top Row: Booking ID and Status */}
      <View style={styles.topRow}>
        <Text style={styles.bookingId}>Booking #</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusStyle.backgroundColor },
          ]}
        >
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {appointment?.status}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.bookingId}>{appointment?._id}</Text>
      </View>

      {/* Vehicle Details */}
      <Text style={styles.vehicleText}>
        {`${appointment?.vehicle?.year} ${appointment?.vehicle?.brand} ${appointment?.vehicle?.model} - ${appointment?.vehicle?.plateNumber}`}
      </Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Service Details */}
      <View style={styles.detailRow}>
        <Feather name="tool" size={16} color="#4B5563" />
        <Text style={styles.detailText}>Service: {serviceNames}</Text>
      </View>

      {/* Estimated Completion Time */}
      {/* <View style={styles.detailRow}>
        <Feather name="clock" size={16} color="#4B5563" />
        <Text style={styles.detailText}>{estCompletionTime}</Text>
      </View> */}
    </View>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // A very light gray background
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999, // Pill shape
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  vehicleText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 10,
  },
});
