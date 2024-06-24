import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './Box';
import type { ContainerProps } from './Container';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

const DecorativeBox = (props: ContainerProps) => {
  return (
    <Container
      {...props}
      className={`w-full h-full bg-gray-a4 border border-dashed border-border ${props.className}`}
    />
  );
};

export const UsageContainer: Story = {
  name: 'Container',
  render: () => (
    <Box className="bg-gray-2 rounded-3">
      <Container className="h-[80px]" size="1">
        <DecorativeBox className="h-[80px]" />
      </Container>
    </Box>
  ),
};
