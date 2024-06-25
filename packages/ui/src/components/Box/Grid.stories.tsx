import type { Meta, StoryObj } from '@storybook/react';

import type { GridProps } from './';
import { Box, Grid } from './';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Box>;

const DecorativeBox = (props: GridProps) => {
  return (
    <Grid
      {...props}
      className={`w-full h-full bg-gray-a4 border border-dashed border-border ${props.className}`}
    />
  );
};

export const Usage: Story = {
  name: 'Grid',
  render: () => (
    <Grid columns="3" gap="3" width="auto">
      <Box height="64px">
        <DecorativeBox />
      </Box>
      <Box height="64px">
        <DecorativeBox />
      </Box>
      <Box height="64px">
        <DecorativeBox />
      </Box>
      <Box height="64px">
        <DecorativeBox />
      </Box>
      <Box height="64px">
        <DecorativeBox />
      </Box>
      <Box height="64px">
        <DecorativeBox />
      </Box>
    </Grid>
  ),
};
