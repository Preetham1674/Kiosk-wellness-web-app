// frontend/src/components/PrimaryButton.jsx
import React from "react";

const PrimaryButton = ({ text, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={className} // THIS MUST BE HERE
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
