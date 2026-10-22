import { tv } from 'tailwind-variants';

export const heroStyles = tv({
  slots: {
    root: 'relative w-full bg-[var(--fuel-background)]',
    container: 'relative pb-10',
    input: 'w-full tablet:w-[400px]',
    subtitle: ['text-base mb-8 justify-center'],
    // The rows are fixed (not content-sized) so a taller tile or app list can
    // never push the cells past the frame. 147:147:163:163 is the split the
    // content used to settle on.
    // Vertical corner lines stay 24px clear of the pinned nav at every width.
    searchWrapper: [
      'grid-cols-12 laptop:h-[532px]',
      '[--fuel-corner-reach-y:0px] laptop:[--fuel-corner-reach-y:24px]',
      'desktop:[--fuel-corner-reach-y:40px]',
      'laptop:grid-rows-[minmax(0,147fr)_minmax(0,147fr)_minmax(0,163fr)_minmax(0,163fr)]',
    ],
  },
});
