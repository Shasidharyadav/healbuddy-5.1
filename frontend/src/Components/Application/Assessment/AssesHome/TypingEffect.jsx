import React, { useEffect, useState } from 'react';
import './style/TypingEffect.css';

const TypingEffect = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return <p className="typing-effect">{displayedText}</p>;
};

export default TypingEffect;
