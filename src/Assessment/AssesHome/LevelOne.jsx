import React, { useState } from 'react';

const LevelOne = ({ onNext }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers({ ...answers, [name]: value });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSliderChange = (e, name) => {
        setAnswers({ ...answers, [name]: e.target.value });
    };

    const handleEndAssessment = () => {
        console.log("Summary:", answers);
        // Display the summary or trigger any other logic
        onNext();
    };

    return (
        <div>
            <h1>Level One Assessment</h1>
            {step === 0 && (
                <div>
                    <p>Whom are you taking this assessment for?</p>
                    <input type="radio" name="L010100" value="A" onChange={handleInputChange} /> Myself<br />
                    <input type="radio" name="L010100" value="B" onChange={handleInputChange} /> A family member/friend<br />
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 1 && answers.L010100 === 'B' && (
                <div>
                    <p>Please help us with the identity information of the assessee.</p>
                    <input type="text" name="L010200_name" placeholder="Name" onChange={handleInputChange} /><br />
                    <input type="number" name="L010200_age" placeholder="Age" onChange={handleInputChange} /><br />
                    <input type="text" name="L010200_gender" placeholder="Gender" onChange={handleInputChange} /><br />
                    <input type="text" name="L010200_employment" placeholder="Employment" onChange={handleInputChange} /><br />
                    <input type="text" name="L010200_jobType" placeholder="Job Type" onChange={handleInputChange} /><br />
                    <input type="text" name="L010200_mobile" placeholder="Mobile Number" onChange={handleInputChange} /><br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {((step === 1 && answers.L010100 === 'A') || step === 2) && (
                <div>
                    <p>Please help us with the approximate height.</p>
                    <input type="range" min="4" max="7" step="0.1" name="L010300_height" value={answers.L010300_height || 4} onChange={(e) => handleSliderChange(e, 'L010300_height')} />
                    <span>{answers.L010300_height || 4} ft</span>
                    <br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <p>What would be the approximate weight?</p>
                    <input type="range" min="40" max="90" step="1" name="L010400_weight" value={answers.L010400_weight || 40} onChange={(e) => handleSliderChange(e, 'L010400_weight')} />
                    <span>{answers.L010400_weight || 40} kgs</span>
                    <br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 4 && (
                <div>
                    <p>BMI Calculation: {((answers.L010400_weight || 40) / Math.pow((answers.L010300_height || 4), 2)).toFixed(2)}</p>
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 5 && (
                <div>
                    <p>Choose the main pain location or select 'No Pain'.</p>
                    <input type="checkbox" name="L010500_pain" value="Lower Back" onChange={handleInputChange} /> Lower Back<br />
                    <input type="checkbox" name="L010500_pain" value="Upper Back" onChange={handleInputChange} /> Upper Back<br />
                    <input type="checkbox" name="L010500_pain" value="Neck" onChange={handleInputChange} /> Neck<br />
                    <input type="checkbox" name="L010500_pain" value="Hips" onChange={handleInputChange} /> Hips<br />
                    <input type="checkbox" name="L010500_pain" value="Knee" onChange={handleInputChange} /> Knee<br />
                    <input type="checkbox" name="L010500_pain" value="Ankle" onChange={handleInputChange} /> Ankle<br />
                    <input type="checkbox" name="L010500_pain" value="Shoulder" onChange={handleInputChange} /> Shoulder<br />
                    <input type="checkbox" name="L010500_pain" value="Other Joints" onChange={handleInputChange} /> Other Joints (Wrist/ finger/ toes/ nasal/ jaw)<br />
                    <input type="checkbox" name="L010500_pain" value="Other Pain" onChange={handleInputChange} /> Other Pain<br />
                    <input type="checkbox" name="L010500_pain" value="No Pain" onChange={handleInputChange} /> No Pain<br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 6 && (
                <div>
                    <p>How would you best describe your pain?</p>
                    <input type="radio" name="L010600_painDescription" value="Mild pain that bothers me occasionally" onChange={handleInputChange} /> Mild pain that bothers me occasionally<br />
                    <input type="radio" name="L010600_painDescription" value="Pain that comes and goes in multiple episodes" onChange={handleInputChange} /> Pain that comes and goes in multiple episodes<br />
                    <input type="radio" name="L010600_painDescription" value="Moderate pain that bothers me daily, but I can go about with my daily routine" onChange={handleInputChange} /> Moderate pain that bothers me daily, but I can go about with my daily routine<br />
                    <input type="radio" name="L010600_painDescription" value="Severe pain that restricts my daily routine requires me to rest" onChange={handleInputChange} /> Severe pain that restricts my daily routine requires me to rest<br />
                    <input type="radio" name="L010600_painDescription" value="Crippling pain that has made me bed-ridden" onChange={handleInputChange} /> Crippling pain that has made me bed-ridden<br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 7 && (
                <div>
                    <p>Rate the pain on a scale from 0-10.</p>
                    <input type="range" min="0" max="10" step="1" name="L010700_painScale" value={answers.L010700_painScale || 0} onChange={(e) => handleSliderChange(e, 'L010700_painScale')} />
                    <span>{answers.L010700_painScale || 0}</span>
                    <br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 8 && (
                <div>
                    <p>How does the pain feel at a given point?</p>
                    <input type="radio" name="L010800_painFeel" value="Constant" onChange={handleInputChange} /> Constant<br />
                    <input type="radio" name="L010800_painFeel" value="Intermittent" onChange={handleInputChange} /> Intermittent<br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 9 && (
                <div>
                    <p>Does your pain change while performing any specific activities?</p>
                    <textarea name="L010801_painChange" onChange={handleInputChange} placeholder="Describe how activities affect your pain"></textarea>
                    <br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 10 && (
                <div>
                    <p>Check for other symptoms that may indicate other health issues.</p>
                    <input type="checkbox" name="L010900_symptoms" value="Dizzy" onChange={handleInputChange} /> Dizzy<br />
                    <input type="checkbox" name="L010900_symptoms" value="Tingling" onChange={handleInputChange} /> Tingling<br />
                    <input type="checkbox" name="L010900_symptoms" value="Numbness" onChange={handleInputChange} /> Numbness<br />
                    <input type="checkbox" name="L010900_symptoms" value="Weakness" onChange={handleInputChange} /> Weakness<br />
                    <input type="checkbox" name="L010900_symptoms" value="Loss of Appetite" onChange={handleInputChange} /> Loss of Appetite<br />
                    <input type="checkbox" name="L010900_symptoms" value="Severe Night Pain" onChange={handleInputChange} /> Severe Night Pain<br />
                    <input type="checkbox" name="L010900_symptoms" value="Loss of Balance" onChange={handleInputChange} /> Loss of Balance<br />
                    <input type="checkbox" name="L010900_symptoms" value="High-grade fever" onChange={handleInputChange} /> High-grade fever<br />
                    <input type="checkbox" name="L010900_symptoms" value="Shortness of Breath" onChange={handleInputChange} /> Shortness of Breath<br />
                    <input type="checkbox" name="L010900_symptoms" value="None" onChange={handleInputChange} /> None<br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 11 && (
                <div>
                    <p>In certain rare conditions, the pain may also arise from previous medical histories. How is the current pain since it started?</p>
                    <input type="radio" name="L011000_painHistory" value="Worsening" onChange={handleInputChange} /> Worsening<br />
                    <input type="radio" name="L011000_painHistory" value="Much better than before" onChange={handleInputChange} /> Much better than before<br />
                    <input type="radio" name="L011000_painHistory" value="Same as before" onChange={handleInputChange} /> Same as before<br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </div>
            )}
            {step === 12 && (
                <div>
                    <p>Please choose if you have been detected with any of the following medical conditions?</p>
                    <input type="checkbox" name="L011100_conditions" value="Pregnancy" onChange={handleInputChange} /> Pregnancy<br />
                    <input type="checkbox" name="L011100_conditions" value="Recent Surgery" onChange={handleInputChange} /> Recent Surgery<br />
                    <input type="checkbox" name="L011100_conditions" value="Active Fractures" onChange={handleInputChange} /> Active Fractures<br />
                    <input type="checkbox" name="L011100_conditions" value="Cancer" onChange={handleInputChange} /> Cancer<br />
                    <input type="checkbox" name="L011100_conditions" value="Tuberculosis" onChange={handleInputChange} /> Tuberculosis<br />
                    <input type="checkbox" name="L011100_conditions" value="None" onChange={handleInputChange} /> None<br />
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleEndAssessment}>End Assessment</button>
                </div>
            )}
        </div>
    );
}

export default LevelOne;
