'use client';
import React, { useState } from 'react';
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
import ProductTable from "@/src/components/ProductTable";
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Filter, EllipsisVertical, Check } from 'lucide-react'; 
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
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
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const handleSelectAllInColumn = (columnId: string) => {
    setSelectedColumn(columnId);
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger><EllipsisVertical className='w-4 h-4'/></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sort Asc</DropdownMenuItem>
            <DropdownMenuItem>Sort Desc</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>}

      <div className='w-full h-full overflow-x-auto'>
        <div style={{ direction: table.options.columnResizeDirection }}>
        <table
          className='min-w-full divide-y divide-slate-300 relative bg-neutral-50'
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead className='divide-y divide-slate-300 sticky top-0 bg-neutral-50 z-30'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='bg-neutral-300'>
                {headerGroup.headers.map(header => (
                  <th
                    className={`group border-r relative px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider bg-neutral-50 cursor-pointer
                      ${selectedColumn === header.id ? 'bg-blue-50' : 'bg-neutral-50'}`}
                    onClick={() => handleSelectAllInColumn(header.id)}
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

                      <DropdownMenu onOpenChange={(open) => {
                        setOpenDropdownId(open ? header.id : null)
                      }}>
                        <DropdownMenuTrigger className="outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                          <EllipsisVertical 
                            className={`w-4 h-4 transition-opacity ${
                              openDropdownId === header.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            if (header.column.getIsSorted() === 'asc') {
                              header.column.clearSorting();
                            } else {
                              header.column.toggleSorting(false);
                            }
                          }}>
                            <div className="flex items-center justify-between w-full">
                              Sort Asc
                              {header.column.getIsSorted() === 'asc' && <Check className="w-4 h-4 ml-2" />}
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            if (header.column.getIsSorted() === 'desc') {
                              header.column.clearSorting();
                            } else {
                              header.column.toggleSorting(true);
                            }
                          }}>
                            <div className="flex items-center justify-between w-full">
                              Sort Desc
                              {header.column.getIsSorted() === 'desc' && <Check className="w-4 h-4 ml-2" />}
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSelectAllInColumn(header.id)}>Select All</DropdownMenuItem>
                          <DropdownMenuItem>Conditional Formatting</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {/* Column resizer */}
                    <div
                      onDoubleClick={() => header.column.resetSize()}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-4 cursor-col-resize hover:bg-gray-200 active:bg-gray-300 transition-colors"
                    >
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <tr>
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
                <tr>
                  <td colSpan={table.getVisibleLeafColumns().length}>
                    {
                      row.original.products && <ProductTable initialData={row.original.products} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
