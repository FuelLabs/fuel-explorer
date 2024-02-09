import { Icon, Spinner } from '@fuel-ui/react';
import { Box, Flex, Text, VStack } from '@fuels/ui';
import { IconCheck } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type Step = {
  name: ReactNode;
  status: ReactNode;
  isLoading?: boolean;
  isDone?: boolean;
  isSelected?: boolean;
};

type BridgeStepsProps = {
  steps?: Step[];
};

export const BridgeSteps = ({ steps }: BridgeStepsProps) => {
  const classes = styles();

  return (
    <VStack className={classes.stack()}>
      {steps?.map((step, index) => {
        return (
          <Flex
            key={`${index}_${step.name?.toString()}`}
            className={classes.item()}
            data-done={step.isDone}
            data-selected={step.isSelected}
            data-loading={step.isLoading}
          >
            <Flex className={classes.action()}>
              <Box className={classes.circle()}>
                {step.isDone ? (
                  <IconCheck size={12} className={classes.icon()} />
                ) : (
                  <Text className={classes.number()}>{index + 1}</Text>
                )}
              </Box>
              <Text className={classes.name()}>{step.name}</Text>
            </Flex>
            <Flex align="center">
              {step.isLoading && <Spinner size={14} />}
              <Text
                aria-label={`Step ${step.name?.toString()}: ${step.status}`}
                className={classes.status()}
              >
                {step.status}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </VStack>
  );
};

const styles = tv({
  slots: {
    item: 'group flex justify-between px-3 py-2 [&_~_&]:border-t [&_~_&]:border-border',
    stack: 'gap-0 rounded-md border border-border bg-inputBaseBg',
    action: 'gap-2 items-center',
    name: 'leading-tight text-xs text-heading',
    status: 'text-xs text-muted',
    icon: 'text-gray-1',
    number: [
      'flex justify-center text-xs',
      'group-[&[data-selected=true]]:text-gray-11',
    ],
    circle: [
      'flex justify-center items-center w-4 h-4 border rounded-full',
      'group-[&[data-selected=true]]:border-green-8',
      'group-[&[data-done=true]]:border-green-8 group-[&[data-done=true]]:bg-green-8',
    ],
  },
});
