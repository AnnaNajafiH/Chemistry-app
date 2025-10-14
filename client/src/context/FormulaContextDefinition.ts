import { createContext } from 'react';
import type { FormulaContextType } from '../types/types';

// Create the context with a default value
export const FormulaContext = createContext<FormulaContextType | null>(null);