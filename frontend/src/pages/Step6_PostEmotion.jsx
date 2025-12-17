// frontend/src/pages/Step5_PostEmotion.jsx
import React from "react";
// Import PrimaryButton to use the standard action button style
import PrimaryButton from "../components/PrimaryButton.jsx";

const Step5_PostEmotion = ({ handleDataInput }) => {
  const handleContinue = () => {
    // If the user clicks continue without selecting a feeling,
    // we save a default value, like 'Continued' or 'Not measured',
    // and then advance to the next step (Step 6/7: Final HR Check).
    handleDataInput("emotionAfter", "Not specified");
  };

  return (
    <div className="kiosk-card">
      <h2>Stay with what unfolds</h2>

      {/* Removed the <br /> tag and the original <div className="button-group"> */}

      <p style={{ marginTop: "20px" }}>Your guided moment is complete.</p>

      <PrimaryButton
        text="Continue"
        onClick={handleContinue} // Saves default data and advances
      />
    </div>
  );
};

export default Step5_PostEmotion;
