import { IconArrowUpRight } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

export const LayerSwapBanner = () => {
  const { t } = useTranslation();

  return (
    <a
      href="https://app.layerswap.io/app"
      target="_blank"
      rel="noreferrer"
      className="fuel-eyebrow mb-6 inline-flex items-center gap-2 self-start text-[14px] no-underline text-heading transition-colors duration-300 hover:text-[var(--fuel-element-low-em)]"
    >
      {t('portal.bridge.layerswap')}
      <IconArrowUpRight size={14} stroke={1.5} />
    </a>
  );
};
