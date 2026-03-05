import { Link, RoundedContainer } from '@fuels/ui';

import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';

import { BlockTableTile } from '../BlockTableTile';
interface DataTableProps {
  blocks: GQLBlocksDashboard[];
}

export const DataTable = (props: DataTableProps) => {
  return (
    <RoundedContainer className="flex flex-col h-full p-0 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="text-[15px] leading-[24px] text-heading font-semibold">
          Recent Blocks
        </span>
      </div>
      <div className="flex-1 flex flex-col divide-y divide-gray-4 dark:divide-gray-3">
        {props.blocks.map((block, index) => (
          <Link
            key={index}
            isExternal={false}
            href={`/block/${block.blockNo}/simple`}
            className="flex-1"
          >
            <BlockTableTile block={block} />
          </Link>
        ))}
      </div>
    </RoundedContainer>
  );
};
export default DataTable;
