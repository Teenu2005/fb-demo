"use client";

import { AgGridReact } from "ag-grid-react";
import "@/lib/agGridSetup";
const rowData: any = [
  {
    orderId: "ORD-001",
    customer: "Alice",
    items: [
      { name: "Pen", qty: 10 },
      { name: "Notebook", qty: 5 },
    ],
  },
  {
    orderId: "ORD-002",
    customer: "Bob",
    items: [
      { name: "Pencil", qty: 20 },
      { name: "Eraser", qty: 3 },
    ],
  },
];

const columnDefs: any = [
  {
    field: "orderId",
    cellRenderer: "agGroupCellRenderer",
  },
  { field: "customer" },
];

export default function NestedGridDemo() {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        masterDetail={true}
        detailRowHeight={180}
        detailCellRendererParams={{
          detailGridOptions: {
            columnDefs: [
              { field: "name", headerName: "Item Name" },
              { field: "qty", headerName: "Quantity" },
            ],
            defaultColDef: {
              flex: 1,
            },
          },
          getDetailRowData: (params: any) => {
            params.successCallback(params.data.items);
          },
        }}
      />
    </div>
  );
}
