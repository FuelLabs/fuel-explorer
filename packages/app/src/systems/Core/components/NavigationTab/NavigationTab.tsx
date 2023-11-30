import { Tabs } from '@fuels/ui';
import type { TabsProps, IconProps } from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type NavigationTabsProps = TabsProps & {
  items: {
    icon: IconProps['icon'];
    value: string;
    label: ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }[];
};

export function NavigationTab({
  items,
  className,
  ...props
}: NavigationTabsProps) {
  const classes = styles();
  return (
    <Tabs {...props} size="1" className={classes.root({ className })}>
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            value={item.value}
            leftIcon={item.icon}
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}

const styles = tv({
  slots: {
    root: [
      'mobile:max-tablet:pb-4',
      'grid gap-2',
      'flex justify-start max-w-full overflow-x-auto',
    ],
  },
});
