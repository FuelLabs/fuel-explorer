import type { ButtonProps } from '@fuels/ui';
import { Button, cx, useCopied } from '@fuels/ui';
import { IconCheck, IconCopy } from '@fuels/ui';
import { useTranslation } from 'react-i18next';

type CopyButtonProps = ButtonProps & {
  value: string;
  text?: string;
};

const COPY_ICON_SIZES: Record<string, number> = {
  '1': 15,
  '2': 19,
  '3': 24,
  '4': 29,
};

const ICON_BASE =
  'absolute inset-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-100 motion-reduce:transition-opacity';

const CopyButton = ({ value, text, className, ...props }: CopyButtonProps) => {
  const { t } = useTranslation();
  const size = props.size || '1';
  const variant = props.variant || 'ghost';
  const { copied, failed, copy } = useCopied();
  const copiedLabel = t('ui.copy.copied', {
    defaultValue: 'Copied to clipboard',
  });
  const failedLabel = t('ui.copy.failed', {
    defaultValue: 'Could not copy. Select the text and copy it by hand.',
  });
  const iconSize = COPY_ICON_SIZES[size as string] ?? 15;

  return (
    <Button
      {...props}
      className={cx(
        'max-w-[100px] transition-colors duration-200 motion-reduce:transition-none',
        copied && '!text-[var(--fuel-brand-text)]',
        className,
      )}
      variant={variant}
      size={size}
      color="gray"
      aria-label={
        copied ? copiedLabel : failed ? failedLabel : t('core.copy.aria')
      }
      onClick={() => {
        void copy(value);
      }}
    >
      <span role="status" className="sr-only">
        {copied ? copiedLabel : failed ? failedLabel : ''}
      </span>
      {text ?? t('core.copy.copy')}
      <span
        aria-hidden
        className="relative inline-block shrink-0"
        style={{ width: iconSize, height: iconSize }}
      >
        <IconCopy
          size={iconSize}
          className={cx(
            ICON_BASE,
            copied ? 'scale-50 opacity-0' : 'opacity-100',
          )}
        />
        <IconCheck
          size={iconSize}
          className={cx(
            ICON_BASE,
            copied ? 'opacity-100' : 'scale-50 opacity-0',
          )}
        />
      </span>
    </Button>
  );
};

export default CopyButton;
