import { Grid } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { ProjectItem } from '../ProjectItem';

type ProjectListLoadingProps = {
  items?: number;
};

export const ProjectListLoading = ({ items = 8 }: ProjectListLoadingProps) => {
  const classes = styles();

  return (
    <Grid className={classes.grid()}>
      {Array.from({ length: items }).map((_, idx) => (
        <ProjectItem.Loader key={idx} />
      ))}
    </Grid>
  );
};

const styles = tv({
  slots: {
    grid: [
      'grid-cols-1 items-stretch gap-6',
      'tablet:grid-cols-2 tablet:grid-rows-2',
    ],
  },
});
