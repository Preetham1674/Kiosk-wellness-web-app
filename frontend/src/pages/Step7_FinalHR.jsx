// frontend/src/pages/Step7_FinalHR.jsx
import React, { useState } from "react";
import PrimaryButton from "../components/PrimaryButton.jsx";

const ANIMATION_DURATION_MS = 4000;

const Step7_FinalHR = ({ handleDataInput, submitSession }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [bpm, setBpm] = useState(null);

  const startScan = () => {
    if (isScanning || scanComplete) return;

    // Generate final HR (usually lower than initial if the activity worked!)
    const generatedBpm = Math.floor(55 + Math.random() * 20);
    setBpm(generatedBpm);
    setIsScanning(true);

    handleDataInput("hrAfter", generatedBpm, false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, ANIMATION_DURATION_MS);
  };

  return (
    <div className="kiosk-card standby-card">
      <h2>
        {scanComplete
          ? "Scan Complete!"
          : isScanning
          ? "Measuring Heart Rate..."
          : "When you're ready, gently place your finger on the sensor"}
      </h2>

      {/* BPM result shown centered in the card */}
      {scanComplete && bpm && (
        <div className="bpm-display animate-fade-in">
          <span className="bpm-number">{bpm}</span>
          <span className="bpm-unit">BPM</span>
        </div>
      )}

      <div
        className={`container ${isScanning ? "scanning" : ""} ${
          scanComplete ? "active" : ""
        }`}
        onClick={startScan}
        style={{
          cursor: scanComplete ? "default" : "pointer",
          margin: "20px auto",
          background: "var(--svg-background-color)",
          position: "relative",
        }}
      >
        {/* The Animated Heart Icon */}
        <div className={`heart-icon ${isScanning ? "pulse-heart" : ""}`}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="var(--pastel-pink)"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* The EKG Waveform (Visible only during scan) */}
        {isScanning && (
          <svg
            className="ekg-wave"
            width="100%"
            height="100%"
            viewBox="0 0 100 40"
          >
            <polyline
              points="0,20 20,20 25,10 30,30 35,20 55,20 60,5 65,35 70,20 100,20"
              fill="none"
              stroke="var(--pastel-blue)"
              strokeWidth="2"
              className="ekg-path"
            />
          </svg>
        )}

        {/* Success Checkmark */}
        <svg
          className="ok"
          width="60"
          height="60"
          viewBox="0 0 100 100"
          style={{
            display: scanComplete ? "block" : "none",
            zIndex: 20,
            position: "absolute",
          }}
        >
          <path
            d="M34.912 50.75l10.89 10.125L67 36.75"
            fill="none"
            stroke="#fff"
            strokeWidth="6"
          />
        </svg>
      </div>

      {/* Circular Arrow Button anchored to bottom right */}
      <div className="bottom-right-anchor">
        <PrimaryButton
          className="result-arrow-btn"
          text="➞"
          onClick={submitSession}
          disabled={!scanComplete}
        />
      </div>
    </div>
  );
};

export default Step7_FinalHR;
