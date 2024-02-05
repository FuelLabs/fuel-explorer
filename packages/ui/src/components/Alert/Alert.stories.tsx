import type { Meta, StoryObj } from '@storybook/react';
import { IconAlertCircle } from '@tabler/icons-react';

import { Icon } from '../Icon/Icon';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Usage: Story = {
  render: () => (
    <Alert className="w-[600px]">
      <Alert.Icon>
        <Icon icon={IconAlertCircle} />
      </Alert.Icon>
      <Alert.Text>
        You will need admin privileges to install and access this application.
      </Alert.Text>
    </Alert>
  ),
};
