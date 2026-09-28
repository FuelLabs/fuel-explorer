import { LoadingBox } from '@fuels/ui';

// Same box sizes as EcosystemSection, so cards replace it in place.
export function EcosystemSectionSkeleton() {
  return (
    <div aria-hidden>
      <LoadingBox className="h-3 w-32" />
      <LoadingBox className="mt-3 mb-2 h-8 w-56" />
      <LoadingBox className="mb-6 h-5 w-80 max-w-full" />
      <div className="grid grid-cols-1 gap-px min-[720px]:grid-cols-2 desktop:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders
          <LoadingBox key={i} className="h-[113px] tablet:h-[145px] w-full" />
        ))}
      </div>
    </div>
  );
}
