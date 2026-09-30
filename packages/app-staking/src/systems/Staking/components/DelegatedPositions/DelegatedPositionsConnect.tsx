import { Button, Text, VStack } from '@fuels/ui';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LogoEth } from '~staking/systems/Core/components/LogoEth/LogoEth';

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

type DelegatedPositionsConnectProps = {
  onConnect: () => void;
};

export const DelegatedPositionsConnect = ({
  onConnect,
}: DelegatedPositionsConnectProps) => {
  const { t } = useTranslation();
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
          {t('staking.wallet_disconnected')}
        </Text>
        <Text className="text-gray-11 max-w-[360px]">
          {t('staking.connect_positions')}
        </Text>
        <Button onClick={onConnect} size="3" className="mt-1">
          <LogoEth size="medium" />
          {t('staking.connect_ethereum')}
        </Button>
      </VStack>
    </motion.div>
  );
};
