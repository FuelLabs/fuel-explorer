import { Box, Flex, HStack } from 'pn-ui-primitives/Box';
import { Copyable } from 'pn-ui-primitives/Copyable';
import { Text } from 'pn-ui-primitives/Text';
import type { ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { shortAddress } from '../../utils/address';

type EntityItemProps = VariantProps<typeof styles> & {
  icon: ReactNode;
  title: ReactNode;
  id: string;
};

export function EntityItem({ icon, title, id, size = 'md' }: EntityItemProps) {
  const classes = styles({ size });
  return (
    <HStack gap="2" className={classes.root()}>
      <Flex className={classes.icon()}>{icon}</Flex>
      <Box>
        <Text as="p" className={classes.name()}>
          {title}
        </Text>
        <Copyable value={id} className={classes.copyable()}>
          {shortAddress(id)}
        </Copyable>
      </Box>
    </HStack>
  );
}

export const styles = tv({
  slots: {
    root: 'items-center gap-4',
    icon: '[&_*]:h-full [&_*]:w-full',
    name: 'mt-0 font-medium',
    tag: 'mt-0',
    copyable: 'text-muted',
    assetId: 'text-sm leading-tight',
  },
  variants: {
    size: {
      sm: {
        icon: 'h-6 w-6',
        copyable: 'text-xs',
      },
      md: {
        icon: 'h-7 w-7 items-center',
      },
      lg: {
        icon: 'h-8 w-8',
      },
    },
  },
});
