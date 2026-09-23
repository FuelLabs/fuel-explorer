import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import dayjs from 'dayjs';
import { formatBytes, formatGas } from './format';

interface BlockTableProps {
  block: GQLBlocksDashboard;
}

export const BlockTableTile: React.FC<BlockTableProps> = ({ block }) => {
  const blockTime = block.timestamp
    ? dayjs(Number(block.timestamp)).format('HH:mm:ss')
    : '';
  const txCount = Number(block.transactionsCount) || 0;

  return (
    <div className="h-full py-3 px-5 fuel-hover-fill flex flex-col justify-center space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] leading-[20px] font-medium text-heading tabular-nums">
          #{block.blockNo}
        </span>
        <span className="text-[12px] leading-[18px] text-muted">
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
