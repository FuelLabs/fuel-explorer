import type { Meta, StoryObj } from '@storybook/react';

import type { FlexProps } from '../Box';
import { Flex } from '../Box';

import { ContextMenu } from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Overlay/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const RightClickZone = (props: FlexProps) => {
  return (
    <Flex
      {...props}
      className="items-center justify-center w-[150px] h-[150px] border border-dashed border-border"
    />
  );
};

export const Usage: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger>
        <RightClickZone>Right-click here</RightClickZone>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item shortcut="⌘ E">Edit</ContextMenu.Item>
        <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Move to project…</ContextMenu.Item>
            <ContextMenu.Item>Move to folder…</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Advanced options…</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        <ContextMenu.Item>Share</ContextMenu.Item>
        <ContextMenu.Item>Add to favorites</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item color="red" shortcut="⌘ ⌫">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  ),
};
