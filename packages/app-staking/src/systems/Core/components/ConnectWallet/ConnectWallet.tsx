import { Button } from '@fuels/ui';
import { useModal } from 'connectkit';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export const ConnectWallet = () => {
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
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Button
            variant="outline"
            size="1"
            color="red"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="button"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Button size="1" onClick={() => setOpen(true)} isLoading={isLoading}>
            Connect Wallet
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
