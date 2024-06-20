import type { Meta, StoryObj } from '@storybook/react';
import { IconAlertCircle } from '@tabler/icons-react';

import { Icon } from '../Icon/Icon';

import { Box } from 'src/components/Box';
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

export const Variants: Story = {
  render: () => (
    <Box className="flex flex-col gap-4">
      <Alert className="w-[600px]" color="red">
        <Alert.Icon>
          <Icon icon={IconAlertCircle} />
        </Alert.Icon>
        <Alert.Text>You are not authorized to execute this action.</Alert.Text>
      </Alert>
      <Alert className="w-[600px]" color="yellow">
        <Alert.Icon>
          <Icon icon={IconAlertCircle} />
        </Alert.Icon>
        <Alert.Text>Review your changes before submitting.</Alert.Text>
      </Alert>
      <Alert className="w-[600px]" color="green">
        <Alert.Icon>
          <Icon icon={IconAlertCircle} size={24} />
        </Alert.Icon>
        <Alert.Text>You can use bigger icons.</Alert.Text>
        <Alert.Text>As well as add multiple lines of text.</Alert.Text>
      </Alert>
    </Box>
  ),
};
