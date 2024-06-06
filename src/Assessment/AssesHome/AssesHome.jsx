import React, { useState } from 'react';
import './AssesHome.css';

// Helper function to calculate BMI
const calculateBMI = (height, weight) => {
    const heightInMeters = height * 0.3048; // Convert feet to meters
    return (weight / (heightInMeters ** 2)).toFixed(1);
};

// Heal Stories
const healStories = {
    L010100: "It's important to specify who the assessment is for to ensure accurate context in evaluation.",
    L010200: "Collecting detailed identity information helps in providing personalized healthcare advice.",
    L010300: "Height can influence health outcomes and diagnostic processes.",
    L010400: "Weight is crucial in understanding health, particularly for musculoskeletal issues.",
    BMI: {
        normal: "Your BMI is within the normal range. Keep maintaining a healthy lifestyle!",
        overweight: "Your BMI is high. Consider consulting a healthcare provider for advice on weight management.",
        underweight: "Your BMI is low. It might be beneficial to talk to a healthcare provider about gaining weight healthily."
    },
    L010500: "Understanding pain location helps in diagnosing and targeting treatments effectively.",
    L010600: "Different pain intensities impact daily life in various ways, influencing treatment approaches.",
    L010700: "The pain scale helps in making informed treatment decisions based on pain severity.",
    L010800: "Constant vs intermittent pain can indicate different underlying causes.",
    L010801: "Activities affecting pain can provide clues about the nature and cause of the pain.",
    L010900: "These symptoms can indicate broader health concerns that might need immediate attention.",
    L011000: "Previous medical conditions can influence current pain experiences significantly.",
    L011100: "Understanding past medical history is crucial for accurate diagnosis and treatment."
};

