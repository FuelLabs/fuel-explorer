import { LoadingBox } from '@fuels/ui';

// Holds the board's header and first row while its chunk loads.
export function TransfersBoardSkeleton() {
  return (
    <div aria-hidden className="fuel-edge min-w-0">
      <div className="px-6 pt-8 pb-6 tablet:px-10">
        <LoadingBox className="h-8 w-64" />
      </div>
      <div className="border-t border-[var(--fuel-border)] px-6 py-4 tablet:px-10">
        <LoadingBox className="h-6 w-full max-w-[420px]" />
      </div>
    </div>
  );
}
