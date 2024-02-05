import { Tabs } from '@fuels/ui';
import type { IconProps, TabsProps } from '@fuels/ui';
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type TabItem = {
  icon: IconProps['icon'];
  value: string;
  label: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

type NavigationTabsProps = TabsProps & {
  renderTab?: (children: ReactNode, item: TabItem) => ReactNode;
  items: TabItem[];
};

export function NavigationTab({
  items,
  className,
  renderTab,
  ...props
}: NavigationTabsProps) {
  const classes = styles();
  return (
    <Tabs {...props} size="1" className={classes.root({ className })}>
      <Tabs.List>
        {items.map((item) => {
          const tabItem = (
            <Tabs.Trigger
              value={item.value}
              leftIcon={item.icon}
              disabled={item.disabled}
              onClick={item.onClick}
            >
              {item.label}
            </Tabs.Trigger>
          );
          return (
            <Fragment key={item.value}>
              {renderTab ? renderTab(tabItem, item) : tabItem}
            </Fragment>
          );
        })}
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
