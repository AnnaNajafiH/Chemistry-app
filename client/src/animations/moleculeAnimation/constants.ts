import type { Molecule } from "./types/types";

export const ATOM_RADIUS = {
  H: 0.25,  // Smaller for hydrogen
  O: 0.45,  // Larger for oxygen
  C: 0.4,   // Medium for carbon
  DEFAULT: 0.4
};

export const MATERIAL_PROPERTIES = {
  DARK: {
    metalness: 0.4,
    roughness: 0.1,
    emissiveIntensity: 0.25
  },
  LIGHT: {
    metalness: 0.3,
    roughness: 0.2,
    emissiveIntensity: 0.15
  }
};

// Atom colors - more vibrant and colorful palette
export const atomColors: Record<string, number> = {
  H: 0xffffff, // Bright white for hydrogen
  O: 0xff5a5a, // Bright red for oxygen
  C: 0x5a9bff, // Bright blue for carbon
  N: 0xaa55ff, // Bright purple for nitrogen
  S: 0xffdd44, // Bright yellow for sulfur
  P: 0xffaa44, // Bright orange for phosphorus
  F: 0x33eebb, // Bright teal for fluorine
  Cl: 0x55ff77, // Bright green for chlorine
  Br: 0xcc8844, // Bright brown for bromine
  I: 0xdd55ff, // Bright purple for iodine
};

// Lighter gray for better visibility
export const bondColor = 0xcccccc;

// Default molecule structure
export const defaultMolecule: Molecule = {
  atoms: [
    { type: "C", position: [1.4, 0, 0] }, // C1
    { type: "C", position: [0.7, 1.2, 0] }, // C2 (with CH3)
    { type: "C", position: [-0.7, 1.2, 0] }, // C3
    { type: "C", position: [-1.4, 0, 0] }, // C4 (with OH)
    { type: "C", position: [-0.7, -1.2, 0] }, // C5
    { type: "C", position: [0.7, -1.2, 0] }, // C6 (with CH3)
    { type: "O", position: [-2.4, 0, 0] }, // OH oxygen
    { type: "C", position: [1.7, 2.0, 0] }, // CH3 near C2
    { type: "C", position: [1.7, -2.0, 0] }, // CH3 near C6
    { type: "H", position: [2.2, 0.5, 0] }, // H (C1)
    { type: "H", position: [1.7, 2.8, 0.5] }, // H (CH3 C2)
    { type: "H", position: [1.7, 2.8, -0.5] }, // H
    { type: "H", position: [2.4, 1.7, 0] }, // H
    { type: "H", position: [1.7, -2.8, 0.5] }, // H (CH3 C6)
    { type: "H", position: [1.7, -2.8, -0.5] }, // H
    { type: "H", position: [2.4, -1.7, 0] }, // H
    { type: "H", position: [-2.7, 0.5, 0] }, // H (OH)
  ],
  bonds: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 0], // Benzene ring
    [1, 7],
    [5, 8], // Methyl groups
    [3, 6], // OH
    [0, 9], // H
    [7, 10],
    [7, 11],
    [7, 12], // CH3 Hs
    [8, 13],
    [8, 14],
    [8, 15], // CH3 Hs
    [6, 16], // OH H
  ],
};
