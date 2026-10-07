import { useTranslation } from 'react-i18next';

interface PausedContractAlertProps {
  name: string;
}

export const PausedContractAlert = ({ name }: PausedContractAlertProps) => {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      className="fuel-edge fuel-appear flex flex-col gap-2 border border-[var(--fuel-line)] bg-[var(--fuel-card)] p-4"
    >
      <span className="fuel-label flex items-center gap-2 text-[var(--fuel-element-high-em)]">
        <span aria-hidden className="fuel-square" />
        {t('portal.paused.tag')}
      </span>
      <p className="m-0 text-base text-heading">{t('portal.paused.title')}</p>
      <p className="m-0 text-sm text-[var(--fuel-element-mid-em)]">
        {t('portal.paused.module_updating', { name })}
      </p>
      <p className="m-0 text-sm text-[var(--fuel-element-high-em)]">
        {t('portal.paused.no_action')}
      </p>
    </div>
  );
};
