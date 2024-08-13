import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LevelOneAssessment from './LevelOneAssessment';
import LevelTwoAssessment from './LevelTwoAssessment';
import LevelTwoConfirmation from './LevelTwoConfirmation';
import CalculateScoreButton from './CalculateScoreButton';
import './style/AssesHome.css';

const AssesHome = ({ profileId }) => {
    const [level, setLevel] = useState(1);
    const [levelOneAnswers, setLevelOneAnswers] = useState({});
    const [levelTwoAnswers, setLevelTwoAnswers] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token is not available');
                return;
            }

            if (!profileId) {
                console.error('Profile ID is not defined');
                return;
            }

            try {
                const response = await axios.get(`/api/profiles/${profileId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
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

    const handleLevelTwoComplete = async (answers) => {
        setLevelTwoAnswers(answers);
        const assessmentSummary = {
            profileId,
            levelOneAnswers,
            levelTwoAnswers: answers // Ensuring levelTwoAnswers are included
        };

        console.log('Submitting assessment summary:', assessmentSummary); // Log the payload

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/assessment-summary', assessmentSummary, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Assessment summary saved:', response.data);
        } catch (error) {
            console.error('Error saving assessment summary:', error.response ? error.response.data : error.message);
        }
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
                            <li key={question}>{question}: {Array.isArray(answer) ? answer.join(', ') : answer}</li>
                        ))}
                    </ul>
                    <h3>Level 2 Assessment Summary</h3>
                    <ul className="summary">
                        {Object.entries(levelTwoAnswers).map(([question, answer]) => (
                            <li key={question}>{question}: {Array.isArray(answer) ? answer.join(', ') : answer}</li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="asses-home">
            <h1></h1>
            <div className="assessment-frame">
                {renderAssessment()}
                {renderSummary()}
                <CalculateScoreButton profileId={profileId} />
            </div>
        </div>
    );
};

export default AssesHome;
