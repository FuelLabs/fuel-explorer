import { Tooltip } from '@radix-ui/themes';
import { useMemo } from 'react';
import type { SyntheticEvent } from 'react';
import { IconCheck, IconCopy } from '../Icons';

import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { createComponent } from '../../utils/component';
import type { Colors } from '../../utils/types';
import { Box } from '../Box';
import type { BoxProps } from '../Box';
import type { IconComponent, IconContext } from '../Icon/useIconContext';
import { IconButton } from '../IconButton/IconButton';
import { useCopied } from '../Motion/useCopied';

export type CopyableBaseProps = {
  value: string;
  tooltipMessage?: string;
  icon?: React.ComponentType<Partial<IconContext>>;
  iconSize?: number;
  iconStroke?: number;
  iconClassName?: string;
  iconColor?: Colors;
  iconAriaLabel?: string;
  copiedMessage?: string;
};

export type CopyableProps = Omit<BoxProps, 'asChild'> & CopyableBaseProps;

const styles = tv({
  slots: {
    root: 'inline-flex items-center gap-2',
    icon: 'ml-1',
  },
});

type CopyIconType = IconComponent;

// Both icons stay mounted so the swap is a crossfade driven by data-copied.
function makeSwapIcon(CopyIcon: CopyIconType): CopyIconType {
  return function SwapIcon({ className, ...rest }) {
    return (
      <span className="fuel-copy-swap">
        <CopyIcon {...rest} className={className} />
        <IconCheck {...rest} className={className} />
      </span>
    );
  };
}

export const Copyable = createComponent<CopyableProps, 'span'>({
  id: 'Copyable',
  className: ({ className }) => styles().root({ className }),
  render: (
    _,
    {
      as: Root = 'span',
      children,
      value,
      tooltipMessage,
      icon: CopyIcon = IconCopy,
      iconSize,
      iconStroke,
      iconClassName,
      iconColor = 'text-icon',
      iconAriaLabel,
      copiedMessage,
      ...props
    },
  ) => {
    const { t } = useTranslation();
    const tooltip =
      tooltipMessage ??
      t('ui.copy.tooltip', { defaultValue: 'Click here to copy to clipboard' });
    const idleLabel =
      iconAriaLabel ?? t('ui.copy.aria', { defaultValue: 'Copy to clipboard' });
    const copiedLabel =
      copiedMessage ??
      t('ui.copy.copied', { defaultValue: 'Copied to clipboard' });
    const failedLabel = t('ui.copy.failed', {
      defaultValue: 'Could not copy. Select the text and copy it by hand.',
    });
    const { copied, failed, copy } = useCopied();
    const SwapIcon = useMemo(() => makeSwapIcon(CopyIcon), [CopyIcon]);

    return (
      <Box {...props} as={Root}>
        {children}
        <span role="status" className="sr-only">
          {copied ? copiedLabel : failed ? failedLabel : ''}
        </span>
        <Tooltip
          content={copied ? copiedLabel : failed ? failedLabel : tooltip}
        >
          <IconButton
            aria-label={copied ? copiedLabel : idleLabel}
            className="fuel-hit relative"
            color="gray"
            icon={SwapIcon}
            iconClassName={styles().icon({ className: iconClassName })}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStroke={iconStroke}
            variant="link"
            data-copied={copied ? '' : undefined}
            data-failed={failed ? '' : undefined}
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              copy(value);
            }}
          />
        </Tooltip>
      </Box>
    );
  },
});
