import express from 'express';
import { protect, admin } from '../middleware/authMiddlerware.js';
import { addVehicle, deleteVehicle, getVehicleByID, getVehicles, updateVehicleInfo } from '../controllers/vehicleController.js';

const router = express.Router();

router.route('/').get(protect, admin, getVehicles).post(protect, admin, addVehicle);

router.route('/:id').get(protect, getVehicleByID).delete(protect, admin, deleteVehicle).put(protect, admin, updateVehicleInfo);

export default router;