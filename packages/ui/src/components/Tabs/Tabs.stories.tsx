import type { Meta, StoryObj } from '@storybook/react';
import {
  IconFileDescription,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { Box, VStack } from '../Box';
import { Text } from '../Text/Text';

import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const content = (
  <>
    <Tabs.List>
      <Tabs.Trigger value="account" leftIcon={IconUsers}>
        Account
      </Tabs.Trigger>
      <Tabs.Trigger value="documents" leftIcon={IconFileDescription}>
        Documents
      </Tabs.Trigger>
      <Tabs.Trigger disabled value="settings" leftIcon={IconSettings}>
        Settings
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      <Text size="2">Make changes to your account.</Text>
    </Tabs.Content>
    <Tabs.Content value="documents">
      <Text size="2">Access and update your documents.</Text>
    </Tabs.Content>
    <Tabs.Content value="settings">
      <Text size="2">Edit your profile or update contact information.</Text>
    </Tabs.Content>
  </>
);

export const Usage: Story = {
  render: () => (
    <Box className="w-[600px]">
      <Tabs defaultValue="account">{content}</Tabs>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack gap="6" className="max-w-[500px]">
      <Tabs defaultValue="account" variant="surface">
        {content}
      </Tabs>
      <Tabs defaultValue="account" variant="line">
        {content}
      </Tabs>
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="6" className="max-w-[500px]">
      <Tabs defaultValue="account" size="1">
        {content}
      </Tabs>
      <Tabs defaultValue="account" size="2">
        {content}
      </Tabs>
      <Tabs defaultValue="account" size="3">
        {content}
      </Tabs>
    </VStack>
  ),
};
