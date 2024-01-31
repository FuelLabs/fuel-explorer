import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

import { PROJECTS } from '../../data';
import type { Project } from '../../types';

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
  render: (args) => (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <ProjectItem {...args} />
    </Box.Flex>
  ),
  args: PROJECTS[0] as Project,
};

const styles = {
  storybook: cssObj({
    margin: '20px',
    width: 465,
    '.fuel_Card': {
      flex: 1,
    },
  }),
};

export const Loader = () => (
  <Box.Flex align="center" justify="center" css={styles.storybook}>
    <ProjectItem.Loader />
  </Box.Flex>
);
