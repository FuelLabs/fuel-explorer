import { cssObj } from '@fuel-ui/css';
import { Grid } from '@fuel-ui/react';

import { type Project } from '../../types';
import { ProjectItem } from '../ProjectItem';

import { ProjectListEmpty } from './ProjectListEmpty';
import { ProjectListLoading } from './ProjectListLoading';

type ProjectListProps = {
  projects: Project[];
  isLoading?: boolean;
  emptyText?: string;
  onSelect?: (project: Project) => void;
};

export const ProjectList = ({
  projects,
  isLoading,
  emptyText,
  onSelect,
}: ProjectListProps) => {
  if (isLoading) return <ProjectList.Loading />;
  const isEmpty = projects.length === 0;

  if (isEmpty) return <ProjectList.Empty text={emptyText} />;
  return (
    <Grid css={styles.grid}>
      {projects.map((project) => (
        <ProjectItem key={project.name} {...project} onSelect={onSelect} />
      ))}
    </Grid>
  );
};

const styles = {
  grid: cssObj({
    gridTemplateColumns: '1fr',
    alignItems: 'stretch',
    gap: '$6',

    /// show only 1 column on mobile
    '@sm': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
    },
  }),
};

ProjectList.Loading = ProjectListLoading;
ProjectList.Empty = ProjectListEmpty;
