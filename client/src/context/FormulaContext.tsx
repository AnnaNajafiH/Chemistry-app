import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FormulaContextType, FormulaResult } from '../types/types';
import { calculateFormula as apiCalculateFormula, getFormulaHistory } from '../services/api';
import { FormulaContext } from './FormulaContextDefinition';

// Helper functions to get stored data from localStorage
const getStoredFormulaResult = (): FormulaResult | null => {
  const storedResult = localStorage.getItem('formulaResult');
  if (storedResult) {
    try {
      return JSON.parse(storedResult);
    } catch (error) {
      console.error('Error parsing stored formula result:', error);
      return null;
    }
  }
  return null;
};

const getStoredFormulaHistory = (): FormulaResult[] => {
  const storedHistory = localStorage.getItem('formulaHistory');
  if (storedHistory) {
    try {
      return JSON.parse(storedHistory);
    } catch (error) {
      console.error('Error parsing stored formula history:', error);
      return [];
    }
  }
  return [];
};

// Provider component
export const FormulaProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with stored values from localStorage if available
  const [formula, setFormula] = useState<string>(localStorage.getItem('formulaInput') || '');
  const [formulaResult, setFormulaResult] = useState<FormulaResult | null>(getStoredFormulaResult());
  const [formulaHistory, setFormulaHistory] = useState<FormulaResult[]>(getStoredFormulaHistory());
  const [loading, setLoading] = useState<boolean>(false);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Effect to persist formula input and result to localStorage
  useEffect(() => {
    if (formula) {
      localStorage.setItem('formulaInput', formula);
    }
  }, [formula]);
  
  useEffect(() => {
    if (formulaResult) {
      localStorage.setItem('formulaResult', JSON.stringify(formulaResult));
    }
  }, [formulaResult]);
  
  // Effect to persist formula history to localStorage
  useEffect(() => {
    if (formulaHistory && formulaHistory.length > 0) {
      localStorage.setItem('formulaHistory', JSON.stringify(formulaHistory));
    }
  }, [formulaHistory]);
  
  // Effect to fetch history only once on initial mount
  useEffect(() => {
    const initializeHistory = async () => {
      // Only fetch if we don't have history data
      if (formulaHistory.length === 0) {
        await fetchFormulaHistory();
      }
    };
    
    initializeHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateFormula = async () => {
    if (!formula.trim()) {
      setError('Please enter a chemical formula');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('Calculating formula for:', formula);
      const result = await apiCalculateFormula(formula);
      console.log('Formula calculation result:', result);
      
      // Store result in localStorage immediately to prevent loss
      localStorage.setItem('formulaResult', JSON.stringify(result));
      
      // Set the result and then fetch history separately
      setFormulaResult(result);
      
      // Fetch history in the background without affecting formula result
      setTimeout(() => {
        fetchFormulaHistory().catch(err => console.error('Failed to update history:', err));
      }, 1000); // Delay history fetch to ensure result state is stable
    } catch (err) {
      console.error('Error calculating formula:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setFormulaResult(null);
      localStorage.removeItem('formulaResult'); // Clear stored result on error
    } finally {
      setLoading(false);
    }
  };

  const fetchFormulaHistory = async () => {
    // Don't fetch if already loading
    if (historyLoading) return;
    
    // Use a separate loading state for history to avoid conflicts
    setHistoryLoading(true);
    try {
      const history = await getFormulaHistory();
      
      // Only update if we got valid data
      if (history && Array.isArray(history)) {
        setFormulaHistory(history);
        // Cache in localStorage
        localStorage.setItem('formulaHistory', JSON.stringify(history));
      }
    } catch (err) {
      console.error('Failed to fetch formula history:', err);
      // Don't show this error to the user as it's not critical
      // If fetch fails, keep using cached data
    } finally {
      setHistoryLoading(false);
    }
  };

  // The context value that will be supplied to any descendants of this provider
  // Add a clear result method
  const clearFormulaResult = () => {
    setFormulaResult(null);
    localStorage.removeItem('formulaResult');
  };

  const contextValue: FormulaContextType = {
    formula,
    formulaResult,
    formulaHistory,
    loading,
    historyLoading,
    error,
    setFormula,
    calculateFormula,
    fetchFormulaHistory,
    clearFormulaResult,
  };

  return (
    <FormulaContext.Provider value={contextValue}>
      {children}
    </FormulaContext.Provider>
  );
};