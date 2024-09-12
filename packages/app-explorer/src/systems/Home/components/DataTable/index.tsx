import { Button, RoundedContainer } from '@fuels/ui';
import Link from 'next/link';
import React from 'react';
import { TableTile } from '../TableCell/TableTile';

export const DataTable = () => {
  return (
    <RoundedContainer className="flex flex-col justify-between h-full">
      <div className="space-y-[4px] h-full">
        {Array.from({ length: 4 }, (_, index) => (
          <TableTile key={index} />
        ))}
      </div>
      <Link href="/blocks" passHref>
        <Button className="w-full bg-green-9 text-black py-1">
          View All Blocks
        </Button>
      </Link>
    </RoundedContainer>
  );
};
