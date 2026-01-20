import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Background from "./components/Background.jsx";

// Import Page Components
import Step0_Standby from "./pages/Step0_Standby.jsx";
import Step1_Welcome from "./pages/Step1_Welcome.jsx";
import Step2_InitialHR from "./pages/Step2_InitialHR.jsx";
import Step3_Emotion from "./pages/Step3_Emotion.jsx";
import Step4_Goal from "./pages/Step4_Goal.jsx";
import Step5_Activity from "./pages/Step5_Activity.jsx";
import Step6_PostEmotion from "./pages/Step6_PostEmotion.jsx";
import Step7_FinalHR from "./pages/Step7_FinalHR.jsx";
import Step8_Results from "./pages/Step8_Results.jsx";
import Step9_Final from "./pages/Step9_Final.jsx";

const BREATHING_CYCLE_DURATION = 8000;
const ACTIVITY_DURATION = 180000;

const KioskContent = () => {
  const [step, setStep] = useState(0);
  const [sessionData, setSessionData] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [breathingText, setBreathingText] = useState("");
  const [activityTimer, setActivityTimer] = useState(ACTIVITY_DURATION / 1000);

  const API_URL = "http://localhost:5000/api/sessions/complete";

  const nextStep = useCallback(() => {
    if (step === 1) setStartTime(Date.now());
    setStep((prev) => prev + 1);
  }, [step]);

  const handleDataInput = (key, value, next = true) => {
    setSessionData((prev) => ({ ...prev, [key]: value }));
    if (next) nextStep();
  };

  const submitSession = async () => {
    const endTime = Date.now();
    const duration = startTime ? Math.round((endTime - startTime) / 1000) : 0;
    const finalData = {
      ...sessionData,
      duration,
      timestamp: new Date().toISOString(),
    };

    nextStep();

    try {
      await axios.post(API_URL, finalData);
    } catch (error) {
      console.error("Background Save Error:", error);
    }
  };

  useEffect(() => {
    let intervalId, timerId, countdownInterval;
    if (step === 5) {
      setActivityTimer(ACTIVITY_DURATION / 1000);
      setBreathingText("Inhale");
      intervalId = setInterval(() => {
        setBreathingText((prev) =>
          prev === "Inhale" || prev === "Hold" ? "Exhale" : "Inhale"
        );
      }, BREATHING_CYCLE_DURATION / 2);
      timerId = setTimeout(() => {
        clearInterval(intervalId);
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
  }, [step, nextStep]);

  const pageProps = {
    sessionData,
    handleDataInput,
    nextStep,
    setStartTime,
    submitSession,
    setStep,
    breathingText,
    activityTimer,
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <Step0_Standby {...pageProps} />;
      case 1:
        return <Step1_Welcome {...pageProps} />;
      case 2:
        return <Step2_InitialHR {...pageProps} />;
      case 3:
        return <Step3_Emotion {...pageProps} />;
      case 4:
        return <Step4_Goal {...pageProps} />;
      case 5:
        return <Step5_Activity {...pageProps} />;
      case 6:
        return <Step6_PostEmotion {...pageProps} />;
      case 7:
        return <Step7_FinalHR {...pageProps} />;
      case 8:
        return <Step8_Results {...pageProps} />;
      case 9:
        return <Step9_Final {...pageProps} />;
      default:
        return <div>Error: Invalid step.</div>;
    }
  };

  return (
    <div className="App">
      {/* BRANDING LOGO */}
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="kiosk-logo" />
      </div>

      <div>{renderCurrentStep()}</div>
    </div>
  );
};

const App = () => (
  <>
    <Background />
    <KioskContent />
  </>
);

export default App;
