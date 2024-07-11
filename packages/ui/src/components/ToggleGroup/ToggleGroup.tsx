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

    function onLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
      e.currentTarget.closest('button')?.click();
    }

    return (
      <Item {...props}>
        <Link
          href={href}
          prefetch
          className="h-[inherit]"
          onClick={onLinkClick}
        >
          {children}
        </Link>
      </Item>
    );
  },
});

export const ToggleGroup = withNamespace(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});
