import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 

const driverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Üser",
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  licenseCode: {
    type: String,
    required: true,
    unique: true
  },
  licenseExpiry: {
    type: Date, 
    required: true
  },
  password: {
    type: String,
    required: true
  }
} , {
    timestamps: true,
});

// Hash password before saving the driver document
driverSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;