import { cssObj } from '@fuel-ui/css';
import { Box, Text } from '@fuel-ui/react';

import { BridgeSteps } from './BridgeSteps';

export default {
  component: BridgeSteps,
  title: 'BridgeSteps',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Usage = () => {
  const steps = [
    {
      name: 'Submit to bridge',
      status: <Text css={styles.statusText}>Action</Text>,
      isLoading: false,
      isDone: false,
      isSelected: true,
    },
    {
      name: 'Settlement',
      status: <Text css={styles.statusText}>Wait ~15 min</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
    {
      name: 'Confirm transaction',
      status: <Text css={styles.statusText}>Action</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
    {
      name: 'Receive funds',
      status: <Text css={styles.statusText}>Automatic</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
  ];
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeSteps steps={steps} />
    </Box.Flex>
  );
};

export const Mixed = () => {
  const steps = [
    {
      name: 'Submit to bridge',
      status: <Text css={styles.statusText}>Done!</Text>,
      isLoading: false,
      isDone: true,
      isSelected: false,
    },
    {
      name: 'Settlement',
      status: (
        <Text
          leftIcon="SpinnerGap"
          iconSize={10}
          css={{ gap: '$1', ...styles.statusText }}
        >
          ~5 minutes left
        </Text>
      ),
      isLoading: true,
      isDone: false,
      isSelected: true,
    },
    {
      name: 'Confirm transaction',
      status: <Text css={styles.statusText}>Action</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
    {
      name: 'Receive funds',
      status: <Text css={styles.statusText}>Automatic</Text>,
      isLoading: false,
      isDone: false,
      isSelected: false,
    },
  ];
  return (
    <Box.Flex align="center" justify="center" css={styles.storybook}>
      <BridgeSteps steps={steps} />
    </Box.Flex>
  );
};

const styles = {
  storybook: cssObj({
    margin: '20px',
  }),
  statusText: cssObj({
    color: '$intentsBase8',
    fontSize: '$xs',
  }),
};
