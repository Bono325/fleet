import asyncHandler from '../middleware/asyncHandler.js';
import Trip from '../models/tripModel.js';


// @desc    create new trip
// @route   POST /api/v1/trips
// @access  private / admin
const addTrip = asyncHandler (async (req, res) => {
    const { 
      vehicle_id,
      driver_id,
      startDateTime,
      endDateTime,
      startOdometerKm,
      endOdometerKm,
      origin,
      destinations,
      purpose,
      notes
    } = req.body;

    if (destinations && destinations.length ===0) {
        res.status(400);
        throw new Error('No Destinations');
    } else {
        const trip = new Trip({
    
            user: req.user._id,
            vehicle_id,
            driver_id,
            startDateTime,
            endDateTime,
            startOdometerKm,
            endOdometerKm,
            origin,
            destinations,
            purpose,
            notes
        });

        const createdTrip = await trip.save();

        res.status(201).json(createdTrip);
    }
});

// @desc    Get logged admin logged trips
// @route   POST /api/v1/trips/trips
// @access  private 
const getAdminsTrips = asyncHandler (async (req, res) => {
    const trips = await Trip.find({ user: req.user._id });
    res.status(200).json(trips)
});

// @desc    Get logged drivers trips
// @route   POST /api/v1/trips/mytrip
// @access  private 
const getDriversTrips = asyncHandler (async (req, res) => {
    const trips = await Trip.find({ driver_id: req.user._id });
    res.status(200).json(trips)
});

// @desc    get trip by ID
// @route   GET /api/v1/trips/:id
// @access  private
// ToDo: Validate that the user is listed in trip?
const getTripbyId = asyncHandler (async (req, res) => {
    const trip = await Trip.findById(req.params.id).populate('user', 'name email');

    if(trip) {
        res.status(200).json(trip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    update trip to completed
// @route   PUT /api/trips/:id
// @access  private
const updateTripToCompleted = asyncHandler (async (req, res) => {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
        trip.endDateTime = Date.now();
        trip.endOdometerKm = req.body.endOdometerKm;

        const updatedTrip = await trip.save();

        res.status(200).json(updatedTrip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

export { addTrip, getAdminsTrips, getDriversTrips, getTripbyId, updateTripToCompleted}