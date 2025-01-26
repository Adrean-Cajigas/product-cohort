'use client';

import { useEffect, useState } from "react";
import { CustomerData } from "@/src/utils/types";
import { Suspense } from "react";
import DataTable from "@/src/components/DataTable";
import TestTable from "@/src/components/testTable";
function LoadingTable() {
  return <div>Loading...</div>;
}

function ErrorTable({ error }: { error: string }) {
  return <div>Error: {error}</div>;
}

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

  return <DataTable initialData={data} />;
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
