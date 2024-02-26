import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { Icon } from '../Icon/Icon';
import type { TextProps } from '../Text/Text';
import { Text } from '../Text/Text';

import { styles } from './styles';
import type { ListContext } from './useListContext';
import { ListProvider, useListContext } from './useListContext';

export type ListBaseProps = PropsOf<'ul'> & { type?: 'none' | 'ol' | 'ul' };
export type ListProps = ListContext & ListBaseProps;
export type ListULProps = Omit<ListProps, 'type'>;
export type ListOLProps = Omit<ListProps, 'type'>;
export type ListItemProps = PropsOf<'li'>;

export const ListRoot = createComponent<ListProps, 'ul'>({
  id: 'List',
  className: ({ className, icon, type = 'none' }) => {
    return styles({ type, withIcon: Boolean(icon) }).root({ className });
  },
  render: (
    _,
    { type = 'none', icon, iconColor, iconSize, iconAriaLabel, ...props },
  ) => {
    const El = type === 'ol' ? 'ol' : 'ul';
    return (
      <ListProvider value={{ icon, iconColor, iconSize, iconAriaLabel }}>
        <El {...props} />
      </ListProvider>
    );
  },
});

export const ListItem = createComponent<ListItemProps, 'li'>({
  id: 'ListItem',
  render: (_, { children, className, ...props }) => {
    const { icon, iconColor, iconSize, iconAriaLabel } = useListContext();
    const classes = styles({ withIcon: Boolean(icon) }).item({ className });
    const iconEl = icon && (
      <Icon
        aria-label={iconAriaLabel}
        color={iconColor}
        icon={icon}
        size={iconSize}
      />
    );
    return (
      <Text as="li" {...(props as TextProps)} className={classes}>
        {iconEl} {children}
      </Text>
    );
  },
});

export const ListUL = createComponent<ListULProps, typeof ListRoot>({
  id: 'ListUL',
  baseElement: ListRoot,
  defaultProps: {
    type: 'ul',
  } as ListProps,
});

export const ListOL = createComponent<ListOLProps, typeof ListRoot>({
  id: 'ListOL',
  baseElement: ListRoot,
  defaultProps: {
    type: 'ol',
  } as ListProps,
});

export const List = withNamespace(ListRoot, {
  UL: ListUL,
  OL: ListOL,
  Item: ListItem,
});
