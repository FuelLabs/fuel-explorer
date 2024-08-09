import { Button, RoundedContainer } from '@fuels/ui';
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
      <Button className="w-full bg-brand text-black">View All Blocks</Button>
    </RoundedContainer>
  );
};
