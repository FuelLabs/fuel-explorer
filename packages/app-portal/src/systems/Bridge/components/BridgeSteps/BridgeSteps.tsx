import { Box, Flex, HStack, Spinner, Text, VStack } from '@fuels/ui';
import { IconCheck } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type Step = {
  name: string;
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
            key={step.name}
            className={classes.item()}
            data-done={step.isDone}
            data-selected={step.isSelected}
            data-loading={step.isLoading}
          >
            <Flex className={classes.action()}>
              <Box className={classes.circle()}>
                {step.isDone ? (
                  <IconCheck size={10} className={classes.icon()} />
                ) : (
                  <Text className={classes.number()}>{index + 1}</Text>
                )}
              </Box>
              <Text className={classes.name()}>{step.name}</Text>
            </Flex>
            <HStack align="center" gap="1">
              {step.isLoading && <Spinner size={14} />}
              <Text
                aria-label={`Step ${step.name?.toString()}: ${step.status}`}
                className={classes.status()}
              >
                {step.status}
              </Text>
            </HStack>
          </Flex>
        );
      })}
    </VStack>
  );
};

const styles = tv({
  slots: {
    item: 'group flex justify-between p-3 [&_~_&]:border-t [&_~_&]:border-border',
    stack: 'gap-0 rounded-md border border-border bg-inputBaseBg',
    action: 'gap-2 items-center',
    name: 'leading-tight text-xs text-heading',
    status: 'text-xs text-muted',
    icon: 'text-white',
    number: [
      'flex justify-center text-[9px]',
      'group-[&[data-selected=true]]:text-gray-11',
    ],
    circle: [
      'flex justify-center items-center w-4 h-4 border rounded-full',
      'group-[&[data-selected=true]]:border-green-9',
      'group-[&[data-done=true]]:border-green-9 group-[&[data-done=true]]:bg-green-9',
    ],
  },
});
