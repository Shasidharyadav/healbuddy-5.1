import Profile from '../models/Profile.js';

export const checkProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ userId: req.user.id });
        res.json(profiles);
    } catch (error) {
        console.error('Error checking profiles:', error);
        res.status(500).send('Server Error');
    }
};

export const createProfile = async (req, res) => {
    const { profileName, name, age, gender, occupation, work, exercise, reason } = req.body;
    try {
        console.log('Creating profile with data:', req.body);
        const newProfile = new Profile({
            userId: req.user.id,
            profileName,
            name,
            age,
            gender,
            occupation,
            work,
            exercise,
            reason
        });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).send('Server Error');
    }
};
