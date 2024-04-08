import express from 'express';
import { addDriver, authDriver, getDrivers } from '../controllers/driverController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';

const router = express.Router();

router.route('/').get(protect, admin, getDrivers).post(protect, admin, addDriver);

router.post('/auth', authDriver);

export default router;