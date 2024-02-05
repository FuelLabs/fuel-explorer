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
            className="mx-2"
            href="https://twitter.com/fuel_network"
            target="_blank"
          >
            @fuel_network
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HStack>
            <Avatar
              fallback="R"
              size="3"
              src="https://pbs.twimg.com/profile_images/1651228955301629963/IfYACWA__400x400.jpg"
            />
            <Box>
              <Heading as="h3" size="5">
                Fuel
              </Heading>
              <Text as="div" color="gray" size="2">
                @fuel_network
              </Text>

              <Text as="div" className="max-w-lg" mt="3" size="2">
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
