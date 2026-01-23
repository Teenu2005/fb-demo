import { Formula } from "@/types/formula";

const STORAGE_KEY = "formulas";

export const getFormulas = (): Formula[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};


export const saveFormula = (formula: Formula) => {
  const existing = getFormulas();
  const updated = [...existing, formula];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearFormulaStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};