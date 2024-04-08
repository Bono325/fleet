import express from 'express';
import { addDriver, authDriver, deleteDriver, getDriverByID, getDriverProfile, getDrivers, logoutDriver, updateDriver, updateDriverProfile } from '../controllers/driverController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';

const router = express.Router();

router.route('/').get(protect, admin, getDrivers).post(protect, admin, addDriver);

router.post('/auth', authDriver); 

router.post('/logout', logoutDriver);

router.route('/profile').get(protect, getDriverProfile).put(protect, updateDriverProfile);

router.route('/:id').get(protect, admin, getDriverByID).put(protect, admin, updateDriver).delete(protect, admin, deleteDriver);


export default router;