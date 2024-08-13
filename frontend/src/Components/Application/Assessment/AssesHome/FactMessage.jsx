import React, { useEffect } from 'react';
import './style/FactMessage.css';

const FactMessage = ({ message, onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(onFinish, 8000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="fact-message">
            <div className="buffering">
                <div className="buffering-text">Our care algorithm is evaluating your response...</div>
                <div className="buffering-icon"></div>
            </div>
            <div className="fact-message-text">{message}</div>
        </div>
    );
};

export default FactMessage;
