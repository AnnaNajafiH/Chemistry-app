
import { useState } from "react";
import type { FormulaResult } from "../types/calculateFormula/CalculateFormula";
import {calculateFormula} from "../services/api";

interface FormulaCalculatorHook {
    formula: string;
    setFormula: (value: string) => void;
    result: FormulaResult | null;
    loading: boolean;
    error: string | null;
    showFormula: boolean;
    setShowFormula: (value: boolean) => void;
    historyRefresh: number;
    handleFormulaChange: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useFormulaCalculator = (): FormulaCalculatorHook => {
  const [formula, setFormula] = useState<string>("");
  const [result, setResult] = useState<FormulaResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState<boolean>(true);
  const [historyRefresh, setHistoryRefresh] = useState<number>(0);

// validate formula input
const handleFormulaChange = (value: string) => {
    setFormula(value);
}

// handle form submission
const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(!formula.trim()) {
        setError ("Formula cannot be empty");
        return;
}
if (!isFormulaValid(formula)) {
    setError ("Formula appears to be invalid. Check for balanced parentheses and valid characters.");
    return;
}

setLoading(true);
setError (null);

try {
    console.log(`Calculating molar mass for formula: ${formula}`);
    const data = await calculateFormula(formula);
    setResult (data);
    setHistoryRefresh (prev => prev + 1);

} catch (err) {
    console.error ("Error calculating molar mass:", err);
    setError(err instanceof Error ? err.message : "An unexpected error occurred");
    setResult (null);
}finally{
    setLoading (false);
}
};


return {
    formula,
    setFormula,
    result,
    loading,
    error,
    showFormula,
    setShowFormula,
    historyRefresh,
    handleFormulaChange,
    handleSubmit
};
};



export const isFormulaValid = (formula: string): boolean => {
  // Check if formula only contains valid characters
  if (!formula || !/^[A-Za-z0-9()]+$/.test(formula)) {
    return false;
  }
  
  // Check for balanced parentheses
  let stack = 0;
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === '(') {
      stack++;
    } else if (formula[i] === ')') {
      stack--;
      if (stack < 0) return false; // More closing than opening parentheses
    }
  }
  
  return stack === 0; // All parentheses should be balanced
};