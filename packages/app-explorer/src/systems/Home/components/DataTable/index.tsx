import { Link, RoundedContainer, VStack } from '@fuels/ui';

import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';

import { BlockTableTile } from '../BlockTableTile';
interface DataTableProps {
  blocks: GQLBlocksDashboard[];
}

export const DataTable = (props: DataTableProps) => {
  return (
    <RoundedContainer className="flex flex-col justify-between h-full">
      <VStack gap={'0.1'}>
        {Array.from({ length: props.blocks.length }, (_, index) => (
          <Link
            key={index}
            isExternal={false}
            href={`/block/${props.blocks[index].blockNo}/simple`}
          >
            <BlockTableTile block={props.blocks[index]} />
          </Link>
        ))}
      </VStack>
    </RoundedContainer>
  );
};
export default DataTable;
