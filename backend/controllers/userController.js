import asyncHandler from '../middleware/asyncHandler.js';
import Driver from '../models/driverModel.js';
import User from '../models/userModel.js';
import generateToken from '../utills/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password)))  {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('invalid email and/or password');
    }
});

// @desc    Register User
// @route   POST /api/v1/users
// @access  Public
const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExits = await User.findOne({ email });

    if (userExits) {
        res.status(400);
        throw new Error('User already exist');
    }

    const user = await User.create( {
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    
});

// @desc    Log out User/ clear cookies
// @route   POST /api/v1/users/logout
// @access  Private
const logoutUser = asyncHandler (async (req, res) => {
    res.cookie('jwt','', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'});   
});

// @desc    Get User profile
// @route   GET /api/v1/users/profile
// @access  Private
const getUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);


    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update User profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get Users
// @route   GET /api/v1/users/
// @access  Private / Admin
const getUsers = asyncHandler (async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc    Get Drivers
// @route   GET /api/v1/drivers/
// @access  Private / Admin
const getDrivers = asyncHandler (async (req, res) => {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
});

// @desc    Get User by ID
// @route   GET /api/v1/users/:id
// @access  Private / Admin
const getUserByID = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user)  {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get Driver by ID
// @route   GET /api/v1/drivers/:id
// @access  Private / Admin
const getDriverByID = asyncHandler (async (req, res) => {
    const driver = await Driver.findById(req.params.id).select('-password');

    if (driver)  {
        res.status(200).json(driver);
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});

// @desc    Delete User
// @route   GET /api/v1/users/:id
// @access  Private / Admin
const deleteUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user)  {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({_id: user._id});
        res.status(201).json({message: 'User deleted successfully'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete Driver
// @route   GET /api/v1/drivers/:id
// @access  Private / Admin
const deleteDriver = asyncHandler (async (req, res) => {
    const driver = await Driver.findById(req.params.id).select('-password');

    if (driver)  {
        await Driver.deleteOne({_id: driver._id});
        res.status(201).json({message: 'Driver deleted successfully'});
    } else {
        res.status(404);
        throw new Error('Driver not found');
    }
});


// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private / Admin
const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user)  {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();
        res.status(200).json(({
            _id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
        }));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update Driver
// @route   PUT /api/v1/drivers/:id
// @access  Private / Admin
const updateDriver = asyncHandler (async (req, res) => {
    const driver = await Driver.findById(req.params.id).select('-password');

    if (driver)  {
        driver.name = req.body.name || driver.name;
        driver.email = req.body.email || driver.email;
        driver.licenseNumber = req.body.licenseNumber || driver.licenseNumber;
        driver.licenseCode = req.body.licenseCode || driver.licenseCode;
        driver.licenseExpiry = req.body.licenseExpiry || driver.licenseExpiry;

        const updatedUser = await user.save();
        res.status(200).json(({
            _id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
        }));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, registerUser,logoutUser,getUsers,getUserByID, getDriverByID,getUserProfile, getDrivers, updateUserProfile, updateUser, updateDriver, deleteUser, deleteDriver}