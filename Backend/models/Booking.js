const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  plateNumber: String,
  contactMethod: String,
  carModel: String,
  carMake: String,
  carYear: String,
  selectedServices: [String],
  bookingDate: String,
  bookingTime: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
