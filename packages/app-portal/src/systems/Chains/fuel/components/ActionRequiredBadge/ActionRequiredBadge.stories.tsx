import { HStack } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { ActionRequiredBadge } from './ActionRequiredBadge';

export default {
  component: ActionRequiredBadge,
  title: 'ActionRequiredBadge',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();
  return (
    <HStack align="center" justify="center" className={classes.storybook()}>
      <ActionRequiredBadge />
    </HStack>
  );
};

export const styles = tv({
  slots: {
    storybook: 'm-4',
  },
});
