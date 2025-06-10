const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceType: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Service', ServiceSchema);
