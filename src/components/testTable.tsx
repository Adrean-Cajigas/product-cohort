import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

type Person = {
  firstName: string;
  lastName: string;
  age?: number;
};

const initialData: Person[] = [
  { firstName: 'John', lastName: 'Doe', age: 30 },
  { firstName: 'Jane', lastName: 'Smith', age: 28 },
];

export default function TestTable() {
  const [data] = useState(initialData);
  const [columns, setColumns] = useState<ColumnDef<Person>[]>([
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
  ]);
  const [newColumn, setNewColumn] = useState({
    header: '',
    accessor: '',
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumn.header || !newColumn.accessor) return;

    const columnExists = columns.some(
      (col) => (col as { accessorKey: string }).accessorKey === newColumn.accessor
    );

    if (!columnExists) {
      setColumns((prev) => [
        ...prev,
        {
          accessorKey: newColumn.accessor,
          header: newColumn.header,
        },
      ]);
      setNewColumn({ header: '', accessor: '' });
    }
  };

  return (
    <div>
      <form onSubmit={handleAddColumn} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Column Header"
          value={newColumn.header}
          onChange={(e) =>
            setNewColumn((prev) => ({ ...prev, header: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Accessor Key"
          value={newColumn.accessor}
          onChange={(e) =>
            setNewColumn((prev) => ({ ...prev, accessor: e.target.value }))
          }
        />
        <button type="submit">Add Column</button>
      </form>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};