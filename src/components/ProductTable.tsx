import {CustomerData, ProductFeatures} from "@/src/utils/types";
import CellInput from "@/src/components/CellInput";
import SourceStatus from "@/src/components/SourceChip";
import DestinationStatus from "@/src/components/DestinationChip";
import PaymentFrequencyStatus from "@/src/components/PaymentFrequencyChip";
import React from "react";
import {
  createColumnHelper, flexRender,
  getCoreRowModel, getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import {useVirtualizer} from "@tanstack/react-virtual";

type DataTableProps = {
  initialData: ProductFeatures[];
};

const columnHelper = createColumnHelper<ProductFeatures>();

const columns = [
  columnHelper.accessor('productName', {
    header: 'Product Name',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true,
    minSize: 200,
  }),
  columnHelper.accessor('startDate', {
    header: 'Start Date',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true,
    minSize: 350
  }),
  columnHelper.accessor('endDate', {
    header: 'End Date',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: info => <CellInput defaultValue={info.getValue()?.toString() ?? "1"} />,
    enableResizing: true
  }),
  columnHelper.accessor('unitPrice', {
    header: 'Unit Price',
    cell: info => <CellInput defaultValue={info.getValue()?.toString() ?? "N/A"} />,
    enableResizing: true
  }),
  columnHelper.accessor('salePrice', {
    header: 'Sale Price',
    cell: info => <CellInput defaultValue={info.getValue().toString()} />,
    enableResizing: true
  }),
];


export default function ProductTable({ initialData }: DataTableProps) {
  const [data, setData] = React.useState(initialData);
  const [borderSelectedCell, setBorderSelectedCell] = React.useState<string | null>(null);
  const [highlightedCell, setHighlightedCell] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilterVal, setGlobalFilterVal] = React.useState<string>('');
  const [globalFilter, setGlobalFilter] = React.useState<string>('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
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
    <div className="w-[90vw] mx-auto relative">
      <div>
        <input
          type="text"
          placeholder="Enter text here"
          onChange={(e) => {
            // Handle textbox input changes if needed
            setGlobalFilterVal(e.target.value); // TODO: add custom global filter function if we want to search nested tables too
          }}
        />
        <button onClick={
          // global filtering
          () => {
            table.setGlobalFilter([globalFilterVal])
          }
        }> filter by text
        </button>
      </div>

      <div className='w-full h-full overflow-x-auto'>
        <div style={{ direction: table.options.columnResizeDirection }}>
          <table
            className='min-w-full'
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className='sticky top-0 z-20'>
                {headerGroup.headers.map(header => (
                  <th
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
            <tbody>
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
                    <div className='whitespace-nowrap'>
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
}
