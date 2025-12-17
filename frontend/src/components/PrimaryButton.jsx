// frontend/src/components/PrimaryButton.jsx
import React from "react";

const PrimaryButton = ({ text, onClick, disabled = false }) => (
  <div className="animated-button-wrapper">
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  </div>
);

export default PrimaryButton;
