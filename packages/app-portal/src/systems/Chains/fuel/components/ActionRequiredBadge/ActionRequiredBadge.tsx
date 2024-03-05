import { Badge } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const ActionRequiredBadge = () => {
  const classes = styles();

  return (
    <Badge className={classes.actionBadge()} color="green">
      Action Required
    </Badge>
  );
};

export const styles = tv({
  slots: {
    actionBadge:
      'text-[11px] px-2 font-medium leading-1 normal-case cursor-pointer',
  },
});
