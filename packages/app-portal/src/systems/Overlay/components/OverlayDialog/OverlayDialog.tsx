import { Dialog } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { AssetsDialog } from '~/systems/Assets/containers';
import {
  AddAssetFormDialog,
  TxEthToFuelDialog,
  TxFuelToEthDialog,
} from '~/systems/Chains';
import { useOverlay } from '~/systems/Overlay';

export function OverlayDialog() {
  const classes = styles();
  const overlay = useOverlay();

  return (
    <Dialog
      open={overlay.isDialogOpen}
      onOpenChange={(isOpen) => !isOpen && overlay.close()}
    >
      <Dialog.Content className={classes.content()}>
        {overlay.is('tx.fromEth.toFuel') && <TxEthToFuelDialog />}
        {overlay.is('tx.fromFuel.toEth') && <TxFuelToEthDialog />}
        {overlay.is('eth.assets') && <AssetsDialog />}
        {overlay.is('eth.assets.add') && <AddAssetFormDialog />}
      </Dialog.Content>
    </Dialog>
  );
}

const styles = tv({
  slots: {
    content: 'max-w-sm min-h-[100px]',
  },
});
