import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Üser",
  },
  truck_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
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
    required: false
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
  destination: [{
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
  }],
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

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
