import type { Meta, StoryObj } from '@storybook/react';
import { IconCalendar } from '@tabler/icons-react';

import { Button } from '../Button/Button';

import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Usage: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>First</Button>
      <Button leftIcon={IconCalendar}>Second</Button>
      <Button>Third</Button>
    </ButtonGroup>
  ),
};
