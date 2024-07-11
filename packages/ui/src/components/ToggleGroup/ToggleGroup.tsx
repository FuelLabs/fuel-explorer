import { SegmentedControl as SC } from '@radix-ui/themes';
import Link from 'next/link';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { styles } from './styles';

export type ToggleGroupProps = PropsOf<typeof SC.Root>;
export type ToggleGroupItemProps = PropsOf<typeof SC.Item> & {
  asChild?: boolean;
  href?: string;
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
    if (!href) return <Item {...props}>{children}</Item>;

    const { onClick: _onClick, ...rest } = props;

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
      _onClick?.(e);
      !e.defaultPrevented &&
        e.currentTarget.querySelector('a')?.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
    }

    return (
      <Item onClick={onClick} {...rest}>
        {children}
        <Link
          href={href}
          prefetch
          passHref
          aria-hidden="true"
          className="h-[inherit] absolute invisible"
        />
      </Item>
    );
  },
});

export const ToggleGroup = withNamespace(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});
