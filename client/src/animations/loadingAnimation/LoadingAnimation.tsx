import React from 'react';
import "./LoadingAnimation.css"

const LoadingAnimation: React.FC = () => {

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-5 z-50">
      <div className="text-center">
        <div className="loading-animation mb-4">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="flask-container absolute inset-0 flex items-center justify-center">
            <div className="flask"></div>
            <div className="liquid"></div>
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-700">
          Loading Calculator
        </h2>
        <p className="text-gray-500 mt-2">Preparing chemical formulas...</p>
      </div>
    </div>
  );
}

export default LoadingAnimation;