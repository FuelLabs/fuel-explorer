import { LoadingBox } from '@fuels/ui';

// Same box sizes as EcosystemSection, so cards replace it in place.
export function EcosystemSectionSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-5">
      <LoadingBox className="mx-7 h-8 w-48" />
      <div className="grid grid-cols-1 gap-px tablet:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <LoadingBox key={i} className="h-[84px] w-full tablet:h-[112px]" />
        ))}
      </div>
    </div>
  );
}
