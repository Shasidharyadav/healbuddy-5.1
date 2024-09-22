import multer from 'multer';
import XLSX from 'xlsx';
import fs from 'fs';
import { exec } from 'child_process'; // Use to execute Python script

// Set up Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the 'uploads/' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // File saved with a timestamped name
    }
});

export const upload = multer({ storage });

// Save workbook to the server
export const saveWorkbook = (req, res) => {
    const filePath = req.file.path;

    // Run Python script to recalculate Excel file using the full path to Python
    const pythonPath = 'C:/Users/bhargavi/AppData/Local/Programs/Python/Python312/python.exe'; // Adjust the path if needed

    exec(`${pythonPath} recalculate_excel.py ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error running Python script: ${stderr}`);
            return res.status(500).send('Failed to recalculate Excel file.');
        }
        console.log(stdout);
        res.json({ filePath });
    });
};

// Extract data from the Provisional Diagnosis sheet in the uploaded workbook
export const extractData = (req, res) => {
    const { filePath } = req.query;
    const workbook = XLSX.readFile(filePath);  // Read the uploaded Excel file
    const diagnosisSheet = workbook.Sheets['Provisional Diagnosis']; // Ensure correct sheet name

    if (!diagnosisSheet) {
        return res.status(404).send('Provisional Diagnosis sheet not found');
    }

    const sheetData = XLSX.utils.sheet_to_json(diagnosisSheet, { header: 1 }); // Convert sheet to JSON
    res.json(sheetData); // Return the extracted data as JSON
};

// Delete the uploaded file after extraction
export const deleteFile = (req, res) => {
    const { filePath } = req.query;

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
            return res.status(500).send('Failed to delete the file');
        }
        res.send('File deleted successfully');
    });
};
