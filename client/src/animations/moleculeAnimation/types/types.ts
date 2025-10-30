import type * as React from 'react';
import type * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface Atom {
  type: string;
  position: [number, number, number];
}

export interface Molecule {
  atoms: Atom[];
  bonds: [number, number][];
}

export interface MoleculeViewerProps {
  formula?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export interface MoleculeControlsProps {
  isRotating: boolean;
  setIsRotating: (rotating: boolean) => void;
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
}

export interface MoleculeSceneConfig {
  containerRef: React.RefObject<HTMLDivElement>;
  width: number;
  height: number;
  backgroundColor: string;
  isDarkMode: boolean;
  isRotating: boolean;
  rotationSpeed: number;
}

export interface ThreeRefs {
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  controlsRef: React.MutableRefObject<OrbitControls | null>;
  frameIdRef: React.MutableRefObject<number>;
}
