import { LoadingBox } from '@fuels/ui';

// Heights match each loaded tab so the page below does not jump.
export function StakingScreenLoader({
  tab = 'ethereum',
}: { tab?: 'fuel' | 'ethereum' }) {
  if (tab === 'fuel') {
    // The Rig card measures 196 px stacked and 136 px in one row from tablet up.
    return (
      <LoadingBox aria-hidden className="h-[196px] w-full tablet:h-[136px]" />
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
