import React, { useState } from 'react';
import "./AssessHome.css";

const questions = [
    {
        code: 'L010100',
        question: 'Whom are you taking this assessment for?',
        options: [
            { value: 'A', text: 'Myself' },
            { value: 'B', text: 'A family member/friend/relative' }
        ],
        next: (response) => response === 'A' ? 'L010300' : 'L010200'
    },
    {
        code: 'L010200',
        condition: 'L010100B',
        question: 'We want to know you better. Please help us with the identity information of the assessee for whom this assessment is being taken.',
        type: 'identity',
        fields: ['name', 'age', 'gender', 'occupation', 'jobType', 'mobile'],
        next: 'L010300'
    },
    {
        code: 'L010300',
        question: 'Please help us with the approximate height?',
        type: 'dropdown',
        options: Array.from({ length: 181 }, (_, i) => (100 + i) + ' cm'), // 100 cm to 280 cm
        next: 'L010400'
    },
    {
        code: 'L010400',
        question: 'Please help us with the approximate weight?',
        type: 'dropdown',
        options: Array.from({ length: 121 }, (_, i) => (30 + i) + ' kgs'), // 30 kg to 150 kg
        next: 'BMI_CALCULATION'
    },
    {
        code: 'L010500',
        question: 'If you are undergoing pain in one or more areas, please select a location that pains or bothers you the most.',
        options: [
            { value: 'A', text: 'Lower Back' },
            { value: 'B', text: 'Upper Back' },
            { value: 'C', text: 'Neck' },
            { value: 'D', text: 'Hips' },
            { value: 'E', text: 'Knee' },
            { value: 'F', text: 'Ankle' },
            { value: 'G', text: 'Shoulder' },
            { value: 'H', text: 'Other Joints' },
            { value: 'I', text: 'Other Pain' },
            { value: 'J', text: 'No Pain' }
        ],
        next: (response) => response === 'J' ? 'SUMMARY' : 'L010600'
    },
    {
        code: 'L010600',
        condition: 'L010500A || L010500B || L010500C || L010500D || L010500E || L010500F || L010500G || L010500H',
        question: 'How would you best describe your pain?',
        options: [
            { value: 'A', text: 'Mild pain that bothers occasionally' },
            { value: 'B', text: 'Pain that comes and goes in multiple episodes' },
            { value: 'C', text: 'Moderate pain that bothers daily' },
            { value: 'D', text: 'Severe pain that restricts daily routine' },
            { value: 'E', text: 'Crippling pain that has made me bed-ridden' }
        ],
        next: 'L010700'
    },
    {
        code: 'L010700',
        question: 'If you were to rate your pain on a scale of 0-10 with 10 implying unbearable pain and 0 implying no pain, what pain rating will you give?',
        type: 'scale',
        range: { min: 0, max: 10 },
        next: (response) => response === 0 ? 'SUMMARY' : 'L010800'
    },
    {
        code: 'L010800',
        question: 'We now need to understand how the pain feels at a given point.',
        options: [
            { value: 'A', text: 'Constant (persistent pain in certain postures like sitting, standing, lying down, etc. that stays for a long time)' },
            { value: 'B', text: 'Intermittent (pain that keeps coming and going)' }
        ],
        next: (response) => response === 'A' ? 'L010900' : 'L010801'
    },
    {
        code: 'L010801',
        question: 'Intermittent pain is a symptom of a likely mechanical condition and is associated with better prognosis. Does your pain change while performing any of the following activities?',
        options: [
            { value: 'A', text: 'Pain increases during any movement like bending forward/backward, walking, etc.' },
            { value: 'B', text: 'Pain increases in sedentary postures like continuous sitting/standing/lying down' },
            { value: 'C', text: 'No relief even after change in posture/activity' }
        ],
        next: 'L010900'
    },
    {
        code: 'L010900',
        question: 'Alongside pain, have you encountered any of the following in recent times?',
        options: [
            { value: 'A', text: 'Dizzy' },
            { value: 'B', text: 'Tingling' },
            { value: 'C', text: 'Numbness' },
            { value: 'D', text: 'Weakness that leads to difficulty in lifting leg getting a grip or performing fine motor activities like brushing/cutting vegetables/buttoning shirt/counting notes/etc.' },
            { value: 'E', text: 'Loss of Appetite' },
            { value: 'F', text: 'Severe Night Pain' },
            { value: 'G', text: 'Loss of Balance' },
            { value: 'H', text: 'High-grade fever' },
            { value: 'I', text: 'Shortness of Breath' },
            { value: 'J', text: 'None' }
        ],
        next: 'L011000'
    },
    {
        code: 'L011000',
        question: 'How is the current pain since it started?',
        options: [
            { value: 'A', text: 'Worsening' },
            { value: 'B', text: 'Much better than before' },
            { value: 'C', text: 'Same as before' }
        ],
        next: 'L011100'
    },
    {
        code: 'L011100',
        question: 'Please choose if you have been detected with any of the following medical conditions?',
        options: [
            { value: 'A', text: 'Pregnancy' },
            { value: 'B', text: 'Recent Surgery' },
            { value: 'C', text: 'Active Fractures' },
            { value: 'D', text: 'Cancer' },
            { value: 'E', text: 'Tuberculosis' },
            { value: 'F', text: 'None' }
        ]
    }
];

