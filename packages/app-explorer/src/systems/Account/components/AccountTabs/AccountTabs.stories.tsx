import type { Meta, StoryObj } from '@storybook/react';

import { AccountTabs } from './AccountTabs';

const meta: Meta<typeof AccountTabs> = {
  title: 'Account/AccountTabs',
  component: AccountTabs,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AccountTabs>;

export const Usage: Story = {
  render: () => <AccountTabs address="1" />,
};
