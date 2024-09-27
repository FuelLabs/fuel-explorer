import { Button, Link, RoundedContainer, VStack } from '@fuels/ui';

import NextLink from 'next/link';
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
          <Link
            as={NextLink}
            key={index}
            isExternal={false}
            href={`/block/${props.blocks[index].blockNo}/simple`}
          >
            <BlockTableTile block={props.blocks[index]} />
          </Link>
        ))}
      </VStack>
      <Link href="/blocks">
        <Button className="w-full bg-green-9 text-black py-0.5">
          View All Blocks
        </Button>
      </Link>
    </RoundedContainer>
  );
};
export default DataTable;
