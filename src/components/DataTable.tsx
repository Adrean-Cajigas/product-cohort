'use client';
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { CustomerData } from '../utils/types';
import SourceStatus from './SourceChip';
import DestinationStatus from './DestinationChip';
import { useVirtualizer } from '@tanstack/react-virtual';
import PaymentFrequencyStatus from './PaymentFrequencyChip';

type DataTableProps = {
  initialData: CustomerData[]; 
};

const columnHelper = createColumnHelper<CustomerData>();

const columns = [
  columnHelper.accessor('customerName', {
    header: 'Customer Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('customerID', {
    header: 'Customer ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('opportunityName', {
    header: 'Opportunity Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('opportunityOwner', {
    header: 'Opportunity Owner',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: info => <SourceStatus source={info.getValue()} />,
  }),
  columnHelper.accessor('destination', {
    header: 'Destination',
    cell: info => <DestinationStatus destination={info.getValue()} />,
  }),
  columnHelper.accessor('formula', {
    header: 'Formula',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('billingEmails', {
    header: 'Billing Emails',
    cell: info => info.getValue().join(', '),
  }),
  columnHelper.accessor('billingAddress', {
    header: 'Billing Address',
    cell: info => {
      const address = info.getValue();
      return `${address.address}, ${address.city}, ${address.state} ${address.zip}`;
    },
  }),
  columnHelper.accessor('paymentFrequency', {
    header: 'Payment Frequency',
    cell: info => <PaymentFrequencyStatus freq={info.getValue()} />,
  }),
  columnHelper.accessor('netTerms', {
    header: 'Net Terms',
    cell: info => info.getValue(),
  }),
];

const DataTable = ({ initialData }: DataTableProps) => {
  const [data, setData] = React.useState(initialData);
  const [borderSelectedCell, setBorderSelectedCell] = React.useState<string | null>(null);
  const [highlightedCell, setHighlightedCell] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // _valuesCache holds the table values (could be good for live updating a db)
  const { rows } = table.getRowModel()
  // rows.forEach((row, index) => {
  //   console.log(`Row ${index} values:`, row._valuesCache)
  // });


  const visibleColumns = table.getVisibleLeafColumns()

  //The virtualizer needs to know the scrollable container element
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3, //how many columns to render on each side off screen each way (adjust this for performance)
  })

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
    <div className="h-[800px] w-[80vw] mx-auto relative">
      <div className="w-full h-full overflow-auto scrollbar-hide">
        <table className="min-w-full divide-y divide-slate-400 relative bg-neutral-50">
          <thead className="border-b-2 border-gray-300 top-0 bg-gray-800 z-30">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="sticky top-0 z-20">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)] uppercase tracking-wider bg-neutral-50 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className='flex items-center justify-between'>
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <span>
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-300">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-slate-100 transition-colors duration-150">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    onClick={() => {setBorderSelectedCell(cell.id)
                      console.log(cell)
                    }}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-auto relative select-none
                      ${borderSelectedCell === cell.id ? 'border-2 border-blue-500 z-10' : ''}
                    `}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx global>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DataTable;
