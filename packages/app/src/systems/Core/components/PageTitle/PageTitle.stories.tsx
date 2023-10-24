import type { Meta, StoryObj } from '@storybook/react';
import { IconHash } from '@tabler/icons-react';

import { Address } from '../Address/Address';

import { PageTitle } from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: 'Core/PageTitle',
  component: PageTitle,
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Usage: Story = {
  render: () => (
    <PageTitle icon={<IconHash stroke={1.2} size={20} />}>
      Account <Address full id="8fkjv8kwc0jzv1xcunxejkreq92zr4t1vlxzrtta" />
    </PageTitle>
  ),
};
