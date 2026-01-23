"use client";

import { useEffect, useMemo, useState } from "react";
import { getFormulas } from "@/utils/storage";
import { Formula } from "@/types/formula";
import { AgGridReact } from "ag-grid-react";
import "@/lib/agGridSetup";
import ActionButton from "@/components/ActionButton";
import CreateFormulaModal from "@/components/CreateFormulaModal";

export default function HomePage() {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const loadFormulasFromStorage = () => {
    setFormulas(getFormulas());
  };

  useEffect(() => {
    loadFormulasFromStorage();
  }, []);

  console.log(formulas);

  const colDefs: any = useMemo(
    () => [
      { field: "name" },
      { field: "code" },
      { field: "type" },
      { field: "project" },
      { headerName: "Actions", cellRenderer: ActionButton },
    ],
    [],
  );
  const defColDefs = useMemo(() => ({ flex: 1 }), []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Formula Dashboard</h1>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Formula
          </button>
        </div>

        <div className="ag-theme-alpine" style={{ height: 400 }}>
          <AgGridReact
            rowData={formulas}
            columnDefs={colDefs}
            defaultColDef={defColDefs}
          />
        </div>
      </div>

      <CreateFormulaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={loadFormulasFromStorage}
      />
    </div>
  );
}
