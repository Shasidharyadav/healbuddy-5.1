import Profile from '../models/Profile.js';

export const checkProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ userId: req.user.id });
        res.json(profiles); // Ensure the entire profile object, including the _id, is returned
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
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile); // Ensure the entire profile object, including the _id, is returned
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).send('Server Error');
    }
};

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile || profile.userId.toString() !== req.user.id) {
            return res.status(404).send('Profile not found');
        }
        res.json(profile); // Ensure the entire profile object, including the _id, is returned
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send('Server Error');
    }
};
