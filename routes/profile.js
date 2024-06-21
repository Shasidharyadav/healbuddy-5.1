import express from 'express';
import { checkProfiles, createProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/check-profiles', authMiddleware, checkProfiles);
router.post('/create-profile', authMiddleware, createProfile);

export default router;
