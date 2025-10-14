export const API_BASE_URL = "http://localhost:8000";

export const ROUTES = {
  CALCULATE_FORMULA: "/api/formula", // Updated to match backend route
  FORMULA_HISTORY: "/api/formula/history", // Updated to match backend route
  FORMULA_DETAIL: (id: string | number) => `/api/formula/${id}`, // Updated to match backend route
};
