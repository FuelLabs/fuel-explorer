import { Badge, Text } from '@fuels/ui';
import { tv } from 'tailwind-variants';

export const ActionRequiredBadge = () => {
  const classes = styles();

  return (
    <Text>
      <Badge className={classes.actionBadge()} color="green">
        Action Required
      </Badge>
    </Text>
  );
};

export const styles = tv({
  slots: {
    actionBadge: 'text-[13px] font-medium leading-1 normal-case',
  },
});
