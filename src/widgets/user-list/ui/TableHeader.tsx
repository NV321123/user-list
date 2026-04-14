import { memo } from 'react';
import { TableHead, TableHeader, TableRow } from '@/shared/ui/table';

export const TableHeaderRow = memo(() => {
  console.log('Render: Table Header');
  return (
    <TableHeader>
      <TableRow>
        <TableHead scope="col">Username</TableHead>
        <TableHead scope="col">Address</TableHead>
        <TableHead scope="col">Email</TableHead>
        <TableHead scope="col" className="text-right w-25">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';