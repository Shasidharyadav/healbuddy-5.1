import mongoose from 'mongoose';

const DiagnosisSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    diagnosisData: {
        type: Object,  // Store the diagnosis data as an object
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Diagnosis = mongoose.model('Diagnosis', DiagnosisSchema);

export default Diagnosis;
