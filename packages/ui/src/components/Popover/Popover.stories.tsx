import type { Meta, StoryObj } from '@storybook/react';
import { IconMessageDots } from '@tabler/icons-react';

import { Avatar } from '../Avatar/Avatar';
import { Box, Flex, HStack } from '../Box';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { TextArea } from '../TextArea/TextArea';

import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Usage: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost">
          <Icon icon={IconMessageDots} />
          Comment
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[300px]">
        <HStack>
          <Avatar
            fallback="A"
            radius="full"
            size="2"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          />
          <Box>
            <TextArea className="w-full" placeholder="Write a comment…" />
            <HStack className="mt-3" justify="between">
              <Flex asChild align="center" gap="2">
                <label>
                  <Checkbox />
                  <Text size="2">Send to group</Text>
                </label>
              </Flex>

              <Popover.Close>
                <Button size="1">Comment</Button>
              </Popover.Close>
            </HStack>
          </Box>
        </HStack>
      </Popover.Content>
    </Popover>
  ),
};
