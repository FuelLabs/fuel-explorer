import { Link, RoundedContainer, cx, useNewKeys } from '@fuels/ui';

import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import { useBlockApps } from '~/systems/Transactions/hooks/useBlockApps';

import { BlockTableTile } from '../BlockTableTile';
interface DataTableProps {
  blocks: GQLBlocksDashboard[];
}

export const DataTable = (props: DataTableProps) => {
  const heights = props.blocks.map((block) => String(block.blockNo));
  const newBlocks = useNewKeys(heights);
  const { apps, isResolving } = useBlockApps(heights);
  return (
    <RoundedContainer className="flex flex-col h-full p-0">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="fuel-label">Recent Blocks</span>
      </div>
      <div className="flex-1 flex flex-col divide-y divide-border">
        {props.blocks.map((block, index) => {
          const height = String(block.blockNo);
          return (
            <Link
              key={block.blockNo}
              isExternal={false}
              href={`/block/${block.blockNo}/simple`}
              className={cx(
                'flex-1 border-0 border-solid hover:no-underline',
                newBlocks.has(height) && 'fuel-row-new',
              )}
            >
              <BlockTableTile
                block={block}
                apps={apps?.[height]}
                appsPending={isResolving && apps?.[height] === undefined}
                appsDelay={Math.min(index, 4) * 0.04}
              />
            </Link>
          );
        })}
      </div>
    </RoundedContainer>
  );
};
export default DataTable;
