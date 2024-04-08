const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  license_plate: {
    type: String,
    required: true,
    unique: true
  },
  vin: {
    type: String,
    required: true,
    unique: true 
  },
  fuel_type: {
    type: String,
    required: true
  },
  odometer_km: {
    type: Number,
    required: true
  }
} , {
    timestamps: true,
});

module.exports = mongoose.model('Truck', truckSchema);
