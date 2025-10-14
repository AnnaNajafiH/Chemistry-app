// Define types for our application

export interface FormulaResult {
  formula: string;
  molecular_weight?: number; // Make optional since API might use molar_mass instead
  molar_mass?: number; // Alternative property name from API
  elements?: Record<string, number>; // Make optional for robustness
  id?: number;
  name?: string;
  description?: string;
  synonyms?: string[];
  hazards?: string[];
  iupac_name?: string;
  smiles?: string;
  structure_2d?: string;
  structure_3d?: string;
  crystal_structure?: string;
  timestamp?: string;
  unit?: string; // Add unit property from API response
}

export interface FormulaContextType {
  formula: string;
  formulaResult: FormulaResult | null;
  formulaHistory: FormulaResult[];
  loading: boolean;
  historyLoading: boolean;
  error: string | null;
  setFormula: (formula: string) => void;
  calculateFormula: () => Promise<void>;
  fetchFormulaHistory: () => Promise<void>;
  clearFormulaResult: () => void;
}
