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

  // _valuesCache holds the table values (could be good for live updating a db)
  const { rows } = table.getRowModel()
  console.log(rows)
  // rows.forEach((row, index) => {
  //   console.log(`Row ${index} values:`, row._valuesCache)
  // });

  const visibleColumns = table.getVisibleLeafColumns()

  //The virtualizers need to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3, //how many columns to render on each side off screen each way (adjust this for performance)
  })

  //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  const virtualColumns = columnVirtualizer.getVirtualItems()
  const virtualRows = rowVirtualizer.getVirtualItems()

  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
  }

  return (
    <div className="h-[800px] w-[90vw] mx-auto relative">
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

      {/*<div>
        <button onClick={
          // col filtering
          () => {
            table.setColumnFilters([
              { id: 'source', value: 'CRM'}
            ])
          }
        }> filter source by CRM </button>
      </div>*/}

      <div className='w-full h-full overflow-x-auto' ref={tableContainerRef}>
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
