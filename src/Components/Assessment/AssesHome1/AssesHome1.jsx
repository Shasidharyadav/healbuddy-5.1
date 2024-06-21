import React, { useState } from 'react';
import "./AssesHome.css";

const AssessHome = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        forWhom: '',
        name: '',
        age: '',
        gender: '',
        occupation: '',
        jobType: '',
        mobile: '',
        height: '',
        weight: ''
    });

    // Function to handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to advance to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Render different components based on the step
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <FirstStep
                        handleChange={handleChange}
                        formData={formData}
                        nextStep={nextStep}
                    />
                );
            case 2:
                return (
                    <SecondStep
                        handleChange={handleChange}
                        formData={formData}
                        nextStep={nextStep}
                    />
                );
            case 3:
                return (
                    <ThirdStep
                        handleChange={handleChange}
                        formData={formData}
                        nextStep={nextStep}
                    />
                );
            case 4:
                return <BMIComponent height={formData.height} weight={formData.weight} />;
            default:
                return <div>Error: Unknown step</div>;
        }
    };

    return (
        <div className="assessment-container">
            {renderStep()}
        </div>
    );
};

// First Step Component
const FirstStep = ({ handleChange, formData, nextStep }) => {
    return (
        <div>
            <h2>Whom are you taking this assessment for?</h2>
            <button onClick={() => { handleChange({ target: { name: 'forWhom', value: 'myself' } }); nextStep(); }}>Myself</button>
            <button onClick={() => { handleChange({ target: { name: 'forWhom', value: 'other' } }); nextStep(); }}>A family member/friend/relative</button>
            <p>WE WANT TO KNOW YOU BETTER</p>
        </div>
    );
};

// Second Step Component
const SecondStep = ({ handleChange, formData, nextStep }) => {
    return (
        <div>
            <h2>Please help us with the identity information of the assessee for whom this assessment is being taken</h2>
            <form>
                <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
                <label>Age: <input type="number" name="age" value={formData.age} onChange={handleChange} /></label>
                <label>Gender: <input type="text" name="gender" value={formData.gender} onChange={handleChange} /></label>
                <label>Occupation: <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} /></label>
                <label>Type/Requirement of job: <input type="text" name="jobType" value={formData.jobType} onChange={handleChange} /></label>
                <label>Mobile number: <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} /></label>
                <button type="button" onClick={nextStep}>Continue</button>
            </form>
            <p>This information is critical in building your care profile</p>
        </div>
    );
};

// Third Step Component
const ThirdStep = ({ handleChange, formData, nextStep }) => {
    return (
        <div>
            <h2>As we create your {formData.forWhom === 'myself' ? 'your' : 'their'} virtual care file, please help us with approximate height and weight</h2>
            <label>Height: <input type="number" name="height" value={formData.height} onChange={handleChange} /></label>
            <label>Weight: <input type="number" name="weight" value={formData.weight} onChange={handleChange} /></label>
            <button type="button" onClick={nextStep}>Continue</button>
            <p>Did you know that a high BMI has been associated in certain cases to increase the risks of musculoskeletal conditions?</p>
        </div>
    );
};

// BMI Component
const BMIComponent = ({ height, weight }) => {
    const calculateBMI = (height, weight) => {
        // convert height from cm to meters and calculate BMI
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    };

    const bmi = calculateBMI(height, weight);

    return (
        <div>
            <h2>Your Body Mass Index (BMI) is: {bmi}</h2>
        </div>
    );
};

export default AssessHome;
