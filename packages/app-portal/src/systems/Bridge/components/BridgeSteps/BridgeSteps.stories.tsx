import { Flex, Text } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { BridgeSteps } from './BridgeSteps';

export default {
  component: BridgeSteps,
  title: 'BridgeSteps',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const classes = styles();

  const steps = [
    {
      name: 'Submit to bridge',
      status: <Text className={classes.statusText()}>Action</Text>,
      isLoading: false,
      isDone: false,
      isSelected: true,
    },
    {
      name: 'Settlement',
      status: <Text className={classes.statusText()}>Wait ~15 min</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
    {
      name: 'Confirm transaction',
      status: <Text className={classes.statusText()}>Action</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
    {
      name: 'Receive funds',
      status: <Text className={classes.statusText()}>Automatic</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
  ];
  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeSteps steps={steps} />
    </Flex>
  );
};

export const Mixed = () => {
  const classes = styles();
  const steps = [
    {
      name: 'Submit to bridge',
      status: <Text className={classes.statusText()}>Done!</Text>,
      isLoading: false,
      isDone: true,
      isSelected: false,
    },
    {
      name: 'Settlement',
      status: <Text className={classes.statusText()}>~5 minutes left</Text>,
      isLoading: true,
      isDone: false,
      isSelected: true,
    },
    {
      name: 'Confirm transaction',
      status: <Text className={classes.statusText()}>Action</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
    {
      name: 'Receive funds',
      status: <Text className={classes.statusText()}>Automatic</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
  ];
  return (
    <Flex align="center" justify="center" className={classes.storybook()}>
      <BridgeSteps steps={steps} />
    </Flex>
  );
};

const styles = tv({
  slots: {
    storybook: 'm-4',
    statusText: 'text-muted text-xs',
  },
});
