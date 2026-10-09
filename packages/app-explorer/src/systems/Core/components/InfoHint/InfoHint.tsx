import { IconInfoCircle, Tooltip } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

type InfoHintProps = {
  content: string;
  label?: string;
  className?: string;
};

export function InfoHint({ content, label, className }: InfoHintProps) {
  const { t } = useTranslation();
  return (
    <Tooltip content={content}>
      <button
        type="button"
        aria-label={label ?? t('core.info_hint.label')}
        className={`inline-grid size-5 shrink-0 cursor-help place-items-center border-0 bg-transparent p-0 text-[var(--fuel-element-low-em)] transition-colors duration-150 hover:text-heading focus-visible:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fuel-focus)] motion-reduce:transition-none ${className ?? ''}`}
      >
        <IconInfoCircle size={14} />
      </button>
    </Tooltip>
  );
}
