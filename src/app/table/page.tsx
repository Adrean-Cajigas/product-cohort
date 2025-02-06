'use client';

import React, { useEffect, useState } from "react";
import { CustomerData } from "@/src/utils/types";
import { Suspense } from "react";
import DataTable from "@/src/components/DataTable";
import TestTable from "@/src/components/testTable";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import CellInput from "@/src/components/CellInput";
import SourceStatus from "@/src/components/SourceChip";
import DestinationStatus from "@/src/components/DestinationChip";
import PaymentFrequencyStatus from "@/src/components/PaymentFrequencyChip";
function LoadingTable() {
  return <div>Loading...</div>;
}

function ErrorTable({ error }: { error: string }) {
  return <div>Error: {error}</div>;
}

const columnHelper = createColumnHelper<CustomerData>();

const columns = [
  columnHelper.accessor('customerName', {
    header: 'Customer Name',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true,
    minSize: 200,
  }),
  columnHelper.accessor('customerID', {
    header: 'Customer ID',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true,
    minSize: 200,
  }),
  columnHelper.accessor('opportunityName', {
    header: 'Opportunity Name',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true,
    minSize: 350
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true
  }),
  columnHelper.accessor('opportunityOwner', {
    header: 'Opportunity Owner',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true,
    minSize: 200
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: info => <SourceStatus defaultSource={info.getValue()} />,
    enableResizing: true,
    minSize: 175
  }),
  columnHelper.accessor('destination', {
    header: 'Destination',
    cell: info => <DestinationStatus defaultDestination={info.getValue()} />,
    enableResizing: true,
    minSize: 175
  }),
  columnHelper.accessor('formula', {
    header: 'Formula',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true
  }),
  columnHelper.accessor('billingEmails', {
    header: 'Billing Emails',
    cell: info => <CellInput defaultValue={info.getValue().join(', ')} />,
    enableResizing: true,
    minSize: 500
  }),
  columnHelper.accessor('billingAddress', {
    header: 'Billing Address',
    cell: info => {
      const address = info.getValue();
      return <CellInput defaultValue={`${address.address}, ${address.city}, ${address.state} ${address.zip}`} />;
    },
    enableResizing: true,
    minSize: 500
  }),
  columnHelper.accessor('paymentFrequency', {
    header: 'Payment Frequency',
    cell: info => <PaymentFrequencyStatus defaultFreq={info.getValue()} />,
    enableResizing: true
  }),
  columnHelper.accessor('netTerms', {
    header: 'Net Terms',
    cell: info => <CellInput defaultValue={info.getValue()} />,
    enableResizing: true
  }),
];


function Table() {
  const [data, setData] = useState<CustomerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/populate');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <ErrorTable error={error} />;
  if (isLoading) return <LoadingTable />;

  return <DataTable 
    initialData={data} 
    columns={columns} 
    enableSorting={true}
    enableGlobalFiltering={true}
  />;
}

export default function TableWrapper() {
  return (
    <>
      <Suspense fallback={<LoadingTable />}>
        <div className="mt-10">
          <Table />
        </div>
      </Suspense>
    </>
  );
}
