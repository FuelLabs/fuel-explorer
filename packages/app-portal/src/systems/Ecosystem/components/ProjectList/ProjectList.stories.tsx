import type { Meta, StoryObj } from '@storybook/react';

import { PROJECTS } from '../../data';
import type { Project } from '../../types';

import { Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { ProjectList } from './ProjectList';

const meta: Meta<typeof ProjectList> = {
  component: ProjectList,
  title: 'Ecosystem / ProjectList',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ProjectList>;

export const Usage: Story = {
  render: (args: any) => {
    const classes = styles();
    return (
      <Flex align="center" justify="center" className={classes.storybook()}>
        <ProjectList {...args} />
      </Flex>
    );
  },
  args: { projects: PROJECTS as Project[] },
};

export const Loading = () => {
  const classes = styles();

  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <ProjectList.Loading />
    </Flex>
  );
};

export const styles = tv({
  slots: {
    storybook: 'm-20',
  },
});
