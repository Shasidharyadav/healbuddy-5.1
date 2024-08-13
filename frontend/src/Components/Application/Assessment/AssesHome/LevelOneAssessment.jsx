import React, { useState, useEffect } from 'react';
import { calculateBMI, healStories, factMessages } from './helpers';
import './style/AssesHome.css';
import neckImage from './images/pain/neck.png';
import shoulderImage from './images/pain/shoulder.png';
import armAboveElbowImage from './images/pain/arm_above_elbow.png';
import armBelowElbowImage from './images/pain/arm_below_elbow.png';
import lowerBackImage from './images/pain/lower_back.png';
import upperBackImage from './images/pain/upper_back.png';
import hipsImage from './images/pain/hips.png';
import thighAboveKneeImage from './images/pain/thigh_above_knee.png';
import legBelowKneeImage from './images/pain/leg_below_knee.png';
import ankleImage from './images/pain/ankle.png';
import otherPainImage from './images/pain/other_pain.png';
import noPainImage from './images/pain/no_pain.png';

const images = {
    Neck: neckImage,
    Shoulder: shoulderImage,
    'arm above elbow': armAboveElbowImage,
    'arm below elbow': armBelowElbowImage,
    'Lower Back': lowerBackImage,
    'Upper Back': upperBackImage,
    Hips: hipsImage,
    'Thigh above knee': thighAboveKneeImage,
    'Leg below knee': legBelowKneeImage,
    Ankle: ankleImage,
    'Other Pain': otherPainImage,
    'No Pain': noPainImage
};

const questions = [
    'L010300', 'L010400', 'BMI_RESULT', 'L010501', 'L010502', 'L010600', 'L010700', 'L010800', 'L010801',
    'L010900', 'L011000', 'L011100', 'L011101', 'L011110', 'L011120', 'L011130', 'L011140', 'L011150', 'L011160',
    'L011170', 'L011180', 'L011190', 'SUMMARY'
];

