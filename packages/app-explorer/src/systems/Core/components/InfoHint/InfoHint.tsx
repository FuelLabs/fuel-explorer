import { IconInfoCircle, Tooltip } from '@fuels/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type InfoHintProps = {
  content: string;
  label?: string;
  className?: string;
};

export function InfoHint({ content, label, className }: InfoHintProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <Tooltip content={content} open={open} onOpenChange={setOpen}>
      {/* Opens on hover, focus and tap. The button keeps the 20 px icon and a 44 px hit area. */}
      <button
        type="button"
        aria-label={label ?? t('core.info_hint.label')}
        onClick={(event) => {
          event.preventDefault();
          setOpen((prev) => !prev);
        }}
        className={`fuel-hit relative inline-grid size-5 shrink-0 cursor-help place-items-center border-0 bg-transparent p-0 text-[var(--fuel-element-low-em)] transition-colors duration-150 hover:text-heading focus-visible:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fuel-focus)] motion-reduce:transition-none ${className ?? ''}`}
      >
        <IconInfoCircle size={14} />
      </button>
    </Tooltip>
  );
}
