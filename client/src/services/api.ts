import type { FormulaResult } from "../types/types";
import { API_BASE_URL, ROUTES } from "../constants/api";

export const calculateFormula = async (
  formula: string
): Promise<FormulaResult> => {
  try {
    console.log(
      "Sending request to:",
      `${API_BASE_URL}${ROUTES.CALCULATE_FORMULA}`
    );
    console.log("With body:", JSON.stringify({ formula }));

    const response = await fetch(`${API_BASE_URL}${ROUTES.CALCULATE_FORMULA}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formula }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ detail: "Unknown error occurred" }));
      console.error("Error response:", errorData);
      throw new Error(
        errorData.detail || `Failed to calculate formula: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error("Error in calculateFormula:", error);
    throw error;
  }
};

export const getFormulaHistory = async (): Promise<FormulaResult[]> => {
  try {
    console.log(
      "Fetching formula history from:",
      `${API_BASE_URL}${ROUTES.FORMULA_HISTORY}`
    );

    const response = await fetch(`${API_BASE_URL}${ROUTES.FORMULA_HISTORY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error response status:", response.status);
      throw new Error(`Failed to fetch formula history: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received history data:", data);
    return data;
  } catch (error) {
    console.error("Error in getFormulaHistory:", error);
    throw error;
  }
};
