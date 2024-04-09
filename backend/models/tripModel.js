import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Üser",
  },
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: false // Optional field
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: false
  },
  startOdometerKm: {
    type: Number,
    required: true
  },
  endOdometerKm: {
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
  destinations: [{
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
    required: false
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
