import React, { useState, useEffect } from 'react';
import QuestionBox from './QuestionBox';
import OptionsBox from './OptionsBox';
import NavigationButtons from './NavigationButtons';
import { calculateBMI, healStories, factMessages } from './helpers';
import './style/AssesHome.css';

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
                <QuestionBox questionText={`As we create ${profileName}'s virtual care file, please help us with ${profileName}'s approximate height?`}>
                  <input
                    type="range"
                    min="4"
                    max="7"
                    step="0.1"
                    value={height}
                    onChange={(e) => handleSliderChange(e, 'height')}
                    className="slider"
                  />
                  <p>{height} ft</p>
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext('L010400', 'L010300', height)}
                  />
                </QuestionBox>
              );
            case 'L010400':
              return (
                <QuestionBox questionText={`And what would be ${profileName}'s approximate weight?`}>
                  <input
                    type="range"
                    min="40"
                    max="90"
                    step="1"
                    value={weight}
                    onChange={(e) => handleSliderChange(e, 'weight')}
                    className="slider"
                  />
                  <p>{weight} kgs</p>
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={handleBMI}
                  />
                </QuestionBox>
              );
            case 'BMI_RESULT':
              return (
                <QuestionBox questionText={`Your BMI is: ${bmi}`}>
                  <p>{bmi < 18.5 ? healStories.BMI.underweight : (bmi <= 24.9 ? healStories.BMI.normal : healStories.BMI.overweight)}</p>
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext('L010501', 'BMI', bmi)}
                  />
                </QuestionBox>
              );
            case 'L010501':
              return (
                <QuestionBox questionText="If you are undergoing pain in one or more areas, please select a location that pains or bothers you the most.">
                  <OptionsBox
                    options={['Neck', 'Shoulder', 'arm above elbow', 'arm below elbow', 'Lower Back', 'Upper Back', 'Hips', 'Thigh above knee', 'Leg below knee', 'Ankle', 'Other Pain', 'No Pain']}
                    onSelectOption={(option) => handleNext(option === 'No Pain' ? 'SUMMARY' : 'L010502', 'L010501', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L010502':
              return (
                <QuestionBox questionText="Please select all other pain locations, if any.">
                  <OptionsBox
                    options={['Neck', 'Shoulder', 'arm above elbow', 'arm below elbow', 'Lower Back', 'Upper Back', 'Hips', 'Thigh above knee', 'Leg below knee', 'Ankle', 'Other Pain', 'No Pain']}
                    onSelectOption={handleMultiSelectChange}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(multiSelectAnswers.includes('No Pain') ? 'SUMMARY' : 'L010600', 'L010502', multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L010600':
              return (
                <QuestionBox questionText="How would you best describe your pain?">
                  <OptionsBox
                    options={['Mild pain that bothers occasionally', 'Pain that comes and goes in multiple episodes with brief spells of no pain between two pain episodes', 'Moderate pain that bothers daily but can go about with daily routine', 'Severe pain that restricts daily routine and requires me to rest', 'Crippling pain that has made me bed-ridden']}
                    onSelectOption={(option) => handleNext('L010700', 'L010600', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L010700':
              return (
                <QuestionBox questionText="If you were to rate your pain on a scale of 0-10, with 10 implying unbearable pain and 0 implying no pain, what pain rating will you give?">
                  <OptionsBox
                    options={[...Array(11).keys()]}
                    onSelectOption={(option) => handleNext(option === 0 ? 'SUMMARY' : 'FACT_PAGE', 'L010700', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L010800':
              return (
                <QuestionBox questionText="We now need to understand how the pain feels at a given point:">
                  <OptionsBox
                    options={['Constant', 'Intermittent']}
                    onSelectOption={(option) => handleNext('L010900', 'L010800', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L010801':
              return (
                <QuestionBox questionText="Does your pain change during the following activities?">
                  <OptionsBox
                    options={['Pain increases during any movement like bending forward/backwards, walking, etc.', 'Pain increases in sedentary postures like continuous sitting/standing/lying down', 'There is no relief even after a change in posture/activity']}
                    onSelectOption={(option) => handleNext('L010900', 'L010801', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L010900':
              return (
                <QuestionBox questionText="Alongside pain, have you encountered any of the following recently?">
                  <OptionsBox
                    options={['Dizzy', 'Tingling', 'Numbness', 'Weakness', 'Loss of Balance', 'None']}
                    onSelectOption={handleMultiSelectChange}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext('FACT_PAGE', 'L010900', multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011000':
              return (
                <QuestionBox questionText="In certain rare conditions, the pain may also arise from previous medical histories. How is the current pain since it started?">
                  <OptionsBox
                    options={['Worsening', 'Much better than before', 'Same as before']}
                    onSelectOption={(option) => handleNext('L011100', 'L011000', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011100':
              return (
                <QuestionBox questionText="Please choose if you have been detected with any of the following medical conditions?">
                  <OptionsBox
                    options={['Pregnancy', 'Recent Surgery', 'Active Fractures', 'History of Cancer', 'History of Tuberculosis', 'Loss of Appetite', 'Severe Night Pain', 'High-grade fever', 'Shortness of Breath', 'History of Neurological Conditions', 'None']}
                    onSelectOption={handleMultiSelectChange}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => {
                      handleNext('FOLLOW_UP', 'L011100', multiSelectAnswers);
                      handleFollowUpQuestions(multiSelectAnswers);
                    }}
                  />
                </QuestionBox>
              );
            case 'L011101':
              return (
                <QuestionBox questionText="Please help us understand the current stage of pregnancy.">
                  <OptionsBox
                    options={['Currently pregnant', 'Child is 1 year old']}
                    onSelectOption={(option) => handleNextFollowUp('L011101', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011110':
              return (
                <QuestionBox questionText="Please help us understand the surgery timelines.">
                  <OptionsBox
                    options={['Surgery was done in the last year', 'Surgery was completed before last year']}
                    onSelectOption={(option) => handleNextFollowUp('L011110', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011120':
              return (
                <QuestionBox questionText="Is the active fracture in the spine?">
                  <OptionsBox
                    options={['Yes', 'No']}
                    onSelectOption={(option) => handleNextFollowUp('L011120', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011130':
              return (
                <QuestionBox questionText="Please help us understand the cancer timelines.">
                  <OptionsBox
                    options={['Active for less than a year', 'Active for more than a year']}
                    onSelectOption={(option) => handleNextFollowUp('L011130', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011140':
              return (
                <QuestionBox questionText="Please help us understand the tuberculosis timelines.">
                  <OptionsBox
                    options={['Detected in the last year', 'Detected before the previous year']}
                    onSelectOption={(option) => handleNextFollowUp('L011140', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011150':
              return (
                <QuestionBox questionText="How many meals are you having daily?">
                  <OptionsBox
                    options={['1 meal or less in a day', 'Around 2 meals in a day', 'Around 2-3 meals in a day']}
                    onSelectOption={(option) => handleNextFollowUp('L011150', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011160':
              return (
                <QuestionBox questionText="Does the pain force you to get out of bed and move around?">
                  <OptionsBox
                    options={['Yes', 'No']}
                    onSelectOption={(option) => handleNextFollowUp('L011160', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011170':
              return (
                <QuestionBox questionText="Please help us with the highest body temperature reading on your thermometer.">
                  <OptionsBox
                    options={['Less than 98 degree', '98-101 degree', 'More than 101 degree']}
                    onSelectOption={(option) => handleNextFollowUp('L011170', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011180':
              return (
                <QuestionBox questionText="When do you specifically encounter shortness of breath?">
                  <OptionsBox
                    options={['While doing some rigorous activities', 'Even while at rest']}
                    onSelectOption={(option) => handleNextFollowUp('L011180', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
              );
            case 'L011190':
              return (
                <QuestionBox questionText="Please help us understand your current status with your neurological condition.">
                  <OptionsBox
                    options={['It has just been a year, but still mobile and able to move around', 'The condition has been worsening and has made you bedridden']}
                    onSelectOption={(option) => handleNextFollowUp('L011190', option)}
                  />
                  <NavigationButtons
                    onPrevious={handlePrevious}
                    onNext={() => handleNext(step, step, multiSelectAnswers)}
                  />
                </QuestionBox>
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
                  <p className="typing-text">{healStories.summary}</p>
                  <NavigationButtons
                    onNext={() => onContinue(answers)}
                    disableNext={false}
                  />
                </div>
              );
            default:
              return null;
          }
        })()}
        {step !== 'SUMMARY' && !showFactPage && (
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={() => handleNext(step, step, multiSelectAnswers)}
            disableNext={false}
          />
        )}
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
