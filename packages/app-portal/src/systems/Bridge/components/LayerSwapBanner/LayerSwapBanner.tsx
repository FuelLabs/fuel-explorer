import { IconArrowUpRight } from '@fuels/ui';

export const LayerSwapBanner = () => {
  return (
    <a
      href="https://app.layerswap.io/app"
      target="_blank"
      rel="noreferrer"
      className="fuel-eyebrow mb-6 inline-flex items-center gap-2 self-start text-[14px] no-underline text-heading transition-colors duration-300 hover:text-[var(--fuel-element-low-em)]"
    >
      Fast bridging with LayerSwap
      <IconArrowUpRight size={14} stroke={1.5} />
    </a>
  );
};
