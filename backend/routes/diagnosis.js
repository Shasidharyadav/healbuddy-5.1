import express from 'express';
import { saveDiagnosisData, getDiagnosisDataByProfile } from '../controllers/diagnosisController.js';
import  authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to save diagnosis data
router.post('/save', authMiddleware, saveDiagnosisData);

// Route to get diagnosis data by profile ID
router.get('/:profileId', authMiddleware, getDiagnosisDataByProfile);

export default router;  // Export router as default
