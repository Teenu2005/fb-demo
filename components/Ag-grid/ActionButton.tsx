"use client";

import { deleteFormula } from "@/utils/storage";
import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/navigation";

export default function ViewFormulaButton(props: ICellRendererParams) {
  const router = useRouter();
  const handleClick = () => {
    const formulaId = props.data.id;
    router.push(`/formula/${formulaId}`);
  };
  const handleDelete = () => {
    const formulaId = props.data.id;
    deleteFormula(formulaId);
    props.context.refreshFormulas();
  };

  return (
    <div className="flex gap-4  items-end mt-1 justify-center">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
      >
        View
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
