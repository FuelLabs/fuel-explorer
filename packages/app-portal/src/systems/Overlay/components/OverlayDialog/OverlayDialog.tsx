import { Dialog } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { AssetsDialog } from '~portal/systems/Assets/containers';
import { useFromNetworkAssetsBalances } from '~portal/systems/Bridge/hooks/useFromNetworkAssetsBalances';
import { TxEthToFuelDialog, TxFuelToEthDialog } from '~portal/systems/Chains';
import { useOverlay } from '~portal/systems/Overlay';

export function OverlayDialog() {
  const classes = styles();
  const overlay = useOverlay();
  useFromNetworkAssetsBalances();

  return (
    <Dialog
      open={overlay.isDialogOpen}
      onOpenChange={(isOpen) => !isOpen && overlay.close()}
    >
      <Dialog.Content className={classes.content()}>
        {overlay.is('tx.fromEth.toFuel') && (
          <TxEthToFuelDialog onClose={overlay.close} />
        )}
        {overlay.is('tx.fromFuel.toEth') && (
          <TxFuelToEthDialog onClose={overlay.close} />
        )}
        {overlay.is('eth.assets') && <AssetsDialog />}
      </Dialog.Content>
    </Dialog>
  );
}

const styles = tv({
  slots: {
    content: 'max-w-md min-h-[100px]',
  },
});
