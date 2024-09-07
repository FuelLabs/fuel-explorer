import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  argTypes: {
    step: {
      control: {
        type: 'range',
        min: 1,
        max: 3,
        step: 1,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Usage: Story = {
  render: ({ step }) => {
    return (
      <Stepper step={step}>
        <Stepper.Item>
          <Stepper.ItemIcon />
          Allowance
        </Stepper.Item>
        <Stepper.Item>
          <Stepper.ItemIcon />
          Validator
        </Stepper.Item>
        <Stepper.Item>
          <Stepper.ItemIcon />
          Convert
        </Stepper.Item>
      </Stepper>
    );
  },
  args: {
    step: 2,
  },
};
