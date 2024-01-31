import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { PROJECTS } from '../../data';
import type { Project } from '../../types';

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
  render: (args) => (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <ProjectList {...args} />
    </Box.Flex>
  ),
  args: { projects: PROJECTS as Project[] },
};

export const Loading = () => (
  <Box.Flex align="center" justify="center" css={styles.storybook}>
    <ProjectList.Loading />
  </Box.Flex>
);

const styles = {
  storybook: cssObj({
    margin: '20px',
  }),
};
