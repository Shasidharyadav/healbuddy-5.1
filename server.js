import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile.js';
import authRoutes from './routes/auth.js';
import assessmentSummaryRoutes from './routes/assessmentsSummary.js'; // Import the new route correctly

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/profiles', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/assessment-summary', assessmentSummaryRoutes); // Add the new route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
