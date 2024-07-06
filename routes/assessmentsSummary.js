import express from 'express';
import AssessmentSummary from '../models/AssessmentSummary.js';
import Score from '../models/Score.js';

const router = express.Router();

// POST endpoint for saving assessment summary
router.post('/', async (req, res) => {
    try {
        const { profileId, levelOneAnswers, levelTwoAnswers } = req.body;

        console.log('Received profileId:', profileId); // Log the profileId
        console.log('Received levelOneAnswers:', levelOneAnswers); // Log the levelOneAnswers
        console.log('Received levelTwoAnswers:', levelTwoAnswers); // Log the levelTwoAnswers

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
        console.error('Error saving assessment summary:', error); // Log the full error
        res.status(500).json({ message: 'Error saving assessment summary', error: error.message });
    }
});

// GET endpoint for retrieving assessment summary by profile ID
router.get('/:profileId/answers', async (req, res) => {
    try {
        const { profileId } = req.params;

        console.log('Fetching answers for profileId:', profileId); // Log the profileId

        if (!profileId) {
            return res.status(400).json({ message: 'Profile ID is required' });
        }

        const summary = await AssessmentSummary.findOne({ profileId });

        if (!summary) {
            return res.status(404).json({ message: 'Assessment summary not found' });
        }

        res.status(200).json(summary);
    } catch (error) {
        console.error('Error fetching assessment summary:', error.message);
        res.status(500).json({ message: 'Error fetching assessment summary', error: error.message });
    }
});

// POST endpoint for updating score
router.post('/updateScore', async (req, res) => {
    try {
        const { profileId, score } = req.body;

        console.log('Updating score for profileId:', profileId); // Log the profileId
        console.log('Score:', score); // Log the score

        if (!profileId) {
            return res.status(400).json({ message: 'Profile ID is required' });
        }

        const newScore = new Score({
            profileId,
            score
        });

        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        console.error('Error updating score:', error); // Log the full error
        res.status(500).json({ message: 'Error updating score', error: error.message });
    }
});

export default router;
