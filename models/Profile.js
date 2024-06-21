import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    occupation: { type: String, required: true },
    work: { type: String, required: true },
    exercise: { type: String, required: true },
    reason: { type: String, required: true }
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
