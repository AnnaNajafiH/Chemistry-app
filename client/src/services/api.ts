import type { FormulaResult } from "../types/calculateFormula/CalculateFormula";
import axios from "axios";

const API_URL = "http://localhost:8000/api/formula";

export const calculateFormula = async (
  formula: string
): Promise<FormulaResult | null> => {
  try {
    console.log(`Calculating molar mass for formula: ${formula}`);
    const response = await axios.post<FormulaResult>(`${API_URL}/calculate`, {
      formula: formula.trim(),
    });
    const data = response.data;
    if (!data) {
      throw new Error("No data from server");
    }
    return data;
  } catch (err) {
    console.error("Error calculating molar mass:", err);
    return null;
  }
};

// export const getFormulaHistory = async (): Promise<FormulaResult[]> => {
//   try {
//     console.log(
//       "Fetching formula history from:",
//       `${API_BASE_URL}${ROUTES.FORMULA_HISTORY}`
//     );

//     const response = await fetch(`${API_BASE_URL}${ROUTES.FORMULA_HISTORY}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       console.error("Error response status:", response.status);
//       throw new Error(`Failed to fetch formula history: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Received history data:", data);
//     return data;
//   } catch (error) {
//     console.error("Error in getFormulaHistory:", error);
//     throw error;
//   }
// };