const AssessHome = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [bmi, setBmi] = useState(null);
    const [summaryTitle, setSummaryTitle] = useState('Myself');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (option) => {
        const question = questions[step];
        const newFormData = { ...formData, [question.code]: option };
        setFormData(newFormData);
        if (question.code === 'L010100') {
            setSummaryTitle(option === 'A' ? 'Myself' : formData.name || 'Family Member/Friend');
        }
        nextStep(option);
    };

    const nextStep = (response) => {
        const question = questions[step];
        let nextQuestionCode;

        if (question.next) {
            nextQuestionCode = typeof question.next === 'function' ? question.next(response) : question.next;
        } else if (question.condition) {
            const conditionMet = evalCondition(question.condition, response);
            if (!conditionMet) {
                nextQuestionCode = 'L010900'; // Default to mandatory question
            }
        }

        if (nextQuestionCode === 'BMI_CALCULATION') {
            calculateBMI();
            nextQuestionCode = 'BMI_RESULT';
        }

        const nextQuestionIndex = questions.findIndex(q => q.code === nextQuestionCode);
        if (nextQuestionIndex !== -1) {
            setStep(nextQuestionIndex);
        } else {
            setStep(questions.length); // End of questions, show summary
        }
    };

    const evalCondition = (condition, response) => {
        const code = questions[step].code;
        return condition.includes(code + response);
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const calculateBMI = () => {
        const height = parseFloat(formData.L010300);
        const weight = parseFloat(formData.L010400);
        if (!isNaN(height) && !isNaN(weight) && height > 0) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
        } else {
            setBmi('Invalid input');
        }
    };

    const renderQuestion = () => {
        const question = questions[step];
        if (!question) return null; // Guard against undefined question

        if (question.options && !question.type) {
            return (
                <div>
                    <h2>{question.question}</h2>
                    {question.options.map((option, index) => (
                        <button key={index} onClick={() => handleOptionChange(option.value)}>
                            {option.text}
                        </button>
                    ))}
                </div>
            );
        }

        if (question.type === 'identity') {
            return (
                <div>
                    <h2>{question.question}</h2>
                    <form>
                        {question.fields.map((field, index) => (
                            <label key={index}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field] || ''}
                                    onChange={handleChange}
                                />
                            </label>
                        ))}
                        <button type="button" onClick={() => nextStep()}>Continue</button>
                    </form>
                </div>
            );
        }

        if (question.type === 'dropdown') {
            return (
                <div>
                    <h2>{question.question}</h2>
                    <select name={question.code} value={formData[question.code] || ''} onChange={handleChange}>
                        <option value="" disabled>Select an option</option>
                        {question.options.map((option, index) => (
                            <option key={index} value={option.split(' ')[0]}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={() => nextStep(formData[question.code])}>Continue</button>
                </div>
            );
        }

        if (question.type === 'scale') {
            return (
                <div>
                    <h2>{question.question}</h2>
                    <input
                        type="number"
                        min={question.range.min}
                        max={question.range.max}
                        name={question.code}
                        value={formData[question.code] || question.range.min}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={() => nextStep(formData[question.code])}>Continue</button>
                </div>
            );
        }
    };

    const renderBMIResult = () => {
        return (
            <div>
                <h2>Your Body Mass Index (BMI) is: {bmi}</h2>
                <button type="button" onClick={prevStep}>Previous</button>
                <button type="button" onClick={() => nextStep('L010500')}>Continue</button>
            </div>
        );
    };

    const renderSummary = () => {
        return (
            <div>
                <h2>Summary for {summaryTitle}</h2>
                {Object.entries(formData).map(([key, value]) => (
                    <p key={key}>{key}: {value}</p>
                ))}
                {bmi && <p>BMI: {bmi}</p>}
            </div>
        );
    };

    return (
        <div className="assessment-container">
            {step === 'SUMMARY' ? renderSummary() : step === 'BMI_RESULT' ? renderBMIResult() : renderQuestion()}
            {step > 0 && step !== 'SUMMARY' && step !== 'BMI_RESULT' && <button onClick={prevStep}>Previous</button>}
        </div>
    );
};

export default AssessHome;