const LevelOneAssessment = ({ onContinue, profileName }) => {
    const [step, setStep] = useState('L010300');
    const [answers, setAnswers] = useState({});
    const [height, setHeight] = useState(5.0);
    const [weight, setWeight] = useState(40);
    const [bmi, setBMI] = useState(null);
    const [multiSelectAnswers, setMultiSelectAnswers] = useState([]);
    const [showFactPage, setShowFactPage] = useState(false);
    const [factPageMessage, setFactPageMessage] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const [followUpQueue, setFollowUpQueue] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [history, setHistory] = useState([]); // to keep track of question flow

  

    useEffect(() => {
        if (showFactPage) {
            const timer = setTimeout(() => {
                setShowFactPage(false);
                if (step === 'L010700') {
                    setStep('L010800');
                } else if (step === 'L010900') {
                    setStep('L011000');
                }
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showFactPage, step]);

    useEffect(() => {
        setTypingIndex(0);
        const timer = setInterval(() => {
            setTypingIndex(prevIndex => {
                if (prevIndex < healStories[step]?.length) {
                    return prevIndex + 1;
                } else {
                    clearInterval(timer);
                    return prevIndex;
                }
            });
        }, 50);

        return () => clearInterval(timer);
    }, [step]);

    const saveStateToLocalStorage = () => {
        const state = {
            step,
            answers,
            height,
            weight,
            bmi,
            history,
            followUpQueue,
        };
        localStorage.setItem('assessmentState', JSON.stringify(state));
    };

    const handleNext = (nextStep, questionCode, answer) => {
        if (isMandatoryQuestion(step) && !isAnswerProvided(step, answer)) {
            window.alert('This question is mandatory. Please provide an answer to proceed.');
            return;
        }
        console.log(`${questionCode} ${answer}`);
        setAnswers(prev => ({ ...prev, [questionCode]: answer }));
        setHistory(prev => [...prev, step]); // add current step to history
        setMultiSelectAnswers([]);
        if (nextStep === 'FACT_PAGE') {
            setShowFactPage(true);
            setFactPageMessage(factMessages[Math.floor(Math.random() * factMessages.length)]);
        } else {
            setStep(nextStep);
        }
        saveStateToLocalStorage();
    };

    const handlePrevious = () => {
        if (history.length > 0) {
            const prevStep = history[history.length - 1];
            setHistory(history.slice(0, -1));
            setStep(prevStep);
            setMultiSelectAnswers(answers[prevStep] || []);
            saveStateToLocalStorage();
        }
    };

    const handleSliderChange = (e, type) => {
        const value = parseFloat(e.target.value);
        if (type === 'height') setHeight(value);
        if (type === 'weight') setWeight(value);
    };

    const handleBMI = () => {
        const calculatedBMI = calculateBMI(height, weight);
        setBMI(calculatedBMI);
        handleNext('BMI_RESULT', 'L010400', weight);
        handleNext('BMI_RESULT', 'BMI', calculatedBMI);
    };

    const handleMultiSelectChange = (option) => {
        setMultiSelectAnswers(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const handleFollowUpQuestions = (selectedAnswers) => {
        const nextSteps = [];
        if (selectedAnswers.includes('Pregnancy')) nextSteps.push('L011101');
        if (selectedAnswers.includes('Recent Surgery')) nextSteps.push('L011110');
        if (selectedAnswers.includes('Active Fractures')) nextSteps.push('L011120');
        if (selectedAnswers.includes('History of Cancer')) nextSteps.push('L011130');
        if (selectedAnswers.includes('History of Tuberculosis')) nextSteps.push('L011140');
        if (selectedAnswers.includes('Loss of Appetite')) nextSteps.push('L011150');
        if (selectedAnswers.includes('Severe Night Pain')) nextSteps.push('L011160');
        if (selectedAnswers.includes('High-grade fever')) nextSteps.push('L011170');
        if (selectedAnswers.includes('Shortness of Breath')) nextSteps.push('L011180');
        if (selectedAnswers.includes('History of Neurological Conditions')) nextSteps.push('L011190');
        setFollowUpQueue(nextSteps);
        if (nextSteps.length > 0) {
            setStep(nextSteps[0]);
        } else {
            setStep('SUMMARY');
        }
        saveStateToLocalStorage();
    };

    const handleNextFollowUp = (questionCode, answer) => {
        // Save follow-up answers
        setAnswers(prev => ({ ...prev, [questionCode]: answer }));
        setFollowUpQueue(prevQueue => {
            const nextQueue = [...prevQueue];
            nextQueue.shift();
            if (nextQueue.length > 0) {
                console.log(`Next follow-up question: ${nextQueue[0]}`);
                setStep(nextQueue[0]);
            } else {
                setStep('SUMMARY');
            }
            saveStateToLocalStorage();
            return nextQueue;
        });
    };

    const handleEditQuestion = (questionCode) => {
        setStep(questionCode);
        setMultiSelectAnswers(answers[questionCode] || []);
        setIsEditing(true);
    };

    const handleSave = (questionCode, answer) => {
        if (questionCode === 'L010300' || questionCode === 'L010400') {
            const updatedAnswers = { ...answers, [questionCode]: answer };
            const updatedHeight = questionCode === 'L010300' ? answer : height;
            const updatedWeight = questionCode === 'L010400' ? answer : weight;
            const updatedBMI = calculateBMI(updatedHeight, updatedWeight);
            updatedAnswers['BMI'] = updatedBMI;
            setBMI(updatedBMI);
            setAnswers(updatedAnswers);
        } else {
            setAnswers(prev => ({ ...prev, [questionCode]: answer }));
        }
        setStep('SUMMARY');
        setIsEditing(false);
        saveStateToLocalStorage();
    };

    const isMandatoryQuestion = (questionCode) => {
        const mandatoryQuestions = ['L010501', 'L010900', 'L011000', 'L011100'];
        return mandatoryQuestions.includes(questionCode);
    };

    const isAnswerProvided = (questionCode, answer) => {
        if (questionCode === 'L010900' && Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== null && answer !== undefined && answer !== '';
    };

    const getProgress = () => {
        const currentIndex = questions.indexOf(step);
        const totalQuestions = questions.length;
        const percentage = Math.round((currentIndex / totalQuestions) * 100);
        return { currentIndex, totalQuestions, percentage };
    };

    const renderProgressBar = () => {
        const { percentage } = getProgress();
        return (
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                <div className="progress-text">{`${percentage}%`}</div>
            </div>
        );
    };

    const renderFactPage = () => {
        return (
            <div className="fact-page">
                <div className="fact-message">{factPageMessage}</div>
                <div className="remark">Our care algorithm is evaluating your response.</div>
            </div>
        );
    };

    const renderQuestion = () => {
        return (
            <div>
                {renderProgressBar()}
                {(() => {
                    switch (step) {
                        case 'L010300':
                            return (
                                <div className="question">
                                    <p>As we create {profileName}'s virtual care file, please help us with {profileName}'s approximate height?</p>
                                    <input
                                        type="range"
                                        min="4"
                                        max="7"
                                        step="0.1"
                                        value={height}
                                        onChange={(e) => handleSliderChange(e, 'height')}
                                    />
                                    <p>{height} ft</p>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010300', height)}>Save</button>
                                        ) : (
                                            <button onClick={() => handleNext('L010400', 'L010300', height)}>Next</button>
                                        )}
                                    </div>
                                    <p>{healStories['L010300'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010400':
                            return (
                                <div className="question">
                                    <p>And what would be {profileName}'s approximate weight?</p>
                                    <input
                                        type="range"
                                        min="40"
                                        max="90"
                                        step="1"
                                        value={weight}
                                        onChange={(e) => handleSliderChange(e, 'weight')}
                                    />
                                    <p>{weight} kgs</p>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010400', weight)}>Save</button>
                                        ) : (
                                            <button onClick={handleBMI}>Next</button>
                                        )}
                                    </div>
                                    <p>{healStories['L010400'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'BMI_RESULT':
                            return (
                                <div className="question">
                                    <p>Your BMI is: {bmi}</p>
                                    <p>{bmi < 18.5 ? healStories.BMI.underweight : (bmi <= 24.9 ? healStories.BMI.normal : healStories.BMI.overweight)}</p>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('BMI_RESULT', bmi)}>Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleNext('L010501', 'BMI', bmi)}>Next</button>
                                                <button onClick={() => handlePrevious()}>Previous</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        case 'L010501':
                            return (
                                <div className="question">
                                    <p>If you are undergoing pain in one or more areas, please select a location that pains or bothers you the most.</p>
                                    <div className="options">
                                        {['Neck', 'Shoulder', 'arm above elbow', 'arm below elbow', 'Lower Back', 'Upper Back', 'Hips', 'Thigh above knee', 'Leg below knee', 'Ankle', 'Other Pain', 'No Pain'].map(option => (
                                            <div key={option} className="option">
                                                <img src={images[option]} alt={option} />
                                                <button
                                                    onClick={() => handleNext(option === 'No Pain' ? 'SUMMARY' : 'L010502', 'L010501', option)}
                                                >
                                                    {option}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                    <p>{healStories['L010501']?.substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010502':
                            return (
                                <div className="question">
                                    <p>Please select all other pain locations, if any.</p>
                                    <div className="options">
                                        {['Neck', 'Shoulder', 'arm above elbow', 'arm below elbow', 'Lower Back', 'Upper Back', 'Hips', 'Thigh above knee', 'Leg below knee', 'Ankle', 'Other Pain', 'No Pain'].map(option => (
                                            <div key={option} className="option">
                                                <img src={images[option]} alt={option} />
                                                <button
                                                    onClick={() => handleMultiSelectChange(option)}
                                                    className={multiSelectAnswers.includes(option) ? 'selected' : ''}
                                                >
                                                    {option}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010502', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleNext(multiSelectAnswers.includes('No Pain') ? 'SUMMARY' : 'L010600', 'L010502', multiSelectAnswers)}>Next</button>
                                                <button onClick={() => handlePrevious()}>Previous</button>
                                            </>
                                        )}
                                    </div>
                                    <p>{healStories['L010502']?.substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010600':
                            return (
                                <div className="question">
                                    <p>How would you best describe your pain?</p>
                                    <div className="options">
                                        {['Mild pain that bothers occasionally', 'Pain that comes and goes in multiple episodes with brief spells of no pain between two pain episodes', 'Moderate pain that bothers daily but can go about with daily routine', 'Severe pain that restricts daily routine and requires me to rest', 'Crippling pain that has made me bed-ridden'].map(option => (
                                            <button key={option} onClick={() => handleNext('L010700', 'L010600', option)}>{option}</button>
                                        ))}
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010600', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <button onClick={() => handlePrevious()}>Previous</button>
                                        )}
                                    </div>
                                    <p>{healStories['L010600'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010700':
                            return (
                                <div className="question">
                                    <p>If you were to rate your pain on a scale of 0-10, with 10 implying unbearable pain and 0 implying no pain, what pain rating will you give?</p>
                                    <div className="options">
                                        {[...Array(11).keys()].map(option => (
                                            <button key={option} onClick={() => handleNext(option === 0 ? 'SUMMARY' : 'FACT_PAGE', 'L010700', option)}>{option}</button>
                                        ))}
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010700', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <button onClick={() => handlePrevious()}>Previous</button>
                                        )}
                                    </div>
                                    <p>{healStories['L010700'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010800':
                            return (
                                <div className="question">
                                    <p>We now need to understand how the pain feels at a given point:</p>
                                    <div className="options">
                                        <button onClick={() => handleNext('L010900', 'L010800', 'Constant')}>Constant</button>
                                        <button onClick={() => handleNext('L010801', 'L010800', 'Intermittent')}>Intermittent</button>
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010800', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <button onClick={() => handlePrevious()}>Previous</button>
                                        )}
                                    </div>
                                    <p>{healStories['L010800'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010801':
                            return (
                                <div className="question">
                                    <p>Does your pain change during the following activities?</p>
                                    <div className="options">
                                        <button onClick={() => handleNext('L010900', 'L010801', 'Pain increases during any movement like bending forward/backwards, walking, etc.')}>Pain increases during any movement like bending forward/backwards, walking, etc.</button>
                                        <button onClick={() => handleNext('L010900', 'L010801', 'Pain increases in sedentary postures like continuous sitting/standing/lying down')}>Pain increases in sedentary postures like continuous sitting/standing/lying down</button>
                                        <button onClick={() => handleNext('L010900', 'L010801', 'There is no relief even after a change in posture/activity')}>There is no relief even after a change in posture/activity</button>
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010801', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <button onClick={() => handlePrevious()}>Previous</button>
                                        )}
                                    </div>
                                    <p>{healStories['L010801'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L010900':
                            return (
                                <div className="question">
                                    <p>Alongside pain, have you encountered any of the following recently?</p>
                                    <div className="options">
                                        {['Dizzy', 'Tingling', 'Numbness', 'Weakness', 'Loss of Balance', 'None'].map(option => (
                                            <button
                                                key={option}
                                                onClick={() => handleMultiSelectChange(option)}
                                                className={multiSelectAnswers.includes(option) ? 'selected' : ''}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L010900', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleNext('FACT_PAGE', 'L010900', multiSelectAnswers)}>Next</button>
                                                <button onClick={() => handlePrevious()}>Previous</button>
                                            </>
                                        )}
                                    </div>
                                    <p>{healStories['L010900'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L011000':
                            return (
                                <div className="question">
                                    <p>In certain rare conditions, the pain may also arise from previous medical histories. How is the current pain since it started?</p>
                                    <div className="options">
                                        <button onClick={() => handleNext('L011100', 'L011000', 'Worsening')}>Worsening</button>
                                        <button onClick={() => handleNext('L011100', 'L011000', 'Much better than before')}>Much better than before</button>
                                        <button onClick={() => handleNext('L011100', 'L011000', 'Same as before')}>Same as before</button>
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L011000', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <button onClick={() => handlePrevious()}>Previous</button>
                                        )}
                                    </div>
                                    <p>{healStories['L011000'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        case 'L011100':
                            return (
                                <div className="question">
                                    <p>Please choose if you have been detected with any of the following medical conditions?</p>
                                    <div className="options">
                                        {['Pregnancy', 'Recent Surgery', 'Active Fractures', 'History of Cancer', 'History of Tuberculosis', 'Loss of Appetite', 'Severe Night Pain', 'High-grade fever', 'Shortness of Breath', 'History of Neurological Conditions', 'None'].map(option => (
                                            <button
                                                key={option}
                                                onClick={() => handleMultiSelectChange(option)}
                                                className={multiSelectAnswers.includes(option) ? 'selected' : ''}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="options">
                                        {isEditing ? (
                                            <button onClick={() => handleSave('L011100', multiSelectAnswers)}>Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => {
                                                    handleNext('FOLLOW_UP', 'L011100', multiSelectAnswers);
                                                    handleFollowUpQuestions(multiSelectAnswers);
                                                }}>Next</button>
                                                <button onClick={() => handlePrevious()}>Previous</button>
                                            </>
                                        )}
                                    </div>
                                    <p>{healStories['L011100'].substring(0, typingIndex)}</p>
                                </div>
                            );
                        // Add similar Save button logic for follow-up questions and remaining cases
                        case 'L011101':
                            return (
                                <div className="question">
                                    <p>Please help us understand the current stage of pregnancy.</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011101', 'Currently pregnant');
                                        }}>Currently pregnant</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011101', 'Child is 1 year old');
                                        }}>Child is 1 year old</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011110':
                            return (
                                <div className="question">
                                    <p>Please help us understand the surgery timelines.</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011110', 'Surgery was done in the last year');
                                        }}>Surgery was done in the last year</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011110', 'Surgery was completed before last year');
                                        }}>Surgery was completed before last year</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011120':
                            return (
                                <div className="question">
                                    <p>Is the active fracture in the spine?</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011120', 'Yes');
                                        }}>Yes</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011120', 'No');
                                        }}>No</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011130':
                            return (
                                <div className="question">
                                    <p>Please help us understand the cancer timelines.</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011130', 'Active for less than a year');
                                        }}>Active for less than a year</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011130', 'Active for more than a year');
                                        }}>Active for more than a year</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011140':
                            return (
                                <div className="question">
                                    <p>Please help us understand the tuberculosis timelines.</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011140', 'Detected in the last year');
                                        }}>Detected in the last year</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011140', 'Detected before the previous year');
                                        }}>Detected before the previous year</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011150':
                            return (
                                <div className="question">
                                    <p>How many meals are you having daily?</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011150', '1 meal or less in a day');
                                        }}>1 meal or less in a day</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011150', 'Around 2 meals in a day');
                                        }}>Around 2 meals in a day</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011150', 'Around 2-3 meals in a day');
                                        }}>Around 2-3 meals in a day</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011160':
                            return (
                                <div className="question">
                                    <p>Does the pain force you to get out of bed and move around?</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011160', 'Yes');
                                        }}>Yes</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011160', 'No');
                                        }}>No</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011170':
                            return (
                                <div className="question">
                                    <p>Please help us with the highest body temperature reading on your thermometer.</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011170', 'Less than 98 degree');
                                        }}>Less than 98 degree</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011170', '98-101 degree');
                                        }}>98-101 degree</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011170', 'More than 101 degree');
                                        }}>More than 101 degree</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011180':
                            return (
                                <div className="question">
                                    <p>When do you specifically encounter shortness of breath?</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011180', 'While doing some rigorous activities');
                                        }}>While doing some rigorous activities</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011180', 'Even while at rest');
                                        }}>Even while at rest</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'L011190':
                            return (
                                <div className="question">
                                    <p>Please help us understand your current status with your neurological condition.</p>
                                    <div className="options">
                                        <button onClick={() => {
                                            handleNextFollowUp('L011190', 'It has just been a year, but still mobile and able to move around');
                                        }}>It has just been a year, but still mobile and able to move around</button>
                                        <button onClick={() => {
                                            handleNextFollowUp('L011190', 'The condition has been worsening and has made you bedridden');
                                        }}>The condition has been worsening and has made you bedridden</button>
                                    </div>
                                    <div className="options">
                                        <button onClick={() => handlePrevious()}>Previous</button>
                                    </div>
                                </div>
                            );
                        case 'SUMMARY':
                            return (
                                <div className="summary">
                                    <h3>Assessment Summary</h3>
                                    <ul>
                                        {Object.entries(answers).map(([question, answer]) => (
                                            <li key={question}>
                                                {question}: {Array.isArray(answer) ? answer.join(', ') : answer}
                                                <button onClick={() => handleEditQuestion(question)}>Edit</button>
                                            </li>
                                        ))}
                                    </ul>
                                    <p>We need more inputs for a provisional diagnosis. This will barely take 5 more minutes.</p>
                                    <p>{healStories.summary}</p>
                                    <div className="options">
                                        <button onClick={() => onContinue(answers)}>Continue to Level 2</button>
                                    </div>
                                </div>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    };

    return (
        <div className="assessment-container">
            {showFactPage ? renderFactPage() : renderQuestion()}
        </div>
    );
};

export default LevelOneAssessment;
