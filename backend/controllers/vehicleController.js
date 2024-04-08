import asyncHandler from '../middleware/asyncHandler.js';
import Vehicle from '../models/vehicleModel.js'

// @desc    add new vehicle
// @route   POST /api/v1/vehicles
// @access  Private/ Admin
const addVehicle = asyncHandler (async (req, res) => {
    const vehicle = new Vehicle({
     make: 'Make',
     model: 'Model',
     user: req.user._id,
     year: 2020,
     license_plate: 'BB CC FF - ZN',
     vin: '004CE5698488',
     fuel_type: 'Fuel_type',
     odometer_km: 100
    })
 
    const createdVehicle = await vehicle.save();
    console.log(createdVehicle);
    res.status(201).json(createdVehicle);
 
 });

// @desc    Get Vehicles
// @route   GET /api/v1/vehicles/
// @access  Private / Admin
const getVehicles = asyncHandler (async (req, res) => {
    const vehicles = await Vehicle.find({});
    res.status(200).json(vehicles);
});

// @desc    Get Vehicle by ID
// @route   GET /api/v1/vehicles/:id
// @access  Private / Admin
const getVehicleByID = asyncHandler (async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle)  {
        res.status(200).json(vehicle);
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

// @desc    Update Vehicle
// @route   PUT /api/v1/vehicles/info
// @access  Private / admin
const updateVehicleInfo = asyncHandler (async (req, res) => {
    const vehicle = await Vehicle.findById(req.user._id);

    if (vehicle) {
        vehicle.name = req.body.name || vehicle.name;
        vehicle.email = req.body.email || vehicle.email;
        licenseNumber = req.body.licenseNumber || vehicle.licenseNumber;
        licenseCode = req.body.licenseCode || vehicle.licenseCode;
        licenseExpiry = req.body.licenseExpiry || vehicle.licenseExpiry;

        if (req.body.password) {
            vehicle.password = req.body.password;
        }
        const updatedVehicle = await vehicle.save();

        res.status(200).json({
            _id: updatedVehicle._id,
            name: updatedVehicle.name,
            email: updatedVehicle.email,
            licenseNumber: vehicle.licenseNumber,
            licenseCode: vehicle.licenseCode,
            licenseExpiry: vehicle.licenseExpiry
        });
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

// @desc    Delete a vehicle
 // @route   DELETE /api/v1/vehicles/:id
 // @access  Private/Admin
 const deleteVehicle = asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);
  
    if (vehicle) {
      await Vehicle.deleteOne({ _id: vehicle._id });
      res.json({ message: 'Vehicle removed' });
      toast.success("Vehicle deleted!");
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  });

export {addVehicle, getVehicles, getVehicleByID, updateVehicleInfo, deleteVehicle }