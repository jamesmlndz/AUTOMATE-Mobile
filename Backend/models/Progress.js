const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  statusUpdate: { type: String }, // e.g. "Vehicle Arrived", "Repair Started"
  notes: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', ProgressSchema);
