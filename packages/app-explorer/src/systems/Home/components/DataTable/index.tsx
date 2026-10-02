import { Link, RoundedContainer, cx, useNewKeys } from '@fuels/ui';

import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import { useTranslation } from 'react-i18next';
import { useBlockApps } from '~/systems/Transactions/hooks/useBlockApps';

import { BlockTableTile } from '../BlockTableTile';
interface DataTableProps {
  blocks: GQLBlocksDashboard[];
}

export const DataTable = (props: DataTableProps) => {
  const { t } = useTranslation();
  const heights = props.blocks.map((block) => String(block.blockNo));
  const newBlocks = useNewKeys(heights);
  const { apps, isResolving } = useBlockApps(heights);
  return (
    <RoundedContainer className="flex flex-col h-full p-0">
      <div className="flex items-center justify-between px-5 py-3">
        <span className="fuel-label">{t('home.recent_blocks')}</span>
      </div>
      <div className="flex-1 flex flex-col divide-y divide-border">
        {props.blocks.map((block, index) => {
          const height = String(block.blockNo);
          return (
            <div
              key={block.blockNo}
              className={cx(
                'fuel-hover-fill relative flex-1',
                newBlocks.has(height) && 'fuel-row-new',
              )}
            >
              <Link
                isExternal={false}
                href={`/block/${block.blockNo}/simple`}
                aria-label={t('home.block_link', { number: block.blockNo })}
                className="absolute inset-0 z-0 border-0"
              />
              <div className="relative z-10 h-full pointer-events-none">
                <BlockTableTile
                  block={block}
                  apps={apps?.[height]}
                  appsPending={isResolving && apps?.[height] === undefined}
                  appsDelay={Math.min(index, 4) * 0.04}
                />
              </div>
            </div>
          );
        })}
      </div>
    </RoundedContainer>
  );
};
export default DataTable;
