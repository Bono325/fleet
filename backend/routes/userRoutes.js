import express from 'express';
import { authUser, deleteUser, getUserByID, getUserProfile, getUsers, logoutUser, registerUser, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddlerware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserByID).put(protect, admin, updateUser).delete(protect, admin, deleteUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

export default router;