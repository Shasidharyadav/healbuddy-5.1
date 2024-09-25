import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const CalculateScoreButton = ({ profileId }) => {
    const [diagnosisData, setDiagnosisData] = useState(null);  // Store the Provisional Diagnosis data
    const [submissionSuccess, setSubmissionSuccess] = useState(false);  // Track submission status
    const [error, setError] = useState(null);  // Track errors

    // Function to fetch profile data (name, age, gender) by profileId
    const fetchProfileData = async (profileId, token) => {
        try {
            const response = await axios.get(`/api/profiles/${profileId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;  // Assuming the profile data includes name, age, and gender
        } catch (error) {
            console.error('Error fetching profile data:', error);
            throw error;
        }
    };

    // Function to insert profile data and BMI into the sheet
    const insertProfileDataIntoSheet = (sheet, profileData, bmi) => {
        const { name, age, gender } = profileData;

        // Insert profile data into specific rows/columns in the Excel sheet
        sheet['B2'] = { v: name };  // Assuming Name goes into cell B2
        sheet['B3'] = { v: age };   // Assuming Age goes into cell B3
        sheet['B4'] = { v: gender }; // Assuming Gender goes into cell B4
        sheet['B5'] = { v: bmi };   // Assuming BMI goes into cell B5 (fetched from levelOneAnswers)

        // Adjust the cell references as per your actual Excel structure
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

    // Function to format extracted data into a proper object
    const formatExtractedData = (data) => {
        const formattedData = {};

        data.forEach((item) => {
            if (Array.isArray(item)) {
                if (item.length === 2) {
                    formattedData[item[0]] = item[1];
                } else if (item.length > 2) {
                    formattedData[item[0]] = item.slice(1);
                }
            }
        });

        return formattedData;
    };

    // Send the formatted data to the backend
    const sendExtractedDataToBackend = async (data) => {
        try {
            const token = localStorage.getItem('token');

            // Format the extracted data before sending it
            const formattedData = formatExtractedData(data);

            const requestData = {
                profileId: profileId,  // Assuming profileId is available in the component
                diagnosisData: formattedData  // Send the formatted data as an object
            };

            console.log("Sending formatted data to backend:", requestData);

            const response = await axios.post('/api/diagnosis/save', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Diagnosis data successfully sent to the backend:', response.data);
            setSubmissionSuccess(true);
        } catch (error) {
            console.error('Error submitting diagnosis data to backend:', error);
            setError(error.message || error);
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
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Extracted Data from Provisional Diagnosis:', response.data);
            return response.data;  // Return extracted data to be sent to the backend
        } catch (error) {
            console.error('Error extracting data from saved file:', error);
            throw error;
        }
    };

    // Delete the saved file after extraction and sending to backend
    const deleteSavedFile = async (filePath, token) => {
        try {
            await axios.delete(`/api/files/deleteFile`, {
                params: { filePath },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('File deleted from the server:', filePath);
        } catch (error) {
            console.error('Error deleting file from server:', error);
            throw error;
        }
    };

    // Main function that handles everything
    const calculateScore = async () => {
        try {
            const token = localStorage.getItem('token');

            // 1. Fetch profile data (name, age, gender) by profileId
            const profileData = await fetchProfileData(profileId, token);
            console.log('Profile Data:', profileData);

            // 2. Fetch the answers for the profileId, including BMI
            const response = await axios.get(`/api/assessment-summary/${profileId}/answers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 404) {
                console.error('Answers not found for the given profile ID.');
                return;
            }

            const data = response.data;
            console.log('Assessment Summary:', data);

            // 3. Extract BMI from levelOneAnswers
            const bmi = data.levelOneAnswers.BMI || 0; // Assuming BMI is in levelOneAnswers
            console.log('BMI:', bmi);

            // 4. Fetch the Excel file from the server
            const fileResponse = await fetch('/Excel/Lotus Algorithm Simulator_18092024.xlsx');
            
            if (!fileResponse.ok) {
                throw new Error('Failed to fetch Excel file. Please check the file path.');
            }

            const arrayBuffer = await fileResponse.arrayBuffer();

            // 5. Parse the file as a workbook
            let workbook;
            try {
                workbook = XLSX.read(arrayBuffer, { type: 'array' });
            } catch (error) {
                throw new Error('Failed to parse Excel file.');
            }

            // 6. Access and clear "Provisional Diagnosis" sheet except column A
            const diagnosisSheet = workbook.Sheets['Provisional Diagnosis'];
            if (!diagnosisSheet) {
                throw new Error('Provisional Diagnosis sheet not found.');
            }

            // 7. Insert profile data and BMI into the sheet
            insertProfileDataIntoSheet(diagnosisSheet, profileData, bmi);

            // 8. Clear and map answers to the "Response" sheet
            const responseSheet = workbook.Sheets['Response'];
            clearColumn(responseSheet, 'D');
            mapAnswersToSheet(responseSheet, data.levelOneAnswers, 'D');
            mapAnswersToSheet(responseSheet, data.levelTwoAnswers, 'D');

            // 9. Save the updated workbook
            const savedFilePath = await saveUpdatedWorkbook(workbook, profileId, token);

            // 10. Extract the updated data from the saved file
            const extractedData = await extractDataFromSavedFile(savedFilePath, profileId, token);

            // 11. Send the extracted data to the backend
            await sendExtractedDataToBackend(extractedData);

            // 12. Delete the file from the server after sending the data
            await deleteSavedFile(savedFilePath, token);

        } catch (error) {
            console.error('Error calculating score:', error.message || error);
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
            {submissionSuccess && <p>Data successfully submitted to the backend!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default CalculateScoreButton;
