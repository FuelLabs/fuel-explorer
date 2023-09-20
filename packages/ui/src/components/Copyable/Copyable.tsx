import { Tooltip } from '@radix-ui/themes';
import { IconCopy } from '@tabler/icons-react';
import { createPolymorphicComponent } from '~/utils/component';
import type { Colors } from '~/utils/types';

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

export type CopyableProps = BoxProps & CopyableBaseProps;

export const Copyable = createPolymorphicComponent<CopyableProps, typeof Box>({
  id: 'Copyable',
  className: 'inline-flex items-center gap-2',
  baseElement: Box,
  render: (
    Comp,
    {
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
      <Comp {...props}>
        {children}
        <Tooltip content={tooltipMessage}>
          <IconButton
            color="gray"
            onClick={handleCopy}
            variant="link"
            icon={CopyIcon}
            aria-label={ariaLabel}
            iconSize={iconSize}
            iconStroke={iconStroke}
            iconColor={iconColor}
            iconClassName={iconClassName}
          />
        </Tooltip>
      </Comp>
    );
  },
  defaultProps: {
    as: 'span',
  },
});
