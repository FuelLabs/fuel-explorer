import { Grid } from '@fuels/ui';
import type { Project } from '../../types';
import { ProjectItem } from '../ProjectItem';

import { tv } from 'tailwind-variants';
import { ProjectListEmpty } from './ProjectListEmpty';
import { ProjectListLoading } from './ProjectListLoading';

type ProjectListProps = {
  projects: Project[];
  isLoading?: boolean;
  emptyText?: string;
};

export const ProjectList = ({
  projects,
  isLoading,
  emptyText,
}: ProjectListProps) => {
  const classes = styles();
  const isEmpty = !isLoading && !projects.length;

  if (isLoading) {
    return <ProjectList.Loading />;
  }

  if (isEmpty) {
    return <ProjectList.Empty text={emptyText} />;
  }

  return (
    <Grid className={classes.grid()}>
      {projects.map((project) => (
        <ProjectItem {...project} key={project.url} />
      ))}
    </Grid>
  );
};

const styles = tv({
  slots: {
    grid: [
      'grid grid-cols-1 gap-6 items-stretch',
      'tablet:grid-cols-2 tablet:grid-rows-2',
    ],
  },
});

ProjectList.Loading = ProjectListLoading;
ProjectList.Empty = ProjectListEmpty;
