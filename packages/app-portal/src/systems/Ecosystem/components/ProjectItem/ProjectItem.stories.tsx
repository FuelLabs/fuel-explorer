import type { Meta, StoryObj } from '@storybook/react';

import { PROJECTS } from '../../data';
import type { Project } from '../../types';

import { Flex } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { ProjectItem } from './ProjectItem';

const meta: Meta<typeof ProjectItem> = {
  component: ProjectItem,
  title: 'Ecosystem / ProjectItem',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProjectItem>;

export const Usage: Story = {
  render: (args: any) => {
    const classes = styles();
    return (
      <Flex align="center" justify="center" className={classes.storybook()}>
        <ProjectItem {...args} />
      </Flex>
    );
  },
  args: PROJECTS[0] as Project,
};

export const Loader = () => {
  const classes = styles();
  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <ProjectItem.Loader />
    </Flex>
  );
};

export const styles = tv({
  slots: {
    storybook: [
      'm-6 w-[465px]',
      // {
      //   '.fuel_Card': 'flex-1',
      // },
    ],
  },
});
