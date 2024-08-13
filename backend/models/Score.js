import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    profileId: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
