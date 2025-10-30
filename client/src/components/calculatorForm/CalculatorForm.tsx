import React from "react";
import { FaCalculator, FaFlask } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


interface CalculatorFormProps {
  formula?: string;
  loading?: boolean;
  isValid?: boolean;
  darkMode?: boolean;
  onFormulaChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  FormatFormula?: (formula: string) => React.ReactNode;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formula,
  loading,
  isValid,
  darkMode,
  onFormulaChange,
  onSubmit,
  FormatFormula,
}) => {
  const exampleFormulas = [
    "NaCl",
    "Ca(OH)2",
    "C13H16O8",
    "C6H12O6",
    "C21H22O9",
  ];

  return (
    <div
      className={`mt-6 p-6 rounded-lg shadow-md backdrop-blur-sm ${
        darkMode
          ? "bg-gray-700/90"
          : "bg-blue-50/90 periodic-element transform transition-all duration-300 hover:shadow-lg"
      }`}
    >
      <div className="flex item-center mb-4">
        <FaFlask
          className={`w-5 h-5 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          } mr-2`}
        />
        <h2
          className={`sm:text-l md:text-xl font-bold ${
            darkMode ? "text-blue-400" : "text-gray-900"
          }`}
        >
          Calculate Molar Mass
        </h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={formula}
            onChange={(e) => onFormulaChange && onFormulaChange(e.target.value)}
            placeholder="Enter chemical formula (e.g., H2O"
            className={`w-full py-3 px-4 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            } border ${
              isValid
                ? darkMode
                  ? "border-blue-500"
                  : "border-blue-600"
                : "border-red-500"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {formula && (
            <button
              type="button"
              onClick={() => onFormulaChange && onFormulaChange("")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                darkMode
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap">
          {exampleFormulas.map((example, index) => (
            <button
              type="button"
              key={index}
              onClick={() => onFormulaChange && onFormulaChange(example)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } transition-colors duration-200`}
            >
              {FormatFormula ? FormatFormula(example) : example}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white ${
            loading
              ? "bg-blue-500"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105`}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2">
                <span>Calculating...</span>
              </div>
            </div>
          ) : (
            <div>
              <FaCalculator className="w-5 h-5 mr-2" />
              <span>Calculate Molar Mass</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};
