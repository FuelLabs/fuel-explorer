import type { Meta, StoryObj } from '@storybook/react';
import { IconHome } from '@tabler/icons-react';

import { Icon } from '../Icon/Icon';

import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Usage: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item>
        <Icon className="text-icon" icon={IconHome} />
      </Breadcrumb.Item>
      <Breadcrumb.Item>Components</Breadcrumb.Item>
      <Breadcrumb.Link href="#">Dropdown</Breadcrumb.Link>
    </Breadcrumb>
  ),
};
