import { cssObj } from '@fuel-ui/css';
import { Box, Button, Dialog, Text } from '@fuel-ui/react';
import { VITE_WALLET_INSTALL_NEXT } from '~/config';

type FuelVersionDialogOptions = {
  isOpen: boolean;
};

export const FuelVersionDialog = ({ isOpen }: FuelVersionDialogOptions) => (
  <Dialog isOpen={isOpen} isDismissable={false}>
    <Dialog.Content>
      <Dialog.Heading>
        <Box.Flex align="center" gap="$2">
          <Text fontSize="lg" color="intentsBase12">
            Fuel Wallet Version
          </Text>
        </Box.Flex>
      </Dialog.Heading>
      <Dialog.Description>
        <Box.Stack gap="$4" css={styles.content}>
          <Text>
            The current version of the Fuel Wallet you are using, is not
            compatible with the Fuel Bridge.
          </Text>
          {/*
          TODO: once we have the Fuel Wallet Development version available on
          Chrome WebStore the text should be replaced with the following:

          Install a Fuel Wallet Development version available on Chrome Web Store.
        */}
          <Text>
            Install a newer version of the Fuel Wallet available on the link
            bellow and following the{' '}
            <b>install from source code instructions</b>.
          </Text>
        </Box.Stack>
      </Dialog.Description>
      <Dialog.Footer>
        <Button
          css={styles.installButton}
          as="a"
          href={VITE_WALLET_INSTALL_NEXT}
          target="_blank"
          rel="noreferrer"
          intent="primary"
          size="lg"
        >
          Install Fuel Wallet
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog>
);

const styles = {
  content: cssObj({
    py: '$6',
  }),
  installButton: cssObj({
    width: '$full',
  }),
};
