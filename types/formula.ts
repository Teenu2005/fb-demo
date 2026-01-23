export type Ingredient = {
  id: string;
  name: string;
  role: "Base" | "Modifier" | "Trace";
  physicalState: "Liquid" | "Solid";
  flashPoint: number; // °C
};


export type FormulaIngredient = {
  ingredientId: string;
  quantity: number;
  isDeleted?: boolean; // 👈 soft delete flag
};

export type Formula = {
  id: string;
  name: string;
  code: string;
  type: string;
  description?: string;
  ingredients: FormulaIngredient[];
  project:string
};
