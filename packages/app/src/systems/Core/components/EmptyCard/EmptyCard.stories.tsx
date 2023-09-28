import type { Meta, StoryObj } from '@storybook/react';

import { EmptyCard } from './EmptyCard';

const meta: Meta<typeof EmptyCard> = {
  title: 'Core/EmptyCard',
  component: EmptyCard,
};

export default meta;
type Story = StoryObj<typeof EmptyCard>;

export const Usage: Story = {
  render: () => (
    <EmptyCard className="w-[800px]">
      <EmptyCard.Title>Empty Card</EmptyCard.Title>
      <EmptyCard.Description>
        Use this card when there is no data to show.
      </EmptyCard.Description>
    </EmptyCard>
  ),
};

export const JustTitle: Story = {
  render: () => (
    <EmptyCard className="w-[800px]">
      <EmptyCard.Title>Empty Card</EmptyCard.Title>
    </EmptyCard>
  ),
};

export const JustDescription: Story = {
  render: () => (
    <EmptyCard className="w-[800px]">
      <EmptyCard.Description>
        Use this card when there is no data to show.
      </EmptyCard.Description>
    </EmptyCard>
  ),
};
