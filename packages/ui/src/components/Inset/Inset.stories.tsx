import type { Meta, StoryObj } from '@storybook/react';
import { IconBrandGithub } from '@tabler/icons-react';

import { Flex, HStack, VStack } from '../Box';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

import { Inset } from './Inset';

const meta: Meta<typeof Inset> = {
  title: 'UI/Inset',
  component: Inset,
};

export default meta;
type Story = StoryObj<typeof Inset>;

export const Usage: Story = {
  render: () => (
    <Card className="max-w-xl py-0">
      <HStack align="center" gap="4">
        <Inset side="left">
          <Flex
            align="center"
            className="bg-black/30 border-r border-border h-full p-7"
            justify="center"
          >
            <Icon icon={IconBrandGithub} size={50} />
          </Flex>
        </Inset>

        <VStack className="px-4 py-2 bg-panel" gap="1" justify="center">
          <Text as="div" color="gray" size="2">
            github.com
          </Text>
          <Text size="4">
            Official Node.js SDK for interacting with the AcmeCorp API.
          </Text>
        </VStack>
      </HStack>
    </Card>
  ),
};
