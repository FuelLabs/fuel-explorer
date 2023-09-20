import { createComponent, withNamespace } from '~/utils/component';

import { HStack, VStack } from '../Box';
import type { VStackProps } from '../Box';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card';
import { Focus } from '../Focus/Focus';

import { CardListContext, useCardListContext } from './useCardListContext';

export type CardListProps = VStackProps &
  Omit<CardListContext, 'isFocused' | 'children'>;
export type CardListItemProps = CardProps & {
  isActive?: boolean;
  rightEl?: React.ReactNode;
};

export const CardListRoot = createComponent<CardListProps, typeof VStack>({
  id: 'CardList',
  baseElement: VStack,
  render: (Comp, { children, gap = '3', isClickable, autoFocus, ...props }) => {
    return (
      <CardListContext.Provider value={{ isClickable, autoFocus }}>
        <Comp gap={gap} {...props}>
          {isClickable ? (
            <Focus.ArrowNavigator autoFocus={autoFocus}>
              {children}
            </Focus.ArrowNavigator>
          ) : (
            children
          )}
        </Comp>
      </CardListContext.Provider>
    );
  },
});

export const CardListItem = createComponent<CardListItemProps, typeof Card>({
  id: 'CardListItem',
  baseElement: Card,
  render: (
    Comp,
    { children, isActive, rightEl, autoFocus: initAutoFocus, ...props },
  ) => {
    const ctx = useCardListContext();
    const isClickable = Boolean(props.onClick || ctx.isClickable);
    return (
      <Comp
        {...props}
        data-is-active={isActive}
        autoFocus={initAutoFocus || ctx.autoFocus}
        data-is-clickable={isClickable}
        tabIndex={isClickable ? 0 : undefined}
      >
        <HStack align="center" gap="4" className="flex-1">
          {children}
        </HStack>
        {rightEl}
      </Comp>
    );
  },
});

export const CardList = withNamespace(CardListRoot, {
  Item: CardListItem,
});
