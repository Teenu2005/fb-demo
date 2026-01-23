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
};

export type Formula = {
  id: string;              // unique id
  name: string;            // formula name
  code: string;            // FR-2026-504
  type: string;            // Fine Fragrance etc
  project?: string;        // optional
  description?: string;   // optional
  ingredients: FormulaIngredient[];
  createdAt: string;      // for sorting / audit
};
