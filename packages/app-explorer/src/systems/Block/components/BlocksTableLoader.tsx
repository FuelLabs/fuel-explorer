import { LoadingBox } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

const GRID =
  'grid min-w-[900px] grid-cols-[1fr_1.4fr_1fr_1fr_1.4fr_1.2fr_1.2fr_0.8fr] items-center gap-x-4 px-4';
const HEADS = [
  'col_block',
  'col_blockhash',
  'col_transactions',
  'col_rewards',
  'col_producer',
  'col_efficiency',
  'col_time',
] as const;

export function BlocksTableLoader() {
  const { t } = useTranslation();
  return (
    <div aria-busy="true" className="overflow-x-auto">
      <div className={`${GRID} border-b border-[var(--fuel-line)] py-3`}>
        {HEADS.map((head) => (
          <span key={head} className="fuel-label">
            {t(`block.${head}`)}
          </span>
        ))}
        <span />
      </div>
      {Array.from({ length: 8 }, (_, row) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
          key={row}
          className={`${GRID} fuel-rise border-b border-[var(--fuel-line)] py-4`}
          style={
            { '--fuel-enter-delay': `${Math.min(row, 6) * 40}ms` } as never
          }
        >
          <LoadingBox className="h-5 w-16" />
          <LoadingBox className="h-5 w-[108px]" />
          <LoadingBox className="h-5 w-8" />
          <LoadingBox className="h-5 w-20" />
          <LoadingBox className="h-5 w-[100px]" />
          <LoadingBox className="h-5 w-[6.8rem]" />
          <LoadingBox className="h-5 w-[6.5rem]" />
          <LoadingBox className="h-8 w-16" />
        </div>
      ))}
      <div className="my-4 flex justify-end">
        <LoadingBox className="h-10 w-40" />
      </div>
    </div>
  );
}
