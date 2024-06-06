// questions.js
const questions = [
  {
    id: 'L010100',
    text: 'Whom are you taking this assessment for?',
    options: [
      { key: 'A', text: 'Myself', nextStep: 3 },
      { key: 'B', text: 'A family member/friend', nextStep: 2 }
    ],
    healStory: 'It is important to specify who the assessment is for to tailor the experience and recommendations.'
  },
  {
    id: 'L010200',
    text: 'Please help us with the identity information of the assessee.',
    inputType: 'form',
    nextStep: 3,
    healStory: 'Collecting detailed identity information ensures accurate assessment and personalized care.'
  },
  {
    id: 'L010300',
    text: 'Please help us with the approximate height (in cm).',
    inputType: 'number',
    nextStep: 4,
    healStory: 'Height can influence health outcomes and is crucial for calculating body metrics like BMI.'
  },
  {
    id: 'L010400',
    text: 'What would be the approximate weight (in kg)?',
    inputType: 'number',
    nextStep: 5,
    healStory: 'Understanding weight is essential to assess body mass index and potential health risks.'
  },
  {
    id: 'L010500',
    text: 'Choose the main pain location or select "No Pain".',
    options: [
      { key: 'A', text: 'Lower Back', nextStep: 6 },
      { key: 'B', text: 'Upper Back', nextStep: 6 },
      { key: 'C', text: 'Neck', nextStep: 6 },
      { key: 'D', text: 'Hips', nextStep: 6 },
      { key: 'E', text: 'Knee', nextStep: 6 },
      { key: 'F', text: 'Ankle', nextStep: 6 },
      { key: 'G', text: 'Shoulder', nextStep: 6 },
      { key: 'H', text: 'Other Joints (Wrist/ finger/ toes/ nasel/ jaw)', nextStep: 6 },
      { key: 'I', text: 'No Pain', nextStep: 'summary' }
    ],
    healStory: 'Identifying the location of pain helps diagnose the problem more accurately.'
  },
  {
    id: 'L010600',
    text: 'How would you best describe your pain?',
    options: [
      { key: 'A', text: 'Mild pain that bothers occasionally', nextStep: 7 },
      { key: 'B', text: 'Pain that comes and goes in multiple episodes', nextStep: 7 },
      { key: 'C', text: 'Moderate pain that bothers daily but can go about with daily routine', nextStep: 7 },
      { key: 'D', text: 'Severe pain that restricts daily routine requires me to rest', nextStep: 7 },
      { key: 'E', text: 'Crippling pain that has made me bed-ridden', nextStep: 7 }
    ],
    healStory: 'Understanding the severity of pain is crucial for effective treatment planning.'
  },
  {
    id: 'L010700',
    text: 'Rate the pain on a scale from 0-10.',
    options: Array.from({ length: 11 }, (_, i) => ({ key: i.toString(), text: i.toString(), nextStep: i === 0 ? 'summary' : 8 })),
    healStory: 'The pain scale helps to quantify the pain level, aiding in diagnosis and treatment.'
  },
  {
    id: 'L010800',
    text: 'How does the pain feel at a given point?',
    options: [
      { key: 'A', text: 'Constant', nextStep: 10 },
      { key: 'B', text: 'Intermittent', nextStep: 9 }
    ],
    healStory: 'Differentiating between constant and intermittent pain provides insights into the underlying condition.'
  },
  {
    id: 'L010801',
    text: 'Does your pain change while performing any specific activities?',
    options: [
      { key: 'A', text: 'Pain increases during any movement', nextStep: 10 },
      { key: 'B', text: 'Pain increases in sedentary postures', nextStep: 10 },
      { key: 'C', text: 'No relief even after change in posture/activity', nextStep: 10 }
    ],
    healStory: 'Activity-related changes in pain can help pinpoint specific musculoskeletal issues.'
  },
  {
    id: 'factPage',
    text: 'Here are some facts about musculoskeletal pain...',
    healStory: 'Musculoskeletal pain is a leading cause of disability globally, affecting millions.'
  },
  {
    id: 'L010900',
    text: 'Check for other symptoms that may indicate other health issues.',
    options: [
      { key: 'A', text: 'Dizzy', nextStep: 11 },
      { key: 'B', text: 'Tingling', nextStep: 11 },
      { key: 'C', text: 'Numbness', nextStep: 11 },
      { key: 'D', text: 'Weakness', nextStep: 11 },
      { key: 'E', text: 'Loss of Appetite', nextStep: 11 },
      { key: 'F', text: 'Severe Night Pain', nextStep: 11 },
      { key: 'G', text: 'Loss of Balance', nextStep: 11 },
      { key: 'H', text: 'High grade fever', nextStep: 11 },
      { key: 'I', text: 'Shortness of Breath', nextStep: 11 },
      { key: 'J', text: 'None', nextStep: 11 }
    ],
    healStory: 'Recognizing additional symptoms helps to rule out other potential health issues.'
  },
  {
    id: 'L011000',
    text: 'In certain rare conditions, the pain may also arise from previous medical histories. How is the current pain since it started?',
    options: [
      { key: 'A', text: 'Worsening', nextStep: 12 },
      { key: 'B', text: 'Much better than before', nextStep: 12 },
      { key: 'C', text: 'Same as before', nextStep: 12 }
    ],
    healStory: 'Assessing the progression of pain provides insights into its potential causes and severity.'
  },
  {
    id: 'L011100',
    text: 'Please choose if you have been detected with any of the following medical conditions.',
    options: [
      { key: 'A', text: 'Pregnancy', nextStep: 'summary' },
      { key: 'B', text: 'Recent Surgery', nextStep: 'summary' },
      { key: 'C', text: 'Active Fractures', nextStep: 'summary' },
      { key: 'D', text: 'Cancer', nextStep: 'summary' },
      { key: 'E', text: 'Tuberculosis', nextStep: 'summary' },
      { key: 'F', text: 'None', nextStep: 'summary' }
    ],
    healStory: 'Understanding past medical history is crucial for an accurate diagnosis and treatment plan.'
  }
];

export default questions;
