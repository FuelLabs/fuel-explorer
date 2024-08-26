import type { Meta, StoryObj } from '@storybook/react';
import { dummyData } from './data/dummyData';
import { LineGraph } from './lineGraph';

const meta: Meta<typeof LineGraph> = {
  title: 'Graph/LineGraph',
  component: LineGraph,
};

export default meta;
type Story = StoryObj<typeof LineGraph>;

export const Usage: Story = {
  render: () => (
    <LineGraph
      dataProp={dummyData}
      titleProp={'Total Transactions (Cumilative)'}
    />
  ),
};
