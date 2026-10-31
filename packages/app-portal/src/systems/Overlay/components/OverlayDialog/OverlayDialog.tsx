import { Dialog } from '@fuels/ui';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { tv } from 'tailwind-variants';
import { AssetsDialog } from '~portal/systems/Assets/containers';
import { useFromNetworkAssetsBalances } from '~portal/systems/Bridge/hooks/useFromNetworkAssetsBalances';
import { TxEthToFuelDialog, TxFuelToEthDialog } from '~portal/systems/Chains';
import { useOverlay } from '~portal/systems/Overlay';

const EASE = [0.16, 1, 0.3, 1] as const;

export function OverlayDialog() {
  const classes = styles();
  const overlay = useOverlay();
  const reduce = useReducedMotion();
  useFromNetworkAssetsBalances();

  const view = overlay.is('tx.fromEth.toFuel')
    ? 'tx.fromEth.toFuel'
    : overlay.is('tx.fromFuel.toEth')
      ? 'tx.fromFuel.toEth'
      : overlay.is('eth.assets')
        ? 'eth.assets'
        : null;

  return (
    <Dialog
      open={overlay.isDialogOpen}
      onOpenChange={(isOpen) => !isOpen && overlay.close()}
    >
      <Dialog.Content className={classes.content()}>
        {/* Closing unmounts the content at once: its hooks read overlay metadata, which is cleared on close. */}
        <AnimatePresence mode="wait" initial={false}>
          {overlay.isDialogOpen && view && (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: reduce ? 0 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.25, ease: EASE }}
            >
              {view === 'tx.fromEth.toFuel' && <TxEthToFuelDialog />}
              {view === 'tx.fromFuel.toEth' && <TxFuelToEthDialog />}
              {view === 'eth.assets' && <AssetsDialog />}
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Content>
    </Dialog>
  );
}

const styles = tv({
  slots: {
    content: 'max-w-md',
  },
});
