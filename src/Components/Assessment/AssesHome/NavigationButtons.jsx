import React from 'react';

const NavigationButtons = ({ onPrevious, onNext, disableNext }) => {
  return (
    <div className="navigation-buttons">
      <button onClick={onPrevious} className="prev-button">◀</button>
      <button onClick={onNext} className="next-button" disabled={disableNext}>▶</button>
    </div>
  );
};

export default NavigationButtons;
