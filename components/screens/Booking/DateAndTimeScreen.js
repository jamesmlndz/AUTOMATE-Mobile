import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  StyleSheet, // Import StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import authenticatedApi from "../../../api/axiosInstance"; // Adjust this import to your actual API instance
import { format } from "date-fns";

const { width } = Dimensions.get("window");
const MAX_CUSTOMERS_PER_SLOT = 4; // Max customers per slot

// Main component
const DateAndTimeScreen = ({ navigation, route }) => {
  const { formData: prevFormData = {} } = route.params || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [customDatesStyles, setCustomDatesStyles] = useState([]);

  // Fetch data when the component mounts or when the selected date changes
  useEffect(() => {
    if (selectedDate) {
      fetchBookingData(selectedDate);
    }
  }, [selectedDate]);

  // Function to fetch availability data from the backend
  const fetchBookingData = async (dateToFetch) => {
    try {
      const formattedDate = format(new Date(dateToFetch), "yyyy-MM-dd");
      const response = await authenticatedApi.get(
        `/booking/availability?date=${formattedDate}`
      );
      const { availableSlots: backendSlots, specialDates } = response.data;

      setAvailableSlots(backendSlots);

      const styles = specialDates.map((sd) => ({
        date: new Date(sd.date),
        style: {
          backgroundColor: sd.isFullyBooked
            ? "#d9534f"
            : sd.isHoliday
            ? "#f0ad4e"
            : "transparent",
        },
        textStyle: {
          color: sd.isFullyBooked || sd.isHoliday ? "white" : "#0A2146",
        },
        containerStyle: [],
      }));
      setCustomDatesStyles(styles);
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setAvailableSlots([]);
      setCustomDatesStyles([]);
    }
    setSelectedSlot(null);
  };

  // Handler for date changes in the calendar
  const handleDateChange = (newDate) => {
    console.log(newDate);
    setSelectedDate(newDate);
  };

  // Handler for the "Next" button
  const handleNext = () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    // Combine previous form data with the selected date and time
    const combinedData = {
      ...prevFormData,
      scheduledDate: format(selectedDate, "yyyy-MM-dd"),
      scheduledTime: selectedSlot.time,
    };

    // Navigate to the confirmation screen
    navigation.navigate("BookingConfirmation", { formData: combinedData });
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")} // Make sure the path is correct
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color="#F9D342" />
          </TouchableOpacity>
          <Text style={styles.title}>Date and Time</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.selectLabel}>Choose a Date</Text>

          <CalendarPicker
            onDateChange={handleDateChange}
            selectedStartDate={selectedDate}
            minDate={new Date()} // Prevent booking past dates
            todayBackgroundColor="#F9D342"
            selectedDayColor="#0A2146"
            selectedDayTextColor="#fff"
            textStyle={styles.calendarText}
            previousTitle="<"
            nextTitle=">"
            width={width - 40}
            scaleFactor={375}
            customDatesStyles={customDatesStyles}
          />

          <Text style={styles.selectLabel}>
            Available Slots for {selectedDate.toDateString()}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slotsContainer}
          >
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => {
                const isSelected =
                  selectedSlot && selectedSlot.time === slot.time;
                const isAvailable =
                  slot.available && slot.bookings < MAX_CUSTOMERS_PER_SLOT;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeButton,
                      isSelected && styles.timeButtonSelected,
                      !isAvailable && styles.timeButtonDisabled,
                    ]}
                    onPress={() => isAvailable && setSelectedSlot(slot)}
                    disabled={!isAvailable}
                  >
                    <Text
                      style={
                        isSelected ? styles.timeTextSelected : styles.timeText
                      }
                    >
                      {slot.time}
                    </Text>
                    <Text style={styles.bookingCountText}>
                      {isAvailable
                        ? `${
                            MAX_CUSTOMERS_PER_SLOT - slot.bookings
                          }/${MAX_CUSTOMERS_PER_SLOT} available`
                        : "Full"}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.noSlotsText}>
                No available slots for this date.
              </Text>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  selectLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2146",
    marginVertical: 15,
  },
  calendarText: {
    color: "#0A2146",
    fontWeight: "600",
  },
  slotsContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  timeButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  timeButtonSelected: {
    backgroundColor: "#0A2146",
  },
  timeButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A2146",
  },
  timeTextSelected: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  bookingCountText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  noSlotsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    width: width - 60,
  },
  nextButton: {
    backgroundColor: "#F9D342",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A2146",
  },
});

export default DateAndTimeScreen;
