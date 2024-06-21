import React, { useState } from 'react';
import './style/AssesHome.css';

const LevelTwoAssessment = ({ onComplete }) => {
    const [step, setStep] = useState('L020101');
    const [answers, setAnswers] = useState({});
    const [completed, setCompleted] = useState(false);

    const handleNext = (nextStep, question, answer) => {
        setAnswers(prev => ({ ...prev, [question]: answer }));
        setStep(nextStep);
    };

    const handlePrevious = () => {
        switch (step) {
            case 'L020102':
                setStep('L020101');
                break;
            case 'L020201':
                setStep(answers['L020101'] === 'Since the last 3 months' || answers['L020101'] === 'More than 3 months' ? 'L020102' : 'L020101');
                break;
            case 'L020301':
                setStep('L020201');
                break;
            case 'L020401':
                setStep('L020301');
                break;
            case 'L020402':
                setStep('L020401');
                break;
            case 'L020501':
                setStep(answers['L020401'] !== 'No surgeries reported' ? 'L020402' : 'L020401');
                break;
            case 'L020601':
                setStep('L020501');
                break;
            case 'L020602':
                setStep('L020601');
                break;
            case 'L020701':
                setStep('L020602');
                break;
            case 'L020702':
                setStep('L020701');
                break;
            case 'L020801':
                setStep('L020702');
                break;
            case 'L020802':
                setStep(answers['L020801'] !== 'Not undertaken any treatment/medication' ? 'L020801' : 'L020701');
                break;
            default:
                setStep('L020101');
                break;
        }
    };

    const handleComplete = () => {
        setCompleted(true);
        onComplete(answers);
    };

    const renderQuestion = () => {
        if (completed) {
            return (
                <div className="question">
                    <h3>Level 2 Assessment Summary</h3>
                    <ul className="summary">
                        {Object.entries(answers).map(([question, answer]) => (
                            <li key={question}>{question}: {answer}</li>
                        ))}
                    </ul>
                    <p>Thank you for responding to the questions. Your level 2 assessment is complete!</p>
                </div>
            );
        }

        switch (step) {
            case 'L020101':
                return (
                    <div className="question">
                        <p>Duration of pain?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020201', 'L020101', 'Since the last 7 days')}>Since the last 7 days</button>
                            <button onClick={() => handleNext('L020102', 'L020101', 'Since the last 3 months')}>Since the last 3 months</button>
                            <button onClick={() => handleNext('L020102', 'L020101', 'More than 3 months')}>More than 3 months</button>
                        </div>
                    </div>
                );
            case 'L020102':
                return (
                    <div className="question">
                        <p>Did the pain suddenly relapse in the last 2 weeks?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020201', 'L020102', 'Yes')}>Yes</button>
                            <button onClick={() => handleNext('L020201', 'L020102', 'No')}>No</button>
                        </div>
                    </div>
                );
            case 'L020201':
                return (
                    <div className="question">
                        <p>Any diagnosed comorbidities?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020301', 'L020201', 'Diabetes')}>Diabetes</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Thyroid')}>Thyroid</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Hypertension/Blood pressure/stroke')}>Hypertension/Blood pressure/stroke</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Arthritis')}>Arthritis</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Osteopenia/Osteoporosis')}>Osteopenia/Osteoporosis</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Prostate Issues/Gynecological issues')}>Prostate Issues/Gynecological issues</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Cardiac/Heart conditions')}>Cardiac/Heart conditions</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Neurological conditions like Parkinson\'s/stroke')}>Neurological conditions like Parkinson\'s/stroke</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Severe Asthma')}>Severe Asthma</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'Ankylosing Spondylolysis')}>Ankylosing Spondylolysis</button>
                            <button onClick={() => handleNext('L020301', 'L020201', 'None of the Above')}>None of the Above</button>
                        </div>
                    </div>
                );
            case 'L020301':
                return (
                    <div className="question">
                        <p>Any deficiencies?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020401', 'L020301', 'Vitamin D3')}>Vitamin D3</button>
                            <button onClick={() => handleNext('L020401', 'L020301', 'Vitamin B12')}>Vitamin B12</button>
                            <button onClick={() => handleNext('L020401', 'L020301', 'Calcium')}>Calcium</button>
                            <button onClick={() => handleNext('L020401', 'L020301', 'Haemoglobin/Iron')}>Haemoglobin/Iron</button>
                            <button onClick={() => handleNext('L020401', 'L020301', 'Not yet tested/no deficiencies')}>Not yet tested/no deficiencies</button>
                        </div>
                    </div>
                );
            case 'L020401':
                return (
                    <div className="question">
                        <p>Any past surgeries?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020402', 'L020401', 'Spine Surgery')}>Spine Surgery</button>
                            <button onClick={() => handleNext('L020402', 'L020401', 'Cardiac Surgery')}>Cardiac Surgery</button>
                            <button onClick={() => handleNext('L020402', 'L020401', 'Gynaec Surgery/Hernia')}>Gynaec Surgery/Hernia</button>
                            <button onClick={() => handleNext('L020402', 'L020401', 'Joint Replacements')}>Joint Replacements</button>
                            <button onClick={() => handleNext('L020402', 'L020401', 'Other Surgeries')}>Other Surgeries</button>
                            <button onClick={() => handleNext('L020501', 'L020401', 'No surgeries reported')}>No surgeries reported</button>
                        </div>
                    </div>
                );
            case 'L020402':
                return (
                    <div className="question">
                        <p>Was the surgery done recently?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020501', 'L020402', 'In the last 1 year')}>In the last 1 year</button>
                            <button onClick={() => handleNext('L020501', 'L020402', 'Done before the last year')}>Done before the last year</button>
                        </div>
                    </div>
                );
            case 'L020501':
                return (
                    <div className="question">
                        <p>First incidence of pain?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020601', 'L020501', 'With a fall/accident')}>With a fall/accident</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Normal bending')}>Normal bending</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Lifted heavy object')}>Lifted heavy object</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Traveling')}>Traveling</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Sudden jerk')}>Sudden jerk</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Working out')}>Working out</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Playing sports')}>Playing sports</button>
                            <button onClick={() => handleNext('L020601', 'L020501', 'Nothing specific')}>Nothing specific</button>
                        </div>
                    </div>
                );
            case 'L020601':
                return (
                    <div className="question">
                        <p>Activities that lead to a rise in pain?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020602', 'L020601', "It's the first thing in the morning")}>It's the first thing in the morning</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While sitting on a chair/couch')}>While sitting on a chair/couch</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While sitting on the floor')}>While sitting on the floor</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While standing')}>While standing</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While walking')}>While walking</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While sleeping/resting')}>While sleeping/resting</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While bending/stooping')}>While bending/stooping</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While lifting weights')}>While lifting weights</button>
                            <button onClick={() => handleNext('L020602', 'L020601', 'While doing exercises/working out')}>While doing exercises/working out</button>
                            <button onClick={() => handleNext('L020602', 'L020601', "Pain doesn't aggravate")}>Pain doesn't aggravate</button>
                        </div>
                    </div>
                );
            case 'L020602':
                return (
                    <div className="question">
                        <p>Duration after which the pain increases when you perform the referred activity?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020701', 'L020602', 'Immediately, i.e., within 10 mins')}>Immediately, i.e., within 10 mins</button>
                            <button onClick={() => handleNext('L020701', 'L020602', 'After a few minutes, i.e., 10-30 mins')}>After a few minutes, i.e., 10-30 mins</button>
                            <button onClick={() => handleNext('L020701', 'L020602', 'After a while, i.e., after 30 minutes')}>After a while, i.e., after 30 minutes</button>
                        </div>
                    </div>
                );
            case 'L020701':
                return (
                    <div className="question">
                        <p>Any activity that helps reduce your pain?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020702', 'L020701', 'External factors like balms/hot packs/ice packs')}>External factors like balms/hot packs/ice packs</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While sitting on a chair/couch')}>While sitting on a chair/couch</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While sitting on the floor')}>While sitting on the floor</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While standing')}>While standing</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While walking')}>While walking</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While sleeping/resting')}>While sleeping/resting</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While bending/stooping')}>While bending/stooping</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While lifting weights')}>While lifting weights</button>
                            <button onClick={() => handleNext('L020702', 'L020701', 'While doing exercises/working out')}>While doing exercises/working out</button>
                            <button onClick={() => handleNext('L020702', 'L020701', "Pain doesn't reduce")}>Pain doesn't reduce</button>
                        </div>
                    </div>
                );
            case 'L020702':
                return (
                    <div className="question">
                        <p>How long does it take for the pain to reduce?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020801', 'L020702', 'Immediately, i.e., within 10 mins')}>Immediately, i.e., within 10 mins</button>
                            <button onClick={() => handleNext('L020801', 'L020702', 'After a few minutes, i.e., 10-30 mins')}>After a few minutes, i.e., 10-30 mins</button>
                            <button onClick={() => handleNext('L020801', 'L020702', 'After a while, i.e., after 30 minutes')}>After a while, i.e., after 30 minutes</button>
                        </div>
                    </div>
                );
            case 'L020801':
                return (
                    <div className="question">
                        <p>Any treatment undertaken in the past?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L020802', 'L020801', 'Applied pain relief gel/balm/spray')}>Applied pain relief gel/balm/spray</button>
                            <button onClick={() => handleNext('L020802', 'L020801', 'Taken Medications under specialist supervision')}>Taken Medications under specialist supervision</button>
                            <button onClick={() => handleNext('L020802', 'L020801', 'Taken Physiotherapy/TENS/IFT/TRACTION')}>Taken Physiotherapy/TENS/IFT/TRACTION</button>
                            <button onClick={() => handleNext('L020802', 'L020801', 'Done home exercises by checking online videos')}>Done home exercises by checking online videos</button>
                            <button onClick={() => handleNext('L020802', 'L020801', 'Simply took bed rest without taking any medicine or rehabilitation')}>Simply took bed rest without taking any medicine or rehabilitation</button>
                            <button onClick={() => handleNext('L020802', 'L020801', 'Underwent ayurveda treatment')}>Underwent ayurveda treatment</button>
                            <button onClick={() => handleNext('END', 'L020801', 'Not undertaken any treatment/medication')}>Not undertaken any treatment/medication</button>
                        </div>
                    </div>
                );
            case 'L020802':
                return (
                    <div className="question">
                        <p>Did the previous treatment help?</p>
                        <div className="options">
                            <button onClick={() => handleNext('END', 'L020802', 'The pain instead increased')}>The pain instead increased</button>
                            <button onClick={() => handleNext('END', 'L020802', 'There was no change in pain')}>There was no change in pain</button>
                            <button onClick={() => handleNext('END', 'L020802', 'It reduced my pain intensity but slight pain is still there')}>It reduced my pain intensity but slight pain is still there</button>
                            <button onClick={() => handleNext('END', 'L020802', 'It gave me temporary relief at that time but the pain has relapsed')}>It gave me temporary relief at that time but the pain has relapsed</button>
                            <button onClick={() => handleNext('END', 'L020802', 'I was well for a few months and the pain relapsed only recently again')}>I was well for a few months and the pain relapsed only recently again</button>
                        </div>
                    </div>
                );
            case 'END':
                return (
                    <div className="question">
                        <h3>Level 2 Assessment Summary</h3>
                        <ul className="summary">
                            {Object.entries(answers).map(([question, answer]) => (
                                <li key={question}>{question}: {answer}</li>
                            ))}
                        </ul>
                        <p>Thank you for responding to the questions. Your level 2 assessment is complete!</p>
                        <button className="previous-button" onClick={handleComplete}>Complete Assessment</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="assessment-container">
            {renderQuestion()}
            {step !== 'END' && step !== 'L020101' && <button className="previous-button" onClick={handlePrevious}>Previous</button>}
        </div>
    );
};

export default LevelTwoAssessment;
