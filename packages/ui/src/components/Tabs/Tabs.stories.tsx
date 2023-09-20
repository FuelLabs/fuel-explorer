import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import { Text } from '../Text/Text';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Usage: Story = {
  render: () => (
    <Box className="w-[600px]">
      <Tabs defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Box className="px-3 pt-3 pb-2">
          <Tabs.Content value="account">
            <Text size="2">Make changes to your account.</Text>
          </Tabs.Content>
          <Tabs.Content value="documents">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>
          <Tabs.Content value="settings">
            <Text size="2">
              Edit your profile or update contact information.
            </Text>
          </Tabs.Content>
        </Box>
      </Tabs>
    </Box>
  ),
};
