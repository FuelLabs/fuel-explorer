import type { ReactNode } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { createComponent, withNamespace } from '../../utils/component';
import { shortAddress } from '../../utils/helpers';
import type { BoxProps, HStackProps } from '../Box';
import { Box, HStack } from '../Box';
import { Copyable } from '../Copyable';
import { Text } from '../Text';

export type EntityItemVariantProps = VariantProps<typeof styles>;
export type EntityItemProps = Omit<HStackProps, 'size'> &
  EntityItemVariantProps;

export type EntityItemSlotProps = BoxProps;
export type EntityItemInfo = BoxProps & {
  title: ReactNode;
  id?: string;
  shortId?: boolean;
  idPrefix?: ReactNode;
};

export const EntityItemRoot = createComponent<EntityItemProps, typeof HStack>({
  id: 'EntityItem',
  baseElement: HStack,
  render: (Comp, { gap = '2', className, ...props }) => {
    const classes = styles();
    return (
      <Comp {...props} className={classes.root({ className })} gap={gap} />
    );
  },
});

export const EntityItemSlot = createComponent<EntityItemSlotProps, typeof Box>({
  id: 'EntityItemSlot',
  baseElement: Box,
});

export const EntityItemInfo = createComponent<EntityItemInfo, typeof Box>({
  id: 'EntityItemInfo',
  baseElement: Box,
  render: (
    Comp,
    { title, id, children, className, idPrefix, shortId = true, ...props },
  ) => {
    const classes = styles();
    return (
      <Comp {...props} className={classes.info({ className })}>
        <Text as="p" className={classes.name()}>
          {title}
        </Text>
        {id && (
          <Copyable className={classes.copyable()} value={id}>
            {idPrefix}
            {shortId ? shortAddress(id) : id}
          </Copyable>
        )}
        {children}
      </Comp>
    );
  },
});

export const EntityItem = withNamespace(EntityItemRoot, {
  Slot: EntityItemSlot,
  Info: EntityItemInfo,
});

const styles = tv({
  slots: {
    root: 'gap-4 items-center',
    name: 'mt-0 font-medium',
    info: 'flex flex-col justify-center gap-1',
    tag: 'mt-0',
    copyable: 'text-sm text-muted',
    assetId: 'text-sm leading-tight',
  },
});