// Main Assessment Component
const AssesHome = () => {
    const [step, setStep] = useState('L010100');
    const [answers, setAnswers] = useState({});
    const [height, setHeight] = useState(5.0);
    const [weight, setWeight] = useState(40);
    const [bmi, setBMI] = useState(null);

    const handleNext = (nextStep, answer) => {
        setAnswers(prev => ({ ...prev, [step]: answer }));
        setStep(nextStep);
    };

    const handlePrevious = (prevStep) => {
        setStep(prevStep);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (e, type) => {
        const value = parseFloat(e.target.value);
        if (type === 'height') setHeight(value);
        if (type === 'weight') setWeight(value);
    };

    const handleBMI = () => {
        const calculatedBMI = calculateBMI(height, weight);
        setBMI(calculatedBMI);
        handleNext('BMI_RESULT', `BMI: ${calculatedBMI}`);
    };

    const renderQuestion = () => {
        switch (step) {
            case 'L010100':
                return (
                    <div className="question">
                        <p>Whom are you taking this assessment for?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L010300', 'Myself')}>Myself</button>
                            <button onClick={() => handleNext('L010200', 'A family member/friend')}>A family member/friend</button>
                        </div>
                        <p>{healStories['L010100']}</p>
                    </div>
                );
            case 'L010200':
                return (
                    <div className="question">
                        <p>Please help us with the identity information of the assessee:</p>
                        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                        <input type="number" name="age" placeholder="Age" onChange={handleInputChange} />
                        <input type="text" name="gender" placeholder="Gender" onChange={handleInputChange} />
                        <input type="text" name="employment" placeholder="Employment" onChange={handleInputChange} />
                        <input type="text" name="jobType" placeholder="Job Type" onChange={handleInputChange} />
                        <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleInputChange} />
                        <div className="options">
                            <button onClick={() => handleNext('L010300', 'Identity Information')}>Next</button>
                            <button onClick={() => handlePrevious('L010100')}>Previous</button>
                        </div>
                        <p>{healStories['L010200']}</p>
                    </div>
                );
            case 'L010300':
                return (
                    <div className="question">
                        <p>As we create virtual care file, please help us with the approximate height?:</p>
                        <input type="range" min="4" max="7" step="0.1" value={height} onChange={(e) => handleSliderChange(e, 'height')} />
                        <p>{height} ft</p>
                        <div className="options">
                            <button onClick={() => handleNext('L010400', `Height: ${height} ft`)}>Next</button>
                            <button onClick={() => handlePrevious(step === 'L010100' ? 'L010100' : 'L010200')}>Previous</button>
                        </div>
                        <p>{healStories['L010300']}</p>
                    </div>
                );
            case 'L010400':
                return (
                    <div className="question">
                        <p>And what would be the approximate weight:</p>
                        <input type="range" min="40" max="90" step="1" value={weight} onChange={(e) => handleSliderChange(e, 'weight')} />
                        <p>{weight} kgs</p>
                        <div className="options">
                            <button onClick={() => handleBMI()}>Next</button>
                            <button onClick={() => handlePrevious('L010300')}>Previous</button>
                        </div>
                        <p>{healStories['L010400']}</p>
                    </div>
                );
            case 'BMI_RESULT':
                return (
                    <div className="question">
                        <p>Your BMI is: {bmi}</p>
                        <p>{bmi < 18.5 ? healStories.BMI.underweight : (bmi <= 24.9 ? healStories.BMI.normal : healStories.BMI.overweight)}</p>
                        <div className="options">
                            <button onClick={() => handleNext('L010500', `BMI: ${bmi}`)}>Next</button>
                            <button onClick={() => handlePrevious('L010400')}>Previous</button>
                        </div>
                    </div>
                );
            case 'L010500':
                return (
                    <div className="question">
                        <p>If you are undergoing pain in one or more areas, please select a location that pains or bothers you the most:</p>
                        <div className="options">
                            {['Lower Back', 'Upper Back', 'Neck', 'Hips', 'Knee', 'Ankle', 'Shoulder', 'Other Joints (Wrist/ finger/ toes/ nasal/ jaw)', 'Other Pain', 'No Pain'].map(option => (
                                <button key={option} onClick={() => handleNext(option === 'No Pain' ? 'END' : 'L010600', option)}>{option}</button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('BMI_RESULT')}>Previous</button>
                        </div>
                        <p>{healStories['L010500']}</p>
                    </div>
                );
            case 'L010600':
                return (
                    <div className="question">
                        <p>How would you best describe your pain?</p>
                        <div className="options">
                            {['Mild pain that bothers me occasionally', 'Pain that comes and goes in multiple episodes with brief spells of no pain between two pain episodes', 'Moderate pain that bothers me daily, but I can go about with my daily routine', 'Severe pain that restricts my daily routine requires me to rest', 'Crippling pain that has made me bed-ridden'].map(option => (
                                <button key={option} onClick={() => handleNext('L010700', option)}>{option}</button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L010500')}>Previous</button>
                        </div>
                        <p>{healStories['L010600']}</p>
                    </div>
                );
            case 'L010700':
                return (
                    <div className="question">
                        <p>If you were to rate your pain on a scale of 0-10 with 10 implying unbearable pain and 0 implying no pain, what pain rating will you give:</p>
                        <div className="options">
                            {[...Array(11).keys()].map(option => (
                                <button key={option} onClick={() => handleNext(option === 0 ? 'END' : 'L010800', option)}>{option}</button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L010600')}>Previous</button>
                        </div>
                        <p>{healStories['L010700']}</p>
                    </div>
                );
            case 'L010800':
                return (
                    <div className="question">
                        <p>We now need to understand how the pain feels at a given point :</p>
                        <div className="options">
                            <button onClick={() => handleNext('L010900', 'Constant')}>Constant <i>(persistent pain in certain postures like sitting,standing, lying down, etc. that stays for a longtime)</i></button>
                            <button onClick={() => handleNext('L010801', 'Intermittent')}>Intermittent <i>(pain that keeps coming and going)</i></button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L010700')}>Previous</button>
                        </div>
                        <p>{healStories['L010800']}</p>
                    </div>
                );
            case 'L010801':
                return (
                    <div className="question">
                        <p>Does your pain change while performing any specific activities?</p>
                        <div className="options">
                            <button onClick={() => handleNext('L010900', 'Yes')}>Pain increases during any movement like bending forward/ backward, walking, etc</button>
                            <button onClick={() => handleNext('L010900', 'Yes')}>Pain increases in sedentary postures like continuous sitting/ standing/ lying down</button>
                            <button onClick={() => handleNext('L010900', 'No')}>No relief even after change in posture/ activity</button>
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L010800')}>Previous</button>
                        </div>
                        <p>{healStories['L010801']}</p>
                    </div>
                );
            case 'L010900':
                return (
                    <div className="question">
                        <p>Alongside pain, have you encountered any of the following in recent times :</p>
                        <div className="options">
                            {['Dizzy', 'Tingling', 'Numbness', 'Weakness', 'Loss of Appetite', 'Severe Night Pain', 'Loss of Balance', 'High-grade fever', 'Shortness of Breath', 'None'].map(option => (
                                <button key={option} onClick={() => handleNext('L011000', option)}>{option}</button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L010800')}>Previous</button>
                        </div>
                        <p>{healStories['L010900']}</p>
                    </div>
                );
            case 'L011000':
                return (
                    <div className="question">
                        <p>In certain rare conditions, the pain may also arise from previous medical histories. How is the current pain since it started?</p>
                        <div className="options">
                            {['Worsening', 'Much better than before', 'Same as before'].map(option => (
                                <button key={option} onClick={() => handleNext('L011100', option)}>{option}</button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L010900')}>Previous</button>
                        </div>
                        <p>{healStories['L011000']}</p>
                    </div>
                );
            case 'L011100':
                return (
                    <div className="question">
                        <p>Please choose if you have been detected with any of the following medical conditions?</p>
                        <div className="options">
                            {['Pregnancy', 'Recent Surgery', 'Active Fractures', 'Cancer', 'Tuberculosis', 'None'].map(option => (
                                <button key={option} onClick={() => handleNext('END', option)}>{option}</button>
                            ))}
                        </div>
                        <div className="options">
                            <button onClick={() => handlePrevious('L011000')}>Previous</button>
                        </div>
                        <p>{healStories['L011100']}</p>
                    </div>
                );
            case 'END':
                return (
                    <div className="question">
                        <h3>Assessment Summary</h3>
                        <ul className="summary">
                            {Object.entries(answers).map(([question, answer]) => (
                                <li key={question}>{question}: {answer}</li>
                            ))}
                        </ul>
                        <p>Thank you for patiently responding to all the questions. We now have a provisional diagnosis for your condition.!</p>
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

export default AssesHome;
