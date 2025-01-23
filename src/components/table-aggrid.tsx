'use client';
import React, { useState } from 'react';
import { 
  AllCommunityModule, 
  ColDef, 
  ModuleRegistry, 
  themeAlpine 
} from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';

type rowProps = {
  make: string;
  model: string;
  price: number;
}
const Table = () => {
  const theme = themeAlpine;

  const [columnDefs] = useState<ColDef<rowProps>[]>([
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
  ]);

  // call this with API later
  const [rowData] = useState([ 
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  return (
    <div className="ag-theme-alpine w-full h-96">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
        pagination={true}
        paginationPageSize={10}
        theme={theme}
        cellSelection={true}
      />
    </div>
  );
};

export default Table;