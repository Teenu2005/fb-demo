"use client";

import { ICellRendererParams } from "ag-grid-community";
import { useRouter } from "next/navigation";

export default function ViewFormulaButton(props: ICellRendererParams) {
  const router = useRouter();
  const handleClick = () => {
    const formulaId = props.data.id;
    router.push(`/formula/${formulaId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
    >
      View
    </button>
  );
}
