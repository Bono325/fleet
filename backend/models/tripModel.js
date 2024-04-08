const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  truck_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    required: true
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: false // Optional field
  },
  start_date_time: {
    type: Date,
    required: true
  },
  end_date_time: {
    type: Date,
    required: true
  },
  start_odometer_km: {
    type: Number,
    required: true
  },
  end_odometer_km: {
    type: Number,
    required: true
  },
  origin: {
    type: {
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    _id: false // Avoid creating a separate document for origin
  },
  destination: {
    type: {
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    _id: false // Avoid creating a separate document for destination
  },
  purpose: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false // Optional field
  }
},{
    timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);
