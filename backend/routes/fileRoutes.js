import express from 'express';
import { saveWorkbook, extractData, deleteFile, upload } from '../controllers/fileController.js';

const router = express.Router();

// POST: Upload and save the Excel file
router.post('/saveWorkbook', upload.single('file'), saveWorkbook);

// GET: Extract data from the uploaded Excel file
router.get('/extractData', extractData);

// DELETE: Delete the uploaded Excel file after processing
router.delete('/deleteFile', deleteFile);

export default router;
