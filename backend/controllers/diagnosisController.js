import Diagnosis from '../models/Diagnosis.js';

// Controller to save the extracted diagnosis data
export const saveDiagnosisData = async (req, res) => {
    const { profileId, diagnosisData } = req.body;

    console.log('Request body:', req.body);  // Log the request body

    if (!profileId || !diagnosisData) {
        return res.status(400).json({ message: 'Profile ID and diagnosis data are required.' });
    }

    try {
        // Create and save new diagnosis data entry
        const newDiagnosis = new Diagnosis({
            profileId,
            diagnosisData,
        });

        await newDiagnosis.save();

        console.log('Diagnosis data saved:', newDiagnosis);  // Log the saved diagnosis data

        return res.status(201).json({ message: 'Diagnosis data saved successfully.' });
    } catch (error) {
        console.error('Error saving diagnosis data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


// Controller to get diagnosis data by profile ID
export const getDiagnosisDataByProfile = async (req, res) => {
    const { profileId } = req.params;

    try {
        const diagnosis = await Diagnosis.findOne({ profileId });

        if (!diagnosis) {
            return res.status(404).json({ message: 'Diagnosis data not found.' });
        }

        return res.status(200).json(diagnosis);
    } catch (error) {
        console.error('Error fetching diagnosis data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
