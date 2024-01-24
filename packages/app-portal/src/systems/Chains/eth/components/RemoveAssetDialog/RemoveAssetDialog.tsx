import { Button, AlertDialog } from '@fuel-ui/react';
import { useState } from 'react';
import type { ReactNode } from 'react';

type RemoveAssetDialogProps = {
  children: ReactNode;
  assetSymbol: string;
  onConfirm: () => void;
};

export const RemoveAssetDialog = ({
  children,
  assetSymbol,
  onConfirm,
}: RemoveAssetDialogProps) => {
  const [opened, setOpened] = useState(false);

  function handleCancel() {
    setOpened(false);
  }

  function handleConfirm() {
    onConfirm();
    setOpened(false);
  }

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Heading>Are you sure?</AlertDialog.Heading>
        <AlertDialog.Description>
          This action cannot be undone. {assetSymbol} will be permanently
          deleted from your asset list.
        </AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>
            <Button variant="outlined" onPress={handleCancel}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="ghost" intent="error" onPress={handleConfirm}>
              Confirm
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
