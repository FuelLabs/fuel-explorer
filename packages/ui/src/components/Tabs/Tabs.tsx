import { Tabs as RT } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type TabsProps = PropsOf<typeof RT.Root> & { defaultValue: string };
export type TabsListProps = PropsOf<typeof RT.List>;
export type TabsTriggerProps = PropsOf<typeof RT.Trigger> & { value: string };
export type TabsContentProps = PropsOf<typeof RT.Content> & { value: string };

export const TabsRoot = createComponent<TabsProps, typeof RT.Root>({
  id: 'Tabs',
  baseElement: RT.Root,
});

export const TabsList = createComponent<TabsListProps, typeof RT.List>({
  id: 'TabsList',
  baseElement: RT.List,
});

export const TabsTrigger = createComponent<TabsTriggerProps, typeof RT.Trigger>(
  {
    id: 'TabsTrigger',
    baseElement: RT.Trigger,
  },
);

export const TabsContent = createComponent<TabsContentProps, typeof RT.Content>(
  {
    id: 'TabsContent',
    baseElement: RT.Content,
  },
);

export const Tabs = withNamespace(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
