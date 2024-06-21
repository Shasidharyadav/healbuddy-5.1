import React, { useState, useEffect } from 'react';
import { calculateBMI, healStories, factMessages } from './helpers';
import './style/AssesHome.css';

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
        setTypingIndex(0); // Reset index when step changes
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

    const handleNext = (nextStep, questionCode, answer) => {
        console.log(`${questionCode} ${answer}`);
        setAnswers(prev => ({ ...prev, [questionCode]: answer }));
        setMultiSelectAnswers([]); // Resetting multiSelectAnswers on every transition
        if (nextStep === 'FACT_PAGE') {
            setShowFactPage(true);
            setFactPageMessage(factMessages[Math.floor(Math.random() * factMessages.length)]);
        } else {
            setStep(nextStep);
        }
    };

    const handlePrevious = (prevStep) => {
        setStep(prevStep);
        setMultiSelectAnswers(answers[prevStep] || []);
    };

    const handleSliderChange = (e, type) => {
        const value = parseFloat(e.target.value);
        if (type === 'height') setHeight(value);
        if (type === 'weight') {
            setWeight(value);
        }
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
            setStep(nextSteps[0]); // Transition to the first follow-up question
        } else {
            setStep('SUMMARY'); // No conditions met, move to summary
        }
    };

    const handleNextFollowUp = () => {
        setFollowUpQueue(prevQueue => {
            const nextQueue = [...prevQueue];
            nextQueue.shift(); // Remove the first element, which is the current question
            if (nextQueue.length > 0) {
                console.log(`Next follow-up question: ${nextQueue[0]}`);
                setStep(nextQueue[0]); // Set the next question in the queue
            } else {
                setStep('SUMMARY'); // If no more questions, go to summary
            }
            return nextQueue;
        });
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
                            <button onClick={() => handleNext('L010400', 'L010300', height)}>Next</button>
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
                            <button onClick={handleBMI}>Next</button>
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
                            <button onClick={() => handleNext('L010500', 'BMI', bmi)}>Next</button>
                            <button onClick={() => handlePrevious('L010400')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L010500':
                return (
                    <div className="question">
                        <p>If you are undergoing pain in one or more areas, please select a location that pains or bothers you the most.</p>
                        <div className="options">
                            {['Lower Back', 'Upper Back', 'Neck', 'Hips', 'Knee', 'Ankle', 'Shoulder', 'Other Joints (Wrist/ finger/ toes/ nasal/ jaw)', 'Other Pain', 'No Pain'].map(option => (
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
                            <button onClick={() => handleNext(multiSelectAnswers.includes('No Pain') ? 'SUMMARY' : 'L010600', 'L010500', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('BMI_RESULT')}>Previous</button>
                        </div>
                        <p>{healStories['L010500'].substring(0, typingIndex)}</p>
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
                            <button onClick={() => handlePrevious('L010500')}>Previous</button>
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
                            <button onClick={() => handlePrevious('L010600')}>Previous</button>
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
                            <button onClick={() => handlePrevious('L010700')}>Previous</button>
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
                            <button onClick={() => handlePrevious('L010800')}>Previous</button>
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
                            <button onClick={() => handleNext('FACT_PAGE', 'L010900', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L010801')}>Previous</button>
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
                            <button onClick={() => handlePrevious('L010900')}>Previous</button>
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
                            <button onClick={() => {
                                handleNext('FOLLOW_UP', 'L011100', multiSelectAnswers);
                                handleFollowUpQuestions(multiSelectAnswers);
                            }}>Next</button>
                            <button onClick={() => handlePrevious('L011000')}>Previous</button>
                        </div>
                        <p>{healStories['L011100'].substring(0, typingIndex)}</p>
                    </div>
                );
            // Additional cases for each follow-up question after L011100
            case 'L011101':
                return (
                    <div className="question">
                        <p>Please help us understand the current stage of pregnancy.</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011101: Currently pregnant`);
                            }}>Currently pregnant</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011101: Child is 1 year old`);
                            }}>Child is 1 year old</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011110':
                return (
                    <div className="question">
                        <p>Please help us understand the surgery timelines.</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011110: Surgery was done in the last year`);
                            }}>Surgery was done in the last year</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011110: Surgery was completed before last year`);
                            }}>Surgery was completed before last year</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011120':
                return (
                    <div className="question">
                        <p>Is the active fracture in the spine?</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011120: Yes`);
                            }}>Yes</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011120: No`);
                            }}>No</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011130':
                return (
                    <div className="question">
                        <p>Please help us understand the cancer timelines.</p>
                        <div className="options">
                        <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011130: Active for less than a year`);
                            }}>Active for less than a year</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011130: Active for more than a year`);
                            }}>Active for more than a year</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011140':
                return (
                    <div className="question">
                        <p>Please help us understand the tuberculosis timelines.</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011140: Detected in the last year`);
                            }}>Detected in the last year</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011140: Detected before the previous year`);
                            }}>Detected before the previous year</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011150':
                return (
                    <div className="question">
                        <p>How many meals are you having daily?</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011150: 1 meal or less in a day`);
                            }}>1 meal or less in a day</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011150: Around 2 meals in a day`);
                            }}>Around 2 meals in a day</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011150: Around 2-3 meals in a day`);
                            }}>Around 2-3 meals in a day</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011160':
                return (
                    <div className="question">
                        <p>Does the pain force you to get out of bed and move around?</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011160: Yes`);
                            }}>Yes</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011160: No`);
                            }}>No</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011170':
                return (
                    <div className="question">
                        <p>Please help us with the highest body temperature reading on your thermometer.</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011170: Less than 98 degree`);
                            }}>Less than 98 degree</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011170: 98-101 degree`);
                            }}>98-101 degree</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011170: More than 101 degree`);
                            }}>More than 101 degree</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011180':
                return (
                    <div className="question">
                        <p>When do you specifically encounter shortness of breath?</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011180: While doing some rigorous activities`);
                            }}>While doing some rigorous activities</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011180: Even while at rest`);
                            }}>Even while at rest</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L011190':
                return (
                    <div className="question">
                        <p>Please help us understand your current status with your neurological condition.</p>
                        <div className="options">
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011190: It has just been a year, but still mobile and able to move around`);
                            }}>It has just been a year, but still mobile and able to move around</button>
                            <button onClick={() => {
                                handleNextFollowUp();
                                console.log(`L011190: The condition has been worsening and has made you bedridden`);
                            }}>The condition has been worsening and has made you bedridden</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011100')}>Previous</button>
                        </div>
                    </div>
                );
            case 'SUMMARY':
                return (
                    <div className="summary">
                        <h3>Assessment Summary</h3>
                        <ul>
                            {Object.entries(answers).map(([question, answer]) => (
                                <li key={question}>{question}: {Array.isArray(answer) ? answer.join(', ') : answer}</li>
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
    };

    return (
        <div className="assessment-container">
            {showFactPage ? renderFactPage() : renderQuestion()}
        </div>
    );
};

export default LevelOneAssessment;
