import { useTranslation } from 'react-i18next';

export const ActionRequiredBadge = () => {
  const { t } = useTranslation();

  return (
    <span className="fuel-label flex cursor-pointer items-center gap-2 text-[var(--fuel-element-high-em)]">
      <span aria-hidden className="fuel-square" />
      {t('portal.history.action_required')}
    </span>
  );
};
