import Assessment from '../models/Assessment.js';

export const submitAssessment = async (req, res) => {
    const { profileId, answers } = req.body;

    if (!profileId || !answers) {
        return res.status(400).json({ message: 'Profile ID and answers are required' });
    }

    try {
        const painScore = answers['L010700']; // Assuming L010700 is the pain score question
        const newAssessment = new Assessment({ profileId, answers, painScore });
        await newAssessment.save();
        res.status(201).json(newAssessment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit assessment', error: error.message });
    }
};

export const getAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find().populate('profileId');
        res.status(200).json(assessments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch assessments', error: error.message });
    }
};
