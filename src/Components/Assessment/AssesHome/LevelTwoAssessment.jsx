import React, { useState, useEffect } from 'react';
import './style/AssesHome.css';
import { healStories } from './helpers';

const LevelTwoAssessment = ({ onComplete }) => {
    const [step, setStep] = useState('L020101');
    const [answers, setAnswers] = useState({});
    const [multiSelectAnswers, setMultiSelectAnswers] = useState([]);
    const [typingIndex, setTypingIndex] = useState(0);

    useEffect(() => {
        setTypingIndex(0); // Reset index when step changes
        const timer = setInterval(() => {
            setTypingIndex(prevIndex => {
                if (healStories[step] && prevIndex < healStories[step].length) {
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
        setStep(nextStep);
    };

    const handlePrevious = (prevStep) => {
        setStep(prevStep);
        setMultiSelectAnswers(answers[prevStep] || []);
    };

    const handleMultiSelectChange = (option) => {
        setMultiSelectAnswers(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const renderQuestion = () => {
        switch (step) {
            case 'L020101':
                return (
                    <div className="question">
                        <p>We know how tough it is to be in the pain that you are in. We are here to help you get better and for that, we need some detailed information about your pain. Please help us with the duration since when have you been encountering the pain?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020201', 'L020101', 'Since the last 7 days')}>Since the last 7 days</button>
                            <button onClick={() => handleNext('L020202', 'L020101', 'Since the last 3 months')}>Since the last 3 months</button>
                            <button onClick={() => handleNext('L020202', 'L020101', 'More than 3 months')}>More than 3 months</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020102':
                return (
                    <div className="question">
                        <p>Since you mentioned that you have been having the pain for a while, did it suddenly relapse in the last 2 weeks?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020201', 'L020102', 'Yes')}>Yes</button>
                            <button onClick={() => handleNext('L020201', 'L020102', 'No')}>No</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020201':
                return (
                    <div className="question">
                        <p>Sometimes there are multiple other chronic conditions that also lead to pain. In medical parlance, we refer to them as comorbidities or non-musculoskeletal conditions. Have you been diagnosed with/ undergone medical interventions/ feel any of the following conditions in last one year?</p>
                        <div className="options">
                            {['Diabetes', 'Thyroid', 'Hypertension/ Blood pressure/ stroke', 'Arthritis', 'Osteopenia/ Osteoporosis', 'Prostrate Issues/ gynecological issues', 'Cardiac/ Heart conditions', 'Neurological conditions like Parkinsons / stroke', 'Severe Asthma', 'Ankylosing Spondylolisis', 'None of the Above'].map(option => (
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
                            <button onClick={() => handleNext('L020301', 'L020201', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L020102')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020301':
                return (
                    <div className="question">
                        <p>It is also important to ensure that your body doesn't have deficiencies of any of the critical components. Do you have deficiencies in any of the following?</p>
                        <div className="options">
                            {['Vitamin D3', 'Vitamin B12', 'Calcium', 'Haemoglobin/ iron', 'Not yet tested/ no deficiencies'].map(option => (
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
                            <button onClick={() => handleNext('L020401', 'L020301', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L020201')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020401':
                return (
                    <div className="question">
                        <p>Musculoskeletal pain may arise from any injury to areas that have undergone surgical interventions in the past. Please select if you have undergone any of the following surgeries in the past:</p>
                        <div className="options">
                            {['Spine Surgery', 'Cardiac Surgery', 'Gynaec Surgery/ Hernia', 'Joint Replacements', 'Other Surgeries', 'No surgeries reported'].map(option => (
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
                            <button onClick={() => handleNext('L020402', 'L020401', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L020301')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020402':
                return (
                    <div className="question">
                        <p>Hope you're much better now. Was this surgery done recently?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020501', 'L020402', 'In the last 1 year')}>In the last 1 year</button>
                            <button onClick={() => handleNext('L020501', 'L020402', 'Done before the last year')}>Done before the last year</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L020401')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020501':
                return (
                    <div className="question">
                        <p>Do you remember the first incidence of pain? If not, you may also share the incidences of pain during the early days.</p>
                        <div className="options">
                            {['With a fall/accident', 'Normal bending', 'Lifted heavy object', 'Travelling', 'Sudden jerk', 'Working out', 'Playing sports', 'Nothing specific'].map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleNext('L020601', 'L020501', option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L020402')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020601':
                return (
                    <div className="question">
                        <p>Is there any activity/ multiple activities that lead to rise in pain when you do them?</p>
                        <div className="options">
                            {['It\'s the first thing in the morning', 'While sitting on a chair/ couch', 'While sitting on the floor', 'While standing', 'While walking', 'While sleeping/ resting', 'While bending/ stooping', 'While lifting weights', 'While doing exercises/ working out', 'Pain doesn\'t aggravate'].map(option => (
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
                            <button onClick={() => handleNext('L020602', 'L020601', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L020501')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020602':
                return (
                    <div className="question">
                        <p>Interesting! Can you also help us with the duration after which the pain increases when you perform the referred activity/activities?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020701', 'L020602', 'Immediately, i.e., within 10 mins')}>Immediately, i.e., within 10 mins</button>
                            <button onClick={() => handleNext('L020701', 'L020602', 'After a few minutes, i.e., 10-30 mins')}>After a few minutes, i.e., 10-30 mins</button>
                            <button onClick={() => handleNext('L020701', 'L020602', 'After a while, i.e., after 30 minutes')}>After a while, i.e., after 30 minutes</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L020601')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020701':
                return (
                    <div className="question">
                        <p>And is there any activity/ activities that help you to reduce your pain?</p>
                        <div className="options">
                            {['External factors like balms/ hot packs/ ice packs', 'While sitting on a chair/ couch', 'While sitting on the floor', 'While standing', 'While walking', 'While sleeping/ resting', 'While bending/ stooping', 'While lifting weights', 'While doing exercises/ working out', 'Pain doesn\'t reduce', 'Correction of posture'].map(option => (
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
                            <button onClick={() => handleNext('L020702', 'L020701', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L020602')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020702':
                return (
                    <div className="question">
                        <p>This is good to know! So how long does it take for the pain to reduce?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020801', 'L020702', 'Immediately, i.e., within 10 mins')}>Immediately, i.e., within 10 mins</button>
                            <button onClick={() => handleNext('L020801', 'L020702', 'After a few minutes, i.e., 10-30 mins')}>After a few minutes, i.e., 10-30 mins</button>
                            <button onClick={() => handleNext('L020801', 'L020702', 'After a while, i.e., after 30 minutes')}>After a while, i.e., after 30 minutes</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L020701')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020801':
                return (
                    <div className="question">
                        <p>Sincerely appreciate for taking time to answer all the questions. We have just one more question to go. Given that you have been impacted by the pain for some time, have you undertaken any kind of treatment in the past?</p>
                        <div className="options">
                            {['Applied pain relief gel/ balm / spray', 'Taken Medications under specialist supervision', 'Taken Physiotherapy/ TENS /IFT /TRACTION', 'Done home exercises by checking online videos', 'Simply took bed rest without taking any medicine or rehabilitation', 'Underwent ayurveda treatment', 'Not undertaken any treatment/ medication'].map(option => (
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
                            <button onClick={() => handleNext('L020802', 'L020801', multiSelectAnswers)}>Next</button>
                            <button onClick={() => handlePrevious('L020702')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
                    </div>
                );
            case 'L020802':
                return (
                    <div className="question">
                        <p>It is good that you considered to get treated. Did the previous treatment help you in any way?</p>
                        <div className="options">
                            <button onClick={() => handleNext('SUMMARY', 'L020802', 'The pain instead increased')}>The pain instead increased</button>
                            <button onClick={() => handleNext('SUMMARY', 'L020802', 'There was no change in pain')}>There was no change in pain</button>
                            <button onClick={() => handleNext('SUMMARY', 'L020802', 'It reduced my pain intensity, but slight pain is still there')}>It reduced my pain intensity, but slight pain is still there</button>
                            <button onClick={() => handleNext('SUMMARY', 'L020802', 'It gave me temporary relief at that time, but the pain has relapsed')}>It gave me temporary relief at that time, but the pain has relapsed</button>
                            <button onClick={() => handleNext('SUMMARY', 'L020802', 'I was well for a few months, and the pain relapsed only recently again')}>I was well for a few months, and the pain relapsed only recently again</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L020801')}>Previous</button>
                        </div>
                        <p>{healStories[step]?.substring(0, typingIndex)}</p>
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
                        <div className="options">
                            <button onClick={() => onComplete(answers)}>Complete Assessment</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="assessment-container">
            {renderQuestion()}
        </div>
    );
};

export default LevelTwoAssessment;
