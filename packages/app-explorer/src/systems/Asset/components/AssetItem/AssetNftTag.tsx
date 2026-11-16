import { useTranslation } from 'react-i18next';

export function AssetNftTag() {
  const { t } = useTranslation();
  return (
    <span className="fuel-label inline-flex h-5 items-center border border-[var(--fuel-border)] px-1.5 text-[11px] leading-none">
      {t('asset.nft_tag')}
    </span>
  );
}
