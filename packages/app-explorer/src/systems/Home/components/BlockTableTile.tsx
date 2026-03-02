import type { GQLBlocksDashboard } from '@fuel-explorer/graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface BlockTableProps {
  block: GQLBlocksDashboard;
}

function formatBytes(bytes: number | string): string {
  const n = Number(bytes);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} MB`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)} KB`;
  return `${n} B`;
}

function formatGas(gas: number | string): string {
  const n = Number(gas);
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export const BlockTableTile: React.FC<BlockTableProps> = ({ block }) => {
  const timeAgo = block.timestamp
    ? dayjs(Number(block.timestamp)).fromNow(true)
    : '';
  const txCount = Number((block as any).transactionsCount) || 0;

  return (
    <div className="h-full py-3 px-5 hover:bg-gray-3 transition-colors duration-150 flex flex-col justify-center space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] leading-[20px] font-semibold text-heading">
          #{block.blockNo}
        </span>
        <span className="text-[12px] leading-[18px] text-muted">
          {timeAgo ? `${timeAgo} ago` : ''}
        </span>
      </div>
      <div className="flex items-center justify-between text-[12px] leading-[18px] text-muted">
        <span className="font-medium bg-gray-4 dark:bg-gray-5 rounded px-1 py-px">
          {txCount} TX
        </span>
        <span>
          <span className="text-muted">Size </span>
          <span className="text-heading font-medium">
            ~{formatBytes((block as any).blockSize)}
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
          <span className="text-[color:#00F58C] font-medium">
            {block.totalFeeInUsd || `${block.totalFee}`}
          </span>
        </span>
      </div>
    </div>
  );
};
