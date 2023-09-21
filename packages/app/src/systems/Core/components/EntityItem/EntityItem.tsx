import { Box, HStack } from '@fuel-explorer/ui/Box';
import { Copyable } from '@fuel-explorer/ui/Copyable';
import { Text } from '@fuel-explorer/ui/Text';
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
      <Box className={classes.icon()}>{icon}</Box>
      <Box className={classes.info()}>
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
    info: 'flex flex-col justify-center',
    tag: 'mt-0',
    copyable: 'text-muted',
    assetId: 'text-sm leading-tight',
  },
  variants: {
    size: {
      sm: {
        icon: 'h-8 w-8',
        root: 'fuel-[Text]:leading-[1]',
        copyable: 'text-xs fuel-[Icon]:w-4',
      },
      md: {
        icon: 'h-10 w-10',
      },
      lg: {
        icon: 'h-12 w-12',
      },
    },
  },
});
