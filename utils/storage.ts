import { Formula } from "@/types/formula";

const STORAGE_KEY = "formulas";

export const getFormulas = (): Formula[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};


export const saveFormula = (formula: Formula) => {
  const existing = getFormulas();

  const updated = existing.map((f) =>
    f.id === formula.id ? formula : f
  );

  const exists = existing.some((f) => f.id === formula.id);
  const finalData = exists ? updated : [...existing, formula];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(finalData));
};

export const deleteFormula = (formulaId: string) => {
  const existing = getFormulas();
  const updated = existing.filter((f) => f.id !== formulaId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};


export const clearFormulaStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};