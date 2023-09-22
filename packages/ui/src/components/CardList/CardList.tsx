import { createComponent, withNamespace } from '../../utils/component';
import { HStack, VStack } from '../Box';
import type { VStackProps } from '../Box';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card';
import { Focus } from '../Focus/Focus';

import { styles } from './styles';
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
    {
      className,
      children,
      isActive,
      rightEl,
      autoFocus: initAutoFocus,
      ...props
    },
  ) => {
    const ctx = useCardListContext();
    const isClickable = Boolean(props.onClick || ctx.isClickable);
    const classes = styles({ clickable: isClickable });
    return (
      <Comp
        {...props}
        autoFocus={initAutoFocus || ctx.autoFocus}
        className={classes.root({ className })}
        tabIndex={isClickable ? 0 : undefined}
      >
        {isActive && <span className={classes.activeMark()} />}
        <HStack align="center" className="flex-1" gap="4">
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
