import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import profileRoutes from './routes/profile.js';
import authRoutes from './routes/auth.js';
import assessmentSummaryRoutes from './routes/assessmentsSummary.js';
import fileRoutes from './routes/fileRoutes.js';  // Use ES module import for file routes
import diagnosisRoutes from './routes/diagnosis.js';  // Correct import for default export

dotenv.config();

// Fix __dirname issue for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/api/profiles', profileRoutes);           // Profile routes
app.use('/api/auth', authRoutes);                  // Authentication routes
app.use('/api/assessment-summary', assessmentSummaryRoutes);  // Assessment summary routes
app.use('/api/files', fileRoutes);                 // File-related routes
app.use('/api/diagnosis', diagnosisRoutes);        // New diagnosis-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
