import React from "react";
import type { MoleculeControlsProps } from "../types/types";

export const MoleculeControls: React.FC<MoleculeControlsProps> = ({
  isRotating,
  setIsRotating,
  rotationSpeed,
  setRotationSpeed,
}) => {
  return (
    <div className="molecule-controls">
      <button
        onClick={() => setIsRotating(!isRotating)}
        className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded mx-2"
      >
        {isRotating ? "Pause Rotation" : "Start Rotation"}
      </button>
      <div className="flex items-center mx-2">
        <label htmlFor="speed" className="mr-2">
          Speed:
        </label>
        <input
          id="speed"
          type="range"
          min="0.001"
          max="0.01"
          step="0.001"
          value={rotationSpeed}
          onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          className="w-32"
        />
      </div>
    </div>
  );
};
