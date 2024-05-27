import type { Meta, StoryObj } from '@storybook/react';

import { Flex, Grid, VStack } from '../Box';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
import { TextArea } from '../TextArea/TextArea';

import { Theme } from './Theme';

const meta: Meta<typeof Theme> = {
  title: 'Helpers/Theme',
  component: Theme,
};

export default meta;
type Story = StoryObj<typeof Theme>;

export const Usage: Story = {
  render: () => (
    <Theme accentColor="orange" className="rounded-xl" radius="full">
      <Card className="w-[400px] p-4">
        <VStack>
          <Grid gap="1">
            <Text as="div" mb="1" size="2" weight="bold">
              Feedback
            </Text>
            <TextArea placeholder="Write your feedback…" />
          </Grid>
          <Flex asChild justify="between">
            <label>
              <Text color="gray" size="2">
                Attach screenshot?
              </Text>
              <Switch defaultChecked size="1" />
            </label>
          </Flex>
          <Grid columns="2" gap="2">
            <Button variant="ghost">Back</Button>
            <Button>Send</Button>
          </Grid>
        </VStack>
      </Card>
    </Theme>
  ),
  parameters: {
    layout: 'centered',
  },
};
