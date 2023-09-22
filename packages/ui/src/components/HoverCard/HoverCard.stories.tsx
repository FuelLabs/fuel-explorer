import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../Avatar/Avatar';
import { Box, HStack } from '../Box';
import { Heading } from '../Heading/Heading';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';

import { HoverCard } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Overlay/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Usage: Story = {
  render: () => (
    <Text>
      Follow{' '}
      <HoverCard>
        <HoverCard.Trigger>
          <Link
            href="https://twitter.com/fuel_network"
            target="_blank"
            className="mx-2"
          >
            @fuel_network
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HStack>
            <Avatar
              size="3"
              fallback="R"
              src="https://pbs.twimg.com/profile_images/1651228955301629963/IfYACWA__400x400.jpg"
            />
            <Box>
              <Heading size="5" as="h3">
                Fuel
              </Heading>
              <Text as="div" size="2" color="gray">
                @fuel_network
              </Text>

              <Text as="div" size="2" mt="3" className="max-w-lg">
                The fastest execution layer.
              </Text>
            </Box>
          </HStack>
        </HoverCard.Content>
      </HoverCard>{' '}
      for updates.
    </Text>
  ),
};
