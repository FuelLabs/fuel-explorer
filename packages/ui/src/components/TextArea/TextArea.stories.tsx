import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Form/TextArea',
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Usage: Story = {
  render: () => (
    <Box className="max-w-sm">
      <TextArea placeholder="Reply to comment…" resize="both" />
    </Box>
  ),
};
