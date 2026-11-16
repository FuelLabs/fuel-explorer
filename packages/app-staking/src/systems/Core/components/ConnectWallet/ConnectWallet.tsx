import { Button } from '@fuels/ui';
import { useModal } from 'connectkit';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useDisconnect } from 'wagmi';
import { useRiseMotion } from '../../utils/motion';

export const ConnectWallet = () => {
  const { t } = useTranslation();
  const rise = useRiseMotion();
  const { setOpen } = useModal();

  const [firstWagmiStatus, setFirstWagmiStatus] = useState(true);
  const { disconnect } = useDisconnect();
  const { address, status } = useAccount();

  useEffect(() => {
    setFirstWagmiStatus((prev) => {
      if (prev && status === 'disconnected') return true;
      return false;
    });
  }, [status]);

  const isLoading =
    firstWagmiStatus || status === 'reconnecting' || status === 'connecting';

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {address ? (
        <motion.div key="dropdown" {...rise}>
          <Button
            variant="ghost"
            size="1"
            color="gray"
            onClick={() => disconnect()}
          >
            {t('staking.account.disconnect')}
          </Button>
        </motion.div>
      ) : (
        <motion.div key="button" {...rise}>
          <Button size="1" onClick={() => setOpen(true)} isLoading={isLoading}>
            {t('staking.account.connect_wallet')}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
