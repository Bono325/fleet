import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  truck_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Unscheduled']
  },
  mileage: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: false
  },
  parts_replaced: {
    type: [String],
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  performed_by: {
    type: String,
    required: false
  }
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
