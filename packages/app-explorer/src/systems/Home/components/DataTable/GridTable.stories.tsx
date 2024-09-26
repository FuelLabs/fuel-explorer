import type { Meta, StoryObj } from '@storybook/react';
import GridTable, { GridTableProps } from './GridTable';
import { columns, data } from './data';

const meta: Meta<typeof GridTable> = {
  title: 'Home/GridTable',
  component: GridTable,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<GridTableProps<any>>;

export const Desktop: Story = {
  args: {
    columns,
    data: data.slice(0, 10),
    totalRows: data.length,
    rowsPerPage: 10,
    pageCount: Math.ceil(data.length / 10),
    onPageChanged: (selectedPage: number) =>
      console.log(`Page changed to: ${selectedPage}`),
  },
};

export const Tablet: Story = {
  args: {
    columns,
    data: data.slice(0, 10),
    totalRows: data.length,
    rowsPerPage: 10,
    pageCount: Math.ceil(data.length / 10),
    onPageChanged: (selectedPage: number) =>
      console.log(`Page changed to: ${selectedPage}`),
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

export const Mobile: Story = {
  args: {
    columns,
    data: data.slice(0, 10),
    totalRows: data.length,
    rowsPerPage: 10,
    pageCount: Math.ceil(data.length / 10),
    onPageChanged: (selectedPage: number) =>
      console.log(`Page changed to: ${selectedPage}`),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};
