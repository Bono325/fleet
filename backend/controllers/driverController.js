import asyncHandler from '../middleware/asyncHandler.js';
import Driver from '../models/driverModel.js';
import generateToken from '../utills/generateToken.js';

// @desc    Auth driver & get token
// @route   POST /api/v1/driver/login
// @access  Public
const authDriver = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ email });

    if (driver && (await driver.matchPassword(password)))  {
        generateToken(res, driver._id);

        res.status(200).json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            licenseCode: driver.licenseCode,
            licenseNumber: driver.licenseNumber,
            licenseExpiry: driver.licenseExpiry
        });
    } else {
        res.status(401);
        throw new Error('invalid email and/or password');
    }
});

// @desc    Log out User/ clear cookies
// @route   POST /api/v1/drivers/logout
// @access  Private
const logoutDriver = asyncHandler (async (req, res) => {
    res.cookie('jwt','', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'});   
});

// @desc    Get Driver profile
// @route   GET /api/v1/drivers/profile
// @access  Private
const getDriverProfile = asyncHandler (async (req, res) => {
    const driver = await Driver.findById(req.user._id);


    if (driver) {
        res.status(200).json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            licenseNumber: driver.licenseNumber,
            licenseCode: driver.licenseCode,
            licenseExpiry: driver.licenseExpiry
        });
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});

// @desc    Update Driver profile
// @route   PUT /api/v1/drivers/profile
// @access  Private
const updateDriverProfile = asyncHandler (async (req, res) => {
    const driver = await Driver.findById(req.user._id);

    if (driver) {
        driver.name = req.body.name || driver.name;
        driver.email = req.body.email || driver.email;
        licenseNumber = req.body.licenseNumber || driver.licenseNumber;
        licenseCode = req.body.licenseCode || driver.licenseCode;
        licenseExpiry = req.body.licenseExpiry || driver.licenseExpiry;

        if (req.body.password) {
            driver.password = req.body.password;
        }
        const updatedDriver = await driver.save();

        res.status(200).json({
            _id: updatedDriver._id,
            name: updatedDriver.name,
            email: updatedDriver.email,
            licenseNumber: driver.licenseNumber,
            licenseCode: driver.licenseCode,
            licenseExpiry: driver.licenseExpiry
        });
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});

// @desc    add new driver
// @route   POST /api/v1/drivers
// @access  Private/ Admin
const addDriver = asyncHandler (async (req, res) => {
    const driver = new Driver({
     name: 'Driver name',
     user: req.user._id,
     image: 'images/sample.jpg',
     email: 'demo@mail.com',
     password: '12345',
     licenseNumber: '555555555',
     licenseCode: 'zz',
     licenseExpiry: 2005/3/22
    })
 
    const createdDriver = await driver.save();
    console.log(createdDriver);
    res.status(201).json(createdDriver);
 
 });
 
 // @desc    Update driver
 // @route   PUT /api/v1/drivers/:id
 // @access  Private / admin
 const updateDriver = asyncHandler (async (req, res) => {
     const { name, licenseNumber, licenseCode, image, licenseExpiry} = req.body;
 
     const driver = await Driver.findById(req.params.id)
 
     if (driver) {
         driver.name = name;
         driver.licenseExpiry = licenseExpiry;
         driver.licenseCode = licenseCode;
         driver.image = image;
         driver.licenseNumber = licenseNumber;
 
         const updateDriver = await driver.save();
         res.json(updateDriver);
     } else {
         res.status(404);
         throw new Error('Resource not found');
     }
 });
 
 // @desc    Delete a driver
 // @route   DELETE /api/v1/drivers/:id
 // @access  Private/Admin
 const deleteDriver = asyncHandler(async (req, res) => {
   const driver = await Driver.findById(req.params.id);
 
   if (driver) {
     await Driver.deleteOne({ _id: driver._id });
     res.json({ message: 'Driver removed' });
     toast.success("Driver deleted!");
   } else {
     res.status(404);
     throw new Error('Driver not found');
   }
 });
 
export { authDriver, logoutDriver, getDriverProfile, updateDriverProfile, deleteDriver, updateDriver, addDriver}