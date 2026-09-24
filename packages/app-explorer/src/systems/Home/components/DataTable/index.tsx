import { Link, RoundedContainer, cx, useNewKeys } from '@fuels/ui';

import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';

import { BlockTableTile } from '../BlockTableTile';
interface DataTableProps {
  blocks: GQLBlocksDashboard[];
}

export const DataTable = (props: DataTableProps) => {
  const newBlocks = useNewKeys(props.blocks.map((b) => String(b.blockNo)));
  return (
    <RoundedContainer className="flex flex-col h-full p-0">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="fuel-label">Recent Blocks</span>
      </div>
      <div className="flex-1 flex flex-col divide-y divide-border">
        {props.blocks.map((block) => (
          <Link
            key={block.blockNo}
            isExternal={false}
            href={`/block/${block.blockNo}/simple`}
            className={cx(
              'flex-1 border-0 border-solid hover:no-underline',
              newBlocks.has(String(block.blockNo)) && 'fuel-row-new',
            )}
          >
            <BlockTableTile block={block} />
          </Link>
        ))}
      </div>
    </RoundedContainer>
  );
};
export default DataTable;
