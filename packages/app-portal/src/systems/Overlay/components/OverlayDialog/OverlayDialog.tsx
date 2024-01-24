import { cssObj } from '@fuel-ui/css';
import { Dialog } from '@fuel-ui/react';
import {
  EthAssetsDialog,
  FuelInstallDialog,
  TxEthToFuelDialog,
  TxFuelToEthDialog,
  AddAssetFormDialog,
} from '~/systems/Chains';
import { useOverlay } from '~/systems/Overlay';

const OVERLAY_HEIGHT = 100;
const OVERLAY_WIDTH = 400;

export function OverlayDialog() {
  const overlay = useOverlay();

  return (
    <Dialog
      isOpen={overlay.isDialogOpen}
      css={styles.dialog}
      onOpenChange={(isOpen) => !isOpen && overlay.close()}
    >
      <Dialog.Content css={styles.content}>
        {overlay.is('tx.fromEth.toFuel') && <TxEthToFuelDialog />}
        {overlay.is('tx.fromFuel.toEth') && <TxFuelToEthDialog />}
        {overlay.is('fuel.install') && <FuelInstallDialog />}
        {overlay.is('eth.assets') && <EthAssetsDialog />}
        {overlay.is('eth.assets.add') && <AddAssetFormDialog />}
      </Dialog.Content>
    </Dialog>
  );
}

const styles = {
  dialog: cssObj({
    backdropFilter: 'blur(10px)',
  }),
  content: cssObj({
    width: OVERLAY_WIDTH,
    minHeight: OVERLAY_HEIGHT,
    maxWidth: OVERLAY_WIDTH,
    maxHeight: 'none',
  }),
};
