const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: String, required: true },  // or Date if you prefer
  appointmentTime: { type: String, required: true },  // or use Date + time handling
  carType: { type: String },
  status: { type: String, default: 'Pending' } // Pending | In Progress | Completed
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
