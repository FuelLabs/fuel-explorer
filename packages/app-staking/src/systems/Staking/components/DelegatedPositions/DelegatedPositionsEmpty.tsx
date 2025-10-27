import { Button, Text, VStack } from '@fuels/ui';
import { motion } from 'framer-motion';

const animations = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

type DelegatedPositionsEmptyProps = {
  onStartStaking: () => void;
};

export const DelegatedPositionsEmpty = ({
  onStartStaking,
}: DelegatedPositionsEmptyProps) => {
  return (
    <motion.div
      variants={animations}
      initial="closed"
      animate="open"
      exit="closed"
      className="flex flex-col items-center justify-center py-10 text-center bg-gray-2"
    >
      <VStack gap="4" align="center">
        <Text className="text-heading text-xl font-semibold">
          No current positions
        </Text>
        <Text className="text-gray-11 max-w-[360px]">
          You have no active staking positions right now. Start staking now by
          clicking the button below
        </Text>
        <Button onClick={onStartStaking} size="3" className="mt-1">
          Start Staking
        </Button>
      </VStack>
    </motion.div>
  );
};
