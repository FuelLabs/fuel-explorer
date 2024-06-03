import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { IconArrowRight } from '@tabler/icons-react';

import { Avatar } from '../Avatar/Avatar';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../IconButton/IconButton';

import { CardList } from './CardList';

const meta: Meta<typeof CardList> = {
  title: 'UI/CardList',
  component: CardList,
};

export default meta;
type Story = StoryObj<typeof CardList>;

export const Usage: Story = {
  render: () => (
    <CardList className="max-w-sm">
      <CardList.Item
        isActive
        as={'div' as const}
        rightEl={
          <IconButton
            icon={IconArrowRight}
            iconColor="text-brand"
            variant="link"
          />
        }
        onClick={action('onClick')}
      >
        <Avatar
          fallback="Colm Tuite"
          size="3"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        />
        <Heading size="5">Colm Tuite</Heading>
      </CardList.Item>
      <CardList.Item>
        <Avatar
          fallback="Colm Tuite"
          size="3"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        />
        <Heading size="5">Colm Tuite</Heading>
      </CardList.Item>
    </CardList>
  ),
};
