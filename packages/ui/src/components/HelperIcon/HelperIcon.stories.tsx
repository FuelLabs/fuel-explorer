import type { Meta, StoryObj } from '@storybook/react';

import { HelperIcon } from './HelperIcon';

const meta: Meta<typeof HelperIcon> = {
  title: 'Helpers/HelperIcon',
  component: HelperIcon,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HelperIcon>;

export const Usage: Story = {
  render: () => (
    <HelperIcon message="This is a helper message">Some information</HelperIcon>
  ),
};
