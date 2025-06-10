const mongoose = require('mongoose');

const AppointmentServiceSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
});

module.exports = mongoose.model('AppointmentService', AppointmentServiceSchema);
