export const getStatusStyle = (status) => {
  switch (status) {
    case "In Progress":
      return { backgroundColor: "#E0E7FF", color: "#4338CA" }; // Indigo
    case "Completed":
      return { backgroundColor: "#D1FAE5", color: "#065F46" }; // Green
    case "Booked":
      return { backgroundColor: "#DBEAFE", color: "#1E40AF" }; // Blue
    case "Vehicle Arrived":
      return { backgroundColor: "#FEF3C7", color: "#92400E" }; // Amber
    default:
      return { backgroundColor: "#F3F4F6", color: "#4B5563" }; // Gray
  }
};
