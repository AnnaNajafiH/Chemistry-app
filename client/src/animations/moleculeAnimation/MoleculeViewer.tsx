import React, { useRef, useState } from "react";
import type { MoleculeViewerProps } from "./types/types";
import { useDarkMode } from "./hooks/useDarkMode";
import { useMoleculeScene } from "./hooks/useMoleculeScene";
import { MoleculeControls } from "./components/MoleculeControls";
import "./MoleculeViewer.css";

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  width = 700,
  height = 600,
  backgroundColor = "#CCFFFFFF",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.002);
  const { isDarkMode } = useDarkMode();

  // Initialize Three.js scene and components
  useMoleculeScene({
    containerRef,
    width,
    height,
    backgroundColor,
    isDarkMode,
    isRotating,
    rotationSpeed,
  });

  return (
    <div className="molecule-viewer-container">
      <div
        ref={containerRef}
        className="molecule-viewer"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <div className="molecule-controls">
        <MoleculeControls
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          rotationSpeed={rotationSpeed}
          setRotationSpeed={setRotationSpeed}
        />
      </div>
    </div>
  );
};

export default MoleculeViewer;
