import React from 'react';
import './style/AssesHome.css';

const LevelTwoConfirmation = ({ onStart }) => {
    return (
        <div className="assessment-container">
            <div className="question">
                <p>Are you ready to start Level Two of the assessment?</p>
                <div className="options">
                    <button className="continue-button" onClick={onStart}>Start Level Two</button>
                </div>
            </div>
        </div>
    );
};

export default LevelTwoConfirmation;
