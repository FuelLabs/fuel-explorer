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
    <div className="h-full py-3 px-5 hover:bg-gray-3 transition-colors duration-150 flex flex-col justify-center space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] leading-[20px] font-semibold text-heading">
          #{block.blockNo}
        </span>
        <span className="text-[12px] leading-[18px] text-muted">
          {blockTime}
        </span>
      </div>
      <div className="flex items-center justify-between text-[12px] leading-[18px] text-muted">
        <span className="font-medium bg-gray-4 dark:bg-gray-5 rounded px-1 py-px">
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
            <span className="text-[color:#00F58C] font-medium">
              {block.totalFeeInUsd || '$0'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
