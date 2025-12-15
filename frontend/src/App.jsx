// frontend/src/App.jsx (Complete File - PERSISTENT BACKGROUND & FIXED WAVE LOADER)
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const initialEmotions = [
  "Anxious",
  "Tired",
  "Stressed",
  "Overwhelmed",
  "Neutral",
  "Happy",
];
const BREATHING_CYCLE_DURATION = 8000;
const ACTIVITY_DURATION = 180000; // 3 minutes

// Component to render the animated cubes structure
const AnimatedCubes = () => (
  // Injecting 30 list items for high density background flow
  <ul className="circles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
);

// We define the main App content renderer
const KioskContent = () => {
  const [step, setStep] = useState(0);
  const [sessionData, setSessionData] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [breathingText, setBreathingText] = useState("");
  const [activityTimer, setActivityTimer] = useState(ACTIVITY_DURATION / 1000);

  const API_URL = "http://localhost:5000/api/sessions/complete";

  const nextStep = () => setStep(step + 1);

  const handleDataInput = (key, value, next = true) => {
    // This updates the session data and controls the 'selected-button' class via state
    setSessionData((prev) => ({ ...prev, [key]: value }));
    if (next) nextStep();
  };

  const submitSession = async () => {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    const finalData = {
      ...sessionData,
      duration: duration,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(API_URL, finalData);
      nextStep();
    } catch (error) {
      console.error("Submission Error:", error);
      nextStep();
    }
  };

  // --- useEffect for Guided Breathing Cues ---
  useEffect(() => {
    let intervalId, timerId, countdownInterval;

    if (step === 4) {
      setBreathingText("Inhale");
      setActivityTimer(ACTIVITY_DURATION / 1000);

      intervalId = setInterval(() => {
        setBreathingText((prev) =>
          prev === "Inhale" || prev === "Hold" ? "Exhale" : "Inhale"
        );
      }, BREATHING_CYCLE_DURATION / 2);

      timerId = setTimeout(() => {
        clearInterval(intervalId);
        setBreathingText("Well Done!");
        nextStep();
      }, ACTIVITY_DURATION);

      countdownInterval = setInterval(() => {
        setActivityTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timerId);
        clearInterval(countdownInterval);
      };
    }
    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, [step]);
  // --- END useEffect ---

  // Component for the primary action button
  const PrimaryActionButton = ({ text, onClick, disabled = false }) => (
    <div className="animated-button-wrapper">
      <button onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </div>
  );

  const renderScreen = () => {
    switch (step) {
      case 0: // Standby (Wave Loader Animation)
        return (
          <div className="kiosk-card standby-card">
            <h2>Welcome to Focus Sphere.</h2>
            {/* NEW Wave Loader HTML Structure */}
            <div className="animation-wrapper">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>

            <p>Tap Start Session to begin your journey to a clearer mind.</p>
            <PrimaryActionButton
              text="Start Session"
              onClick={() => {
                setStartTime(Date.now());
                nextStep();
              }}
            />
          </div>
        );
      case 1: // Screen 1: Welcome & Quote
        return (
          <div className="kiosk-card">
            <h2>"The mind is everything. What you think you become."</h2>
            <p>Ready to validate your experience and test your impact?</p>
            <PrimaryActionButton text="I am Ready" onClick={nextStep} />
          </div>
        );
      case 2: // Screen 2: Initial HR
        return (
          <div className="kiosk-card">
            <h2>Initial Check-In</h2>
            <p>
              Please place your finger / relax for a moment to record your
              baseline state. (Simulated for MVP)
            </p>
            <div className="button-group">
              <button
                onClick={() =>
                  handleDataInput(
                    "hrBefore",
                    Math.floor(60 + Math.random() * 30)
                  )
                }
              >
                Record Pulse (Simulated)
              </button>
              <button onClick={() => handleDataInput("hrBefore", null)}>
                Skip Sensor
              </button>
            </div>
          </div>
        );
      case 3: // Screen 3: Emotion/Goal
        const isReadyToProceed =
          sessionData.sessionType && sessionData.emotionBefore;

        return (
          <div className="kiosk-card">
            <h2>What would you like to achieve right now?</h2>
            <div className="button-group">
              {["Calm", "Focus", "Sleep"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleDataInput("sessionType", type, false)}
                  className={
                    sessionData.sessionType === type ? "selected-button" : ""
                  }
                >
                  {type}
                </button>
              ))}
            </div>

            <p className="emotion-prompt">I currently feel...</p>
            <div className="button-group">
              {initialEmotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() =>
                    handleDataInput("emotionBefore", emotion, false)
                  }
                  className={
                    sessionData.emotionBefore === emotion
                      ? "selected-button"
                      : ""
                  }
                >
                  {emotion}
                </button>
              ))}
            </div>

            <PrimaryActionButton
              text="Continue to Activity"
              onClick={nextStep}
              disabled={!isReadyToProceed}
            />
          </div>
        );
      case 4: // Screen 4: Activity (Dynamic Breathing Guide)
        const minutes = Math.floor(activityTimer / 60);
        const seconds = activityTimer % 60;
        const minimumTimePassed = activityTimer < ACTIVITY_DURATION / 1000 - 10;

        return (
          <div className="kiosk-card">
            <h2>Guided {sessionData.sessionType} Session</h2>
            <p>Follow the circle to regulate your breath (3 minutes).</p>

            <div className="breathing-guide">
              <div className="breathing-circle-container">
                <div className="breathing-circle"></div>
              </div>
              <div className="breathing-instruction">{breathingText}</div>
            </div>

            <p className="hr-note">
              Time Remaining: {minutes}:{seconds.toString().padStart(2, "0")}
            </p>

            <button
              onClick={() => {
                setBreathingText("");
                nextStep();
              }}
              disabled={!minimumTimePassed}
            >
              Skip Activity
            </button>
          </div>
        );
      case 5: // Screen 5: Post-Emotion
        return (
          <div className="kiosk-card">
            <h2>Post-Activity Check</h2>
            <p>How do you feel after the guided breathing?</p>
            <div className="button-group">
              {["Better than before", "The same", "Feeling okay"].map(
                (feeling) => (
                  <button
                    key={feeling}
                    onClick={() => handleDataInput("emotionAfter", feeling)}
                  >
                    {feeling}
                  </button>
                )
              )}
            </div>
          </div>
        );
      case 6: // Screen 6: Final HR & Submission Trigger
        const isHrFinalRecorded = sessionData.hrAfter !== undefined;
        return (
          <div className="kiosk-card">
            <h2>Final Check-In</h2>
            <p>Please re-record your pulse one last time.</p>
            <div className="button-group">
              <button
                onClick={() =>
                  handleDataInput(
                    "hrAfter",
                    Math.floor(55 + Math.random() * 20),
                    false
                  )
                }
              >
                Record Pulse (Simulated)
              </button>
              <button onClick={() => handleDataInput("hrAfter", null, false)}>
                Skip HR
              </button>
            </div>
            <PrimaryActionButton
              text="Show Results & Save Data"
              onClick={submitSession}
              disabled={!isHrFinalRecorded}
            />
          </div>
        );
      case 7: // Screen 7: Result & Thank You
        const hrBefore = sessionData.hrBefore || "N/A";
        const hrAfter = sessionData.hrAfter || "N/A";
        const durationDisplay = Math.round((Date.now() - startTime) / 1000);

        return (
          <div className="kiosk-card">
            <h2>Thank You! Your Session is Complete.</h2>
            <p>
              Your session lasted{" "}
              <span className="result-value">{durationDisplay} seconds</span>{" "}
              and the anonymized outcome has been recorded.
            </p>

            <div className="result-comparison">
              <p>
                Initial Emotion:{" "}
                <span className="result-value">
                  {sessionData.emotionBefore}
                </span>
              </p>
              <p>
                Final Feeling:{" "}
                <span className="result-value">{sessionData.emotionAfter}</span>
              </p>
              <p>
                Pulse Data:
                <span className="result-value">{hrBefore} BPM</span>
                <span className="arrow-symbol">&rarr;</span>
                <span className="result-value">{hrAfter} BPM</span>
              </p>
            </div>

            <h3>"Be kind to your mind. See you next time!"</h3>
            <PrimaryActionButton
              text="Return to Standby"
              onClick={() => setStep(0)}
            />
          </div>
        );
      default:
        return <div>Error: Invalid step.</div>;
    }
  };

  return <div className="App">{renderScreen()}</div>;
};

// Main App wrapper component
const App = () => (
  <>
    {/* PERSISTENT BACKGROUND: Renders only once */}
    <AnimatedCubes />
    {/* Main content, which handles state changes */}
    <KioskContent />
  </>
);

export default App;
