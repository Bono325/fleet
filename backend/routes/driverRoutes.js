import express from 'express';
import { addDriver, authDriver } from '../controllers/driverController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';

const router = express.Router();

router.route('/').post(protect, addDriver);

router.post('/auth', authDriver);

export default router;