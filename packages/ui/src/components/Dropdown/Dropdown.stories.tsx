import type { Meta, StoryObj } from '@storybook/react';
import { IconChevronDown } from '@tabler/icons-react';

import { Button } from '../Button/Button';

import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Overlay/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Usage: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button rightIcon={IconChevronDown} variant="ghost">
          Options
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item shortcut="⌘ E">Edit</Dropdown.Item>
        <Dropdown.Item shortcut="⌘ D">Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item shortcut="⌘ N">Archive</Dropdown.Item>
        <Dropdown.Sub>
          <Dropdown.SubTrigger>More</Dropdown.SubTrigger>
          <Dropdown.SubContent>
            <Dropdown.Item>Move to project…</Dropdown.Item>
            <Dropdown.Item>Move to folder…</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Advanced options…</Dropdown.Item>
          </Dropdown.SubContent>
        </Dropdown.Sub>
        <Dropdown.Separator />
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item>Add to favorites</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item color="red" shortcut="⌘ ⌫">
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  ),
};
