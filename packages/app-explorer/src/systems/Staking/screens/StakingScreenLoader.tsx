import { LoadingBox } from '@fuels/ui';

// Heights match each loaded tab so the page below does not jump.
export function StakingScreenLoader({
  tab = 'ethereum',
}: { tab?: 'fuel' | 'ethereum' }) {
  if (tab === 'fuel') {
    // The Rig notices wrap, so their height follows the width.
    return (
      <LoadingBox
        aria-hidden
        className="h-[380px] w-full tablet:h-[284px] laptop:h-[260px] desktop:h-[236px]"
      />
    );
  }

  // Wallet card, then the positions / validators / transactions tabs and panel.
  return (
    <div aria-hidden className="flex flex-col pt-4">
      <LoadingBox className="h-[68px] w-full" />
      <LoadingBox className="mt-16 h-[41px] w-full" />
      <LoadingBox className="mt-8 h-[236px] w-full" />
    </div>
  );
}
