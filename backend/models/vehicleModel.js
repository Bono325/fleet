import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Üser",
  },
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

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle; 