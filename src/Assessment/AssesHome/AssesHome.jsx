// src/components/AssesHome.js
import React, { useState } from 'react';
import LevelOneAssessment from './LevelOneAssessment';
import LevelTwoConfirmation from './LevelTwoConfirmation';
import LevelTwoAssessment from './LevelTwoAssessment';
import './AssesHome.css';

const AssesHome = () => {
    const [level, setLevel] = useState(1);
    const [levelOneAnswers, setLevelOneAnswers] = useState({});
    const [levelTwoAnswers, setLevelTwoAnswers] = useState({});
    const [confirmation, setConfirmation] = useState(false);

    const handleLevelOneContinue = (answers) => {
        setLevelOneAnswers(answers);
        setConfirmation(true);
    };

    const handleStartLevelTwo = () => {
        setConfirmation(false);
        setLevel(2);
    };

    const handleLevelTwoComplete = (answers) => {
        setLevelTwoAnswers(answers);
    };

    const renderAssessment = () => {
        if (confirmation) {
            return <LevelTwoConfirmation onStart={handleStartLevelTwo} />;
        }

        switch (level) {
            case 1:
                return <LevelOneAssessment onContinue={handleLevelOneContinue} />;
            case 2:
                return <LevelTwoAssessment onComplete={handleLevelTwoComplete} />;
            default:
                return null;
        }
    };

    const renderSummary = () => {
        if (levelTwoAnswers && Object.keys(levelTwoAnswers).length > 0) {
            return (
                <div className="summary-container">
                    <h3>Level 1 Assessment Summary</h3>
                    <ul className="summary">
                        {Object.entries(levelOneAnswers).map(([question, answer]) => (
                            <li key={question}>{question}: {answer}</li>
                        ))}
                    </ul>
                    <h3>Level 2 Assessment Summary</h3>
                    <ul className="summary">
                        {Object.entries(levelTwoAnswers).map(([question, answer]) => (
                            <li key={question}>{question}: {answer}</li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="asses-home">
            <h1>Assessment Home</h1>
            <div className="assessment-frame">
                {renderAssessment()}
                {renderSummary()}
            </div>
        </div>
    );
};

export default AssesHome;
