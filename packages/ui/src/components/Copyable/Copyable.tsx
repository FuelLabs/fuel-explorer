import { Tooltip } from '@radix-ui/themes';
import { IconCopy } from '@tabler/icons-react';
import type { SyntheticEvent } from 'react';

import { tv } from 'tailwind-variants';
import { createComponent } from '../../utils/component';
import type { Colors } from '../../utils/types';
import { Box } from '../Box';
import type { BoxProps } from '../Box';
import type { IconContext } from '../Icon/useIconContext';
import { IconButton } from '../IconButton/IconButton';
import { toast } from '../Toast/useToast';

export type CopyableBaseProps = {
  value: string;
  tooltipMessage?: string;
  icon?: React.ComponentType<Partial<IconContext>>;
  iconSize?: number;
  iconStroke?: number;
  iconClassName?: string;
  iconColor?: Colors;
  iconAriaLabel?: string;
};

export type CopyableProps = Omit<BoxProps, 'asChild'> & CopyableBaseProps;

const styles = tv({
  slots: {
    root: 'inline-flex items-center gap-2',
    icon: 'ml-1',
  },
});

export const Copyable = createComponent<CopyableProps, 'span'>({
  id: 'Copyable',
  className: ({ className }) => styles().root({ className }),
  render: (
    _,
    {
      as: Root = 'span',
      children,
      value,
      tooltipMessage = 'Click here to copy to clipboard',
      icon: CopyIcon = IconCopy,
      iconSize,
      iconStroke,
      iconClassName,
      iconColor = 'text-icon',
      iconAriaLabel: ariaLabel = 'Copy to clipboard',
      ...props
    },
  ) => {
    async function handleCopy() {
      await navigator.clipboard.writeText(value);
      toast.success('Copied to clipboard');
    }

    return (
      <Box {...props} as={Root}>
        {children}
        <Tooltip content={tooltipMessage}>
          <IconButton
            aria-label={ariaLabel}
            color="gray"
            icon={CopyIcon}
            iconClassName={styles().icon({ className: iconClassName })}
            iconColor={iconColor}
            iconSize={iconSize}
            iconStroke={iconStroke}
            variant="link"
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              handleCopy();
            }}
          />
        </Tooltip>
      </Box>
    );
  },
});
