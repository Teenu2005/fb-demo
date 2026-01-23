"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { INGREDIENTS } from "@/constants/ingredients";
import { getFormulas, saveFormula } from "@/utils/storage";
import { Formula } from "@/types/formula";

export default function FormulaDetailPage() {
  const { id } = useParams();

  const [formula, setFormula] = useState<Formula | null>(null);

  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const loadFormulaById = () => {
    const formulas = getFormulas();
    const selected = formulas.find((f) => f.id === id);
    setFormula(selected || null);
  };

  useEffect(() => {
    loadFormulaById();
  }, [id]);

  const handleAddIngredient = () => {
    if (!formula) return;

    const updatedFormula: Formula = {
      ...formula,
      ingredients: [...formula.ingredients, { ingredientId, quantity }],
    };

    saveFormula(updatedFormula);
    setFormula(updatedFormula);
  };

  if (!formula) {
    return <p className="p-6">Formula not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">{formula.name}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <span>Code: {formula.code}</span>
            <span>Type: {formula.type}</span>
            <span>Status: Draft</span>
          </div>

          {formula.description && (
            <p className="mt-3 text-gray-700">{formula.description}</p>
          )}
        </div>

        <div className="border p-4 rounded mb-6">
          <h2 className="font-semibold mb-2">Add Ingredient</h2>

          <div className="flex gap-2">
            <select
              className="border p-2 rounded w-full"
              onChange={(e) => setIngredientId(e.target.value)}
            >
              <option value="">Select Ingredient</option>
              {INGREDIENTS.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>

            {/* <input
              type="number"
              className="border p-2 rounded w-32"
              placeholder="Qty"
              onChange={(e) => setQuantity(Number(e.target.value))}
            /> */}

            <button
              onClick={handleAddIngredient}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <h2 className="font-semibold mb-2">Ingredients</h2>
        <ul className="space-y-2">
          {formula.ingredients.map((item, index) => {
            const ingredient = INGREDIENTS.find(
              (ing) => ing.id === item.ingredientId,
            ); //Getting that particular ingredient

            return (
              <li
                key={index}
                className="border p-3 rounded flex justify-between"
              >
                <span>{ingredient?.name}</span>
                <span className="text-gray-600">{item.quantity}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
