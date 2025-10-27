import { SegmentedControl as SC } from '@radix-ui/themes';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { styles } from './styles';

export type ToggleGroupProps = PropsOf<typeof SC.Root>;
export type ToggleGroupItemProps = PropsOf<typeof SC.Item> & {
  asChild?: boolean;
  href?: string;
  disabled?: boolean;
};

export const ToggleGroupRoot = createComponent<
  ToggleGroupProps,
  typeof SC.Root
>({
  id: 'ToggleGroup',
  baseElement: SC.Root,
});

export const ToggleGroupItem = createComponent<
  ToggleGroupItemProps,
  typeof SC.Item
>({
  id: 'ToggleGroupItem',
  baseElement: SC.Item,
  className: ({ className }) => styles().item({ className }),
  render: (Item, { children, href, ...props }) => {
    const {
      onClick: _onClick,
      disabled,
      className: inputClassName,
      ...rest
    } = props;
    const className = disabled
      ? `${disabledClassNames} ${inputClassName}`
      : inputClassName;

    if (!href)
      return (
        <Item {...props} className={className}>
          {children}
        </Item>
      );

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
      _onClick?.(e);
    }

    return (
      <Item
        onClick={onClick}
        aria-disabled={disabled}
        {...rest}
        className={className}
      >
        {children}
      </Item>
    );
  },
});

export const ToggleGroup = withNamespace(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});

const disabledClassNames = 'opacity-50 cursor-not-allowed';
