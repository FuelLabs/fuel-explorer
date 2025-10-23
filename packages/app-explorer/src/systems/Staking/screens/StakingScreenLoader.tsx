import { LoadingBox } from '@fuels/ui';

export function StakingScreenLoader({
  hideAccBadge,
}: { hideAccBadge?: boolean }) {
  return (
    <div>
      <div className="mb-6 flex flex-col">
        {!hideAccBadge && (
          <LoadingBox className="w-40 h-[36px] self-end mb-4" />
        )}
        <article
          className={`${hideAccBadge ? 'mt-2' : ''} rt-Box rt-reset rt-BaseCard rt-Card rt-r-size-1 rt-variant-surface flex flex-col gap-4 bg-panel-solid overflow-clip p-6 fuel-Card fuel-Box h-[86px] fuel-Skeleton rt-Skeleton" />`}
        />
      </div>
    </div>
  );
}
