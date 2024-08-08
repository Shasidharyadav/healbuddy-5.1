import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const CalculateScoreButton = ({ profileId }) => {
    const [totalScore, setTotalScore] = useState(0);
    const [scores, setScores] = useState({});

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

            // Fetch the Excel file via HTTP
            const fileResponse = await fetch('/Excel/LotusAlgorithmSimulator.xlsx');
            const arrayBuffer = await fileResponse.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            // Ensure all scoring mechanisms are executed
            const sheetsToClear = ['Response']; // Add all relevant sheet names here
            const sheetsToScore = ['Scoring']; // Add all relevant scoring sheet names here

            // Clear all previous responses in the relevant columns
            sheetsToClear.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                if (sheet) {
                    clearColumn(sheet, 'C');
                    clearColumn(sheet, 'D'); // Assuming 'D' is the next column for multiple choices
                    clearColumn(sheet, 'E'); // Clear 'E' column for multiple choices
                }
            });

            // Map answers to the Response sheet
            const responseSheet = workbook.Sheets['Response'];
            mapAnswersToSheet(responseSheet, data.levelOneAnswers, 'C');
            mapAnswersToSheet(responseSheet, data.levelTwoAnswers, 'C');

            // Calculate scores from all scoring sheets
            let total = 0;
            let totalH = 0;
            let totalI = 0;
            let totalJ = 0;

            sheetsToScore.forEach(sheetName => {
                const sheet = workbook.Sheets[sheetName];
                if (sheet) {
                    total += calculateTotalScore(sheet, 'G'); // Assuming G column contains the scores
                    totalH += calculateTotalScore(sheet, 'H'); // Assuming H column contains the scores
                    totalI += calculateTotalScore(sheet, 'I'); // Assuming I column contains the scores
                    totalJ += calculateTotalScore(sheet, 'J'); // Assuming J column contains the scores
                }
            });

            setTotalScore(total);
            setScores({ totalH, totalI, totalJ });
            console.log('Total Score (G):', total);
            console.log('Total Score (H):', totalH);
            console.log('Total Score (I):', totalI);
            console.log('Total Score (J):', totalJ);

            // Export the updated workbook
            const updatedFilePath = '/path/to/public/Excel/Updated_LotusAlgorithmSimulator.xlsx';
            XLSX.writeFile(workbook, updatedFilePath);

            // Update the backend with the total scores
            await axios.post('/api/assessment-summary/updateScore', {
                profileId,
                score: total,
                scores: { totalH, totalI, totalJ }
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Scores updated successfully');
        } catch (error) {
            console.error('Error calculating score:', error.response ? error.response.data : error.message);
        }
    };

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

    const findRowByQuestionCode = (sheet, code) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
            if (cell && cell.v === code) {
                return R + 1; // Excel rows are 1-indexed
            }
        }
        return null;
    };

    const calculateTotalScore = (sheet, scoreColumn) => {
        let total = 0;
        const range = XLSX.utils.decode_range(sheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: XLSX.utils.decode_col(scoreColumn) })];
            if (cell && !isNaN(cell.v)) {
                total += parseFloat(cell.v);
            }
        }
        return total;
    };

    const clearColumn = (sheet, column) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cellAddress = XLSX.utils.encode_cell({ r: R, c: XLSX.utils.decode_col(column) });
            if (sheet[cellAddress]) {
                sheet[cellAddress].v = '';
            }
        }
    };

    return (
        <div>
            <button onClick={calculateScore}>Calculate Score</button>
            {totalScore > 0 && (
                <div>
                    <p>Total Score (G): {totalScore}</p>
                    <p>Total Score (H): {scores.totalH}</p>
                    <p>Total Score (I): {scores.totalI}</p>
                    <p>Total Score (J): {scores.totalJ}</p>
                </div>
            )}
        </div>
    );
};

export default CalculateScoreButton;
