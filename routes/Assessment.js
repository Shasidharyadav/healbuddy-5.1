import express from 'express';
import { submitAssessment, getAssessments } from '../controllers/assessmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/submit-assessment', authMiddleware, submitAssessment);
router.get('/', authMiddleware, getAssessments);

export default router;
