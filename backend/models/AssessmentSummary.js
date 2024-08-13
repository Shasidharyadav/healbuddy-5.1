import mongoose from 'mongoose';

const assessmentSummarySchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    levelOneAnswers: {
        type: Object, // Changed from Map to Object
        required: true
    },
    levelTwoAnswers: {
        type: Object, // Changed from Map to Object
        required: true
    }
}, { timestamps: true });

const AssessmentSummary = mongoose.model('AssessmentSummary', assessmentSummarySchema);

export default AssessmentSummary;
