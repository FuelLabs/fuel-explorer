import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import dayjs from 'dayjs';
import { TxAppTag } from '~/systems/Transactions/components/TxAppTag/TxAppTag';
import type { TxApp } from '~/systems/Transactions/utils/txAppsCache';
import { formatBytes, formatGas } from './format';

interface BlockTableProps {
  block: GQLBlocksDashboard;
  apps?: TxApp[];
  appsPending?: boolean;
  appsDelay?: number;
}

export const BlockTableTile: React.FC<BlockTableProps> = ({
  block,
  apps,
  appsPending,
  appsDelay,
}) => {
  const blockTime = block.timestamp
    ? dayjs(Number(block.timestamp)).format('HH:mm:ss')
    : '';
  const txCount = Number(block.transactionsCount) || 0;

  return (
    <div className="h-full py-3 px-5 flex flex-col justify-center space-y-2">
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-[13px] leading-[20px] font-medium text-heading tabular-nums">
          #{block.blockNo}
        </span>
        <span className="min-w-0 flex-1">
          <TxAppTag dense apps={apps} pending={appsPending} delay={appsDelay} />
        </span>
        <span className="shrink-0 text-[12px] leading-[18px] text-muted">
          {blockTime}
        </span>
      </div>
      <div className="flex items-center justify-between text-[12px] leading-[18px] text-muted">
        <span className="fuel-eyebrow bg-[var(--fuel-muted)] px-1.5 py-1">
          {txCount} TX
        </span>
        <div className="flex items-center gap-3">
          <span>
            <span className="text-muted">Size </span>
            <span className="text-heading font-medium">
              ~{formatBytes(block.blockSize)}
            </span>
          </span>
          <span>
            <span className="text-muted">Gas </span>
            <span className="text-heading font-medium">
              {formatGas(block.gasUsed)}
            </span>
          </span>
          <span>
            <span className="text-muted">Fee </span>
            <span className="text-[var(--fuel-brand-text)] font-medium">
              {block.totalFeeInUsd || '$0'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
