import express from 'express';
import { protect, admin } from '../middleware/authMiddlerware.js';
import { addTrip, getAdminsTrips, getDriversTrips, getTripbyId, updateTripToCompleted } from '../controllers/tripController.js';

const router = express.Router();

router.route('/').post(protect, admin, addTrip);

router.route('/:id').get(protect, admin, getTripbyId).post(protect, updateTripToCompleted);

router.route('/trips').get(protect, getAdminsTrips);

router.route('/mytrips').get(protect, getDriversTrips);

export default router;