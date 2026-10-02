import { LoadingBox } from '@fuels/ui';

// LoadingBox sweeps a shimmer across itself; under reduced motion it stays a still fill.
const STILL = 'motion-reduce:before:hidden';

// Same box sizes as EcosystemSection, so cards replace it in place. Six boxes
// fill the same rows as the six suite apps at every column count.
export function EcosystemSectionSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-5">
      {/* The pt matches the "Quick access" eyebrow the first section carries. */}
      <div className="px-7 pt-[15px]">
        <LoadingBox className={`h-8 w-48 ${STILL}`} />
      </div>
      <div className="grid grid-cols-1 gap-px tablet:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingBox
            key={i}
            className={`h-[84px] w-full tablet:h-[112px] ${STILL}`}
          />
        ))}
      </div>
    </div>
  );
}
