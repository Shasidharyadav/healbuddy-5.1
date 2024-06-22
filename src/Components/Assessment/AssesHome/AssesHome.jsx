import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LevelOneAssessment from './LevelOneAssessment';
import LevelTwoAssessment from './LevelTwoAssessment';
import LevelTwoConfirmation from './LevelTwoConfirmation';
import './style/AssesHome.css';

const AssesHome = ({ profileId }) => {
    const [level, setLevel] = useState(1);
    const [levelOneAnswers, setLevelOneAnswers] = useState({});
    const [levelTwoAnswers, setLevelTwoAnswers] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/profiles/${profileId}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [profileId]);

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
        // Submit final answers to backend or perform final actions
        console.log('Final Assessment:', { levelOneAnswers, levelTwoAnswers });
    };

    const renderAssessment = () => {
        if (confirmation) {
            return <LevelTwoConfirmation onStart={handleStartLevelTwo} />;
        }

        switch (level) {
            case 1:
                return <LevelOneAssessment onContinue={handleLevelOneContinue} profileName={profile?.name} />;
            case 2:
                return <LevelTwoAssessment onComplete={handleLevelTwoComplete} />;
            default:
                return null;
        }
    };

    const renderSummary = () => {
        if (Object.keys(levelTwoAnswers).length > 0) {
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
