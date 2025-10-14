import { useContext } from 'react';
import { FormulaContext } from '../context/FormulaContextDefinition';
import type { FormulaContextType } from '../types/types';

export const useFormula = (): FormulaContextType => {
  const context = useContext(FormulaContext);
  if (!context) {
    throw new Error('useFormula must be used within a FormulaProvider');
  }
  
  return context;
};