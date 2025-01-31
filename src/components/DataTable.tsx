'use client';
import React from 'react';
import {
  ColumnResizeDirection,
  ColumnResizeMode,
  createColumnHelper,
  flexRender,
  getCoreRowModel, getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { CustomerData } from '../utils/types';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Filter } from 'lucide-react'; 
type DataTableProps = {
  initialData: CustomerData[];
  columns: any;
  enableSorting?: boolean;
  enableGlobalFiltering?: boolean;
};

const DataTable = ({ initialData, columns, enableSorting = true, enableGlobalFiltering = true }: DataTableProps) => {
  const [data, setData] = React.useState(initialData);
  const [borderSelectedCell, setBorderSelectedCell] = React.useState<string | null>(null);
  const [highlightedCell, setHighlightedCell] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilterVal, setGlobalFilterVal] = React.useState<string>('');
  const [globalFilter, setGlobalFilter] = React.useState<string>('')

  const table = useReactTable({
    data,
    columns,
    state: { 
      ...(enableSorting && { sorting }), 
      ...(enableGlobalFiltering && { globalFilter})},
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="h-[800px] w-[90vw] mx-auto relative">
      {enableGlobalFiltering && <div className='mb-4 flex items-center gap-4'>
        <Input
          className='w-48'
          placeholder="Search"
          onChange={(e) => {
            // Handle textbox input changes if needed
            setGlobalFilterVal(e.target.value);
          }}
        />
        <Button 
          onClick={() => {
            table.setGlobalFilter([globalFilterVal])
          }}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>}

      <div className='w-full h-full overflow-x-auto'>
        <div style={{ direction: table.options.columnResizeDirection }}>
        <table
          className='min-w-full divide-y divide-slate-400 relative bg-neutral-50'
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead className='border b-2 border-gray-300 top-0 bg-gray-800 z-30'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='sticky top-0 z-20'>
                {headerGroup.headers.map(header => (
                  <th
                    className="relative px-6 py-3 text-left text-xs font-extrabold text-gray-500 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)] uppercase tracking-wider bg-neutral-50 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      {/* Header content */}
                      <span className='select-none'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>

                      {/* Sort indicator */}
                      <span className="flex-shrink-0 select-none">
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>

                    {/* Column resizer */}
                    <div
                      onDoubleClick={() => header.column.resetSize()}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-4 cursor-col-resize hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                      <div className="absolute right-0 top-0 h-full w-[1px] bg-gray-300" />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='divide-y divide-slate-300'>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    {...{
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    <div className='whitespace-nowrap pl-4'>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                    </div>
                    {/* {flexRender(
                      CellInput(cell.getContext()),
                      cell.getContext()
                    )} */}
                    {/* <Cell context={cell.getContext()}/> */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
