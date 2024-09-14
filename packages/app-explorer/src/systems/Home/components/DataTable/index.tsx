import { Button, RoundedContainer, VStack } from '@fuels/ui';
import Link from 'next/link';
import React from 'react';
import { Block } from '../../interface/blocks.interface';
import { BlockTableTile } from '../BlockTableTile';
interface DataTableProps {
  blocks: Block[];
}

export const DataTable = (props: DataTableProps) => {
  return (
    <RoundedContainer className="flex flex-col justify-between h-full">
      <VStack gap={'0.1'}>
        {Array.from({ length: props.blocks.length }, (_, index) => (
          <BlockTableTile block={props.blocks[index]} />
        ))}
      </VStack>
      <Link href="/blocks" passHref>
        <Button className="w-full bg-green-9 text-black py-0.5">
          View All Blocks
        </Button>
      </Link>
    </RoundedContainer>
  );
};
