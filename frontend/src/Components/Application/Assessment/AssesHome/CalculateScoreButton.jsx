import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const CalculateScoreButton = ({ profileId }) => {
    const [diagnosisData, setDiagnosisData] = useState(null);  // Store the Provisional Diagnosis data

    const calculateScore = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/assessment-summary/${profileId}/answers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 404) {
                console.error('Answers not found for the given profile ID.');
                return;
            }

            const data = response.data;

            // 1. Fetch the Excel file from the server
            const fileResponse = await fetch('/Excel/Lotus Algorithm Simulator_18092024.xlsx');
            
            // Check if the file is successfully fetched
            if (!fileResponse.ok) {
                throw new Error('Failed to fetch Excel file. Please check the file path.');
            }

            const arrayBuffer = await fileResponse.arrayBuffer();

            // Attempt to parse the file as a workbook
            let workbook;
            try {
                workbook = XLSX.read(arrayBuffer, { type: 'array' });
            } catch (error) {
                throw new Error('Failed to parse Excel file. Ensure the file is a valid Excel document.');
            }

            // 2. Access the "Provisional Diagnosis" sheet
            const diagnosisSheet = workbook.Sheets['Provisional Diagnosis'];
            if (!diagnosisSheet) {
                throw new Error('Provisional Diagnosis sheet not found.');
            }

            // 3. Clear all values in the Provisional Diagnosis sheet except column A

            // 4. Map answers to the "Response" sheet and update the workbook
            const responseSheet = workbook.Sheets['Response'];
            clearColumn(responseSheet, 'D');
            clearColumn(responseSheet, 'E');
            clearColumn(responseSheet, 'F');

            mapAnswersToSheet(responseSheet, data.levelOneAnswers, 'D');  // Map Level 1 answers
            mapAnswersToSheet(responseSheet, data.levelTwoAnswers, 'D');  // Map Level 2 answers

            // Save the updated workbook and let Excel recalculate when opened
            const savedFilePath = await saveUpdatedWorkbook(workbook, profileId, token);

            // 6. Extract the updated data from the saved file on the server
            await extractDataFromSavedFile(savedFilePath, profileId, token);

            // 7. Delete the file after extracting data
            await deleteSavedFile(savedFilePath, token);

        } catch (error) {
            console.error('Error calculating score:', error.message || error);
        }
    };

    // Function to clear all columns except column A
    const clearAllExceptColumnA = (sheet) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        
        for (let R = range.s.r; R <= range.e.r; ++R) { // Loop over all rows
            for (let C = range.s.c + 1; C <= range.e.c; ++C) { // Loop over all columns except column A (index 0)
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (sheet[cellAddress]) {
                    sheet[cellAddress].v = ''; // Clear the value of the cell
                }
            }
        }
    };

    // Function to map answers into Excel sheet columns
    const mapAnswersToSheet = (sheet, answers, startColumn) => {
        Object.keys(answers).forEach(key => {
            const row = findRowByQuestionCode(sheet, key);
            if (row !== null) {
                const answer = answers[key];
                if (Array.isArray(answer)) {
                    answer.forEach((value, index) => {
                        const column = XLSX.utils.encode_col(XLSX.utils.decode_col(startColumn) + index);
                        sheet[`${column}${row}`] = { v: value };
                    });
                } else {
                    sheet[`${startColumn}${row}`] = { v: answer };
                }
            }
        });
    };

    // Function to find row by question code
    const findRowByQuestionCode = (sheet, code) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })]; // Column A is at index 0
            if (cell && cell.v === code) {
                return R + 1; // Excel rows are 1-indexed
            }
        }
        return null;
    };

    // Clear specific columns in the Excel sheet
    const clearColumn = (sheet, column) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: XLSX.utils.decode_col(column) });
            if (sheet[cellAddress]) {
                sheet[cellAddress].v = ''; // Clear the cell value
            }
        }
    };

    // Send the updated workbook to the backend to save it as a file
    const saveUpdatedWorkbook = async (workbook, profileId, token) => {
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const formData = new FormData();
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        formData.append('file', blob, 'Updated_LotusAlgorithmSimulator.xlsx');
        formData.append('profileId', profileId);

        try {
            const response = await axios.post('/api/files/saveWorkbook', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Workbook saved on the server:', response.data.filePath);
            return response.data.filePath;  // Return the saved file path
        } catch (error) {
            console.error('Error saving workbook:', error);
            throw error;
        }
    };

    // Extract data from the saved file
    const extractDataFromSavedFile = async (filePath, profileId, token) => {
        try {
            const response = await axios.get(`/api/files/extractData`, {
                params: { filePath, profileId },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Extracted Data from Provisional Diagnosis:', response.data);
            setDiagnosisData(response.data);  // Set the extracted data in state
        } catch (error) {
            console.error('Error extracting data from saved file:', error);
            throw error;
        }
    };

    // Delete the saved file after extraction
    const deleteSavedFile = async (filePath, token) => {
        try {
            await axios.delete(`/api/files/deleteFile`, {
                params: { filePath },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('File deleted from the server:', filePath);
        } catch (error) {
            console.error('Error deleting file from server:', error);
            throw error;
        }
    };

    return (
        <div>
            <button onClick={calculateScore}>Calculate Score and Extract Data</button>
            {diagnosisData && (
                <div>
                    <h3>Extracted Provisional Diagnosis Data:</h3>
                    <pre>{JSON.stringify(diagnosisData, null, 2)}</pre>  {/* Render extracted data */}
                </div>
            )}
            </div>
    );
};

export default CalculateScoreButton;
