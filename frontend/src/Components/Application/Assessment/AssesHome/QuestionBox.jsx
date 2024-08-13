import React from 'react';

const QuestionBox = ({ questionText, children }) => {
  return (
    <div className="question-box">
      <p>{questionText}</p>
      {children}
    </div>
  );
};

export default QuestionBox;
