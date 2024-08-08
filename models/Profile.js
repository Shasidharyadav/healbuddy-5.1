import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    occupation: { type: String, required: true },
    work: { 
        type: String, 
        required: function() { return this.occupation === 'Others'; }, // Custom validation logic
        validate: {
            validator: function(value) {
                // If occupation is 'Others', work must not be empty
                return this.occupation !== 'Others' || (this.occupation === 'Others' && value);
            },
            message: 'Work field is required if occupation is "Others".'
        }
    },
    exercise: { type: String, required: true },
    reason: { type: String, required: true }
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
