import React, { useState, useEffect } from "react";
import "./CalculateMainPage.css";
import LoadingAnimation from "../../animations/loadingAnimation/LoadingAnimation";
import { useDarkMode } from "../../hooks/darkModeHook";
import { CalculatorForm } from "../../components/calculatorForm/CalculatorForm";



const CalculateMainPage: React.FC = () => {

  const {darkMode} = useDarkMode();
  const [isLoading, setIsLoading] = useState(true);
  // Simulate loading delay for visual effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="calculator-page relative min-h-screen">
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="fade-in-slide-up">
          <CalculatorForm
          darkMode ={darkMode}
          />
        </div>
      )}
    </div>
  );
};

export default CalculateMainPage;
