import React from 'react';

const OptionsBox = ({ options, onSelectOption }) => {
  return (
    <div className="options-box">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectOption(option)}
          className="option-button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsBox;
