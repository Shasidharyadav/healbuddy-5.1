import express from 'express';
import AssessmentSummary from '../models/AssessmentSummary.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { profileId, levelOneAnswers, levelTwoAnswers } = req.body;

        console.log('Received profileId:', profileId); // Log the profileId

        if (!profileId) {
            return res.status(400).json({ message: 'Profile ID is required' });
        }

        const newSummary = new AssessmentSummary({
            profileId,
            levelOneAnswers,
            levelTwoAnswers
        });

        await newSummary.save();
        res.status(201).json(newSummary);
    } catch (error) {
        console.error('Error saving assessment summary:', error.message);
        res.status(500).json({ message: 'Error saving assessment summary', error: error.message });
    }
});

export default router;
