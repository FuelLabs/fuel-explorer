import type { Meta, StoryObj } from '@storybook/react';
import { IconHome } from '@tabler/icons-react';

import { Theme } from '../Theme/Theme';

import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Usage: Story = {
  render: () => <Icon color="text-icon" icon={IconHome} />,
};

export const WithTheme: Story = {
  render: () => (
    <Theme accentColor="orange" iconSize={24}>
      <Icon color="text-accent" icon={IconHome} />
    </Theme>
  ),
};
