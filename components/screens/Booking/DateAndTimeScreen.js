import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { DateTime } from "../../AllStyles/DateTime";

const { width } = Dimensions.get("window");

const generateTimeSlots = (startHour = 9, endHour = 17, interval = 30) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(min);
      time.setSeconds(0);
      slots.push(time);
    }
  }
  return slots;
};

const formatTimeLabel = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

const DateAndTimeScreen = ({ navigation, route }) => {
  const { formData: prevFormData = {} } = route.params || {};

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isAM, setIsAM] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const slots = generateTimeSlots();
    setAvailableSlots(slots);
    setSelectedSlot(null);
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setDate(new Date(newDate));
  };

  const handleTimeChange = (event, selected) => {
    if (selected) {
      setTime(selected);
      setIsAM(selected.getHours() < 12);
      setSelectedSlot(null);
    }
    setShowTimePicker(false);
  };

  const handleNext = () => {
    const chosenTime = selectedSlot || time;

    if (!chosenTime) {
      alert("Please select a time slot.");
      return;
    }

    const combinedData = {
      ...prevFormData,
      scheduledDate: date.toISOString(),
      scheduledTime: chosenTime.toTimeString(),
    };

    navigation.navigate("BookingConfirmation", { formData: combinedData });
  };

  return (
    <ImageBackground
      source={require("../../../assets/automatebg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={DateTime.container}>
        {/* Header */}
        <View style={DateTime.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color="#F9D342" />
          </TouchableOpacity>
          <Text style={DateTime.title}>Date and Time</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Card with Calendar and Time Selection */}
        <View style={[DateTime.card, DateTime.calendarWrapper]}>
          <Text style={DateTime.selectLabel}>Choose a Date</Text>

          <CalendarPicker
            onDateChange={handleDateChange}
            selectedStartDate={selectedDate || date}
            todayBackgroundColor="#F9D342"
            selectedDayColor="#0A2146"
            selectedDayTextColor="#fff"
            textStyle={{ color: "#0A2146", fontWeight: "600" }}
            previousTitle="<"
            nextTitle=">"
            width={width - 20} // nearly full width with slight margin
            scaleFactor={375}
          />

          <Text style={[DateTime.selectLabel, { marginTop: 20 }]}>
            Available Time Slots for {date.toDateString()}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 15 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {availableSlots.map((slot, index) => {
              const isSelected =
                selectedSlot &&
                slot.getHours() === selectedSlot.getHours() &&
                slot.getMinutes() === selectedSlot.getMinutes();

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    DateTime.timeButton,
                    isSelected && DateTime.timeButtonSelected,
                  ]}
                  onPress={() => {
                    setSelectedSlot(slot);
                    setTime(slot);
                    setIsAM(slot.getHours() < 12);
                  }}
                >
                  <Text
                    style={
                      isSelected ? DateTime.timeTextSelected : DateTime.timeText
                    }
                  >
                    {formatTimeLabel(slot)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Manual Time Picker + AM/PM Buttons */}
          <View style={DateTime.amPmRow}>
            <TouchableOpacity
              style={DateTime.timeButton}
              onPress={() => {
                setShowTimePicker(true);
                setSelectedSlot(null);
              }}
            >
              <Text style={DateTime.timeText}>
                {time.getHours().toString().padStart(2, "0")}:
                {time.getMinutes().toString().padStart(2, "0")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[DateTime.amPmButton, isAM && DateTime.amPmButtonSelected]}
              onPress={() => {
                if (!isAM) {
                  const newTime = new Date(time);
                  newTime.setHours(newTime.getHours() - 12);
                  setTime(newTime);
                  setIsAM(true);
                  setSelectedSlot(null);
                }
              }}
            >
              <Text
                style={isAM ? DateTime.amPmTextSelected : DateTime.amPmText}
              >
                AM
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                DateTime.amPmButton,
                !isAM && DateTime.amPmButtonSelected,
              ]}
              onPress={() => {
                if (isAM) {
                  const newTime = new Date(time);
                  newTime.setHours(newTime.getHours() + 12);
                  setTime(newTime);
                  setIsAM(false);
                  setSelectedSlot(null);
                }
              }}
            >
              <Text
                style={!isAM ? DateTime.amPmTextSelected : DateTime.amPmText}
              >
                PM
              </Text>
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleTimeChange}
            />
          )}

          <TouchableOpacity style={DateTime.nextButton} onPress={handleNext}>
            <Text style={DateTime.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DateAndTimeScreen;
