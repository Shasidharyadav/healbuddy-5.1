import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  answers: { type: Map, of: String, required: true },
  painScore: { type: Number, required: true },
}, { timestamps: true });

const Assessment = mongoose.model('Assessment', AssessmentSchema);
export default Assessment;
