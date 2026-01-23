"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import "@/lib/agGridSetup";

import { INGREDIENTS } from "@/constants/ingredients";
import { getFormulas, saveFormula } from "@/utils/storage";
import { Formula } from "@/types/formula";
import IngredientActionsCell from "@/components/Ag-grid/DeleteCell";

export default function FormulaDetailPage() {
  const { id } = useParams();
  const [formula, setFormula] = useState<Formula | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const loadFormulaById = () => {
    const formulas = getFormulas();
    const selected = formulas.find((f) => f.id === id);
    setFormula(selected || null);
  };

  useEffect(() => {
    loadFormulaById();
  }, [id]);

  // Soft delete
  const softDeleteIngredient = (ingredientId: string) => {
    if (!formula) return;

    const updated: Formula = {
      ...formula,
      ingredients: formula.ingredients.map((item) =>
        item.ingredientId === ingredientId
          ? { ...item, isDeleted: true }
          : item,
      ),
    };

    saveFormula(updated);
    setFormula(updated);
  };

  // Permanent delete
  const permanentDeleteIngredient = (ingredientId: string) => {
    if (!formula) return;

    const updated: Formula = {
      ...formula,
      ingredients: formula.ingredients.filter(
        (item) => item.ingredientId !== ingredientId,
      ),
    };

    saveFormula(updated);
    setFormula(updated);
  };

  //Grid data
  const ingredientRows =
    formula?.ingredients.map((item) => {
      const ing = INGREDIENTS.find((i) => i.id === item.ingredientId);

      return {
        ingredientId: item.ingredientId,
        name: ing?.name,
        role: ing?.role,
        physicalState: ing?.physicalState,
        flashPoint: ing?.flashPoint,
        quantity: item.quantity,
        isDeleted: item.isDeleted,
      };
    }) || [];

  //Col defs

  const colDefs: any = useMemo(
    () => [
      {
        field: "name",
        cellClassRules: {
          "line-through text-gray-400": (p: any) => p.data?.isDeleted,
        },
      },
      {
        field: "role",
        cellClassRules: {
          "text-gray-300 line-through": (p: any) => p.data?.isDeleted,
        },
      },
      {
        field: "physicalState",
        headerName: "Physical Char.",
        cellClassRules: {
          "text-gray-300 line-through": (p: any) => p.data?.isDeleted,
        },
      },
      {
        field: "flashPoint",
        headerName: "Flash Point",
        valueFormatter: (p: any) => (p.value ? `${p.value}°C` : ""),
        cellClassRules: {
          "text-gray-300 line-through": (p: any) => p.data?.isDeleted,
        },
      },
      {
        field: "quantity",
        cellClassRules: {
          "text-gray-300 line-through": (p: any) => p.data?.isDeleted,
        },
      },
      {
        headerName: "",
        width: 90,
        cellRenderer: (params: any) => (
          <IngredientActionsCell
            ingredientId={params.data.ingredientId}
            isDeleted={params.data.isDeleted}
            onSoftDelete={softDeleteIngredient}
            onPermanentDelete={permanentDeleteIngredient}
          />
        ),
      },
    ],
    [formula],
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      sortable: false,
    }),
    [],
  );

  if (!formula) return <p className="p-6">Formula not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold">{formula.name}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <span>Code: {formula.code}</span>
            <span>Type: {formula.type}</span>
            <span>Status: Draft</span>
          </div>

          <div className="flex items-center justify-between pr-3">
            {formula.description && (
              <p className="mt-3 text-gray-700">{formula.description}</p>
            )}

            <button
              onClick={() => setOpenModal(true)}
              className="border px-3 py-1 rounded text-sm"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="ag-theme-alpine" style={{ height: 350 }}>
          <AgGridReact
            rowData={ingredientRows}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowClassRules={{
              group: () => true,
            }}
          />
        </div>

        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-4">
              <h2 className="font-semibold mb-3">Select Ingredient</h2>

              <div className="max-h-64 overflow-y-auto border rounded">
                {INGREDIENTS.map((ing) => (
                  <div
                    key={ing.id}
                    className="flex justify-between items-center p-3 border-b"
                  >
                    <div>
                      <p className="font-medium">{ing.name}</p>
                      <p className="text-xs text-gray-500">
                        {ing.role} • {ing.physicalState}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const updatedFormula = {
                          ...formula,
                          ingredients: [
                            ...formula.ingredients,
                            { ingredientId: ing.id, quantity: 10 },
                          ],
                        };

                        saveFormula(updatedFormula);
                        setFormula(updatedFormula);
                        setOpenModal(false);
                      }}
                      className="text-blue-600 text-xl"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
