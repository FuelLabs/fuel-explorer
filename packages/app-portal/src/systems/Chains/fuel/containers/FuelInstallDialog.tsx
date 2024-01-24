import { cssObj } from '@fuel-ui/css';
import { Box, Button, Dialog, FuelLogo, Text } from '@fuel-ui/react';
import { VITE_WALLET_INSTALL } from '~/config';

export const FuelInstallDialog = () => (
  <>
    <Dialog.Close />
    <Dialog.Heading>
      <Box.Flex align="center" gap="$2">
        <FuelLogo size={24} />
        <Text fontSize="lg" color="intentsBase12">
          Start Exploring Fuel
        </Text>
      </Box.Flex>
    </Dialog.Heading>
    <Dialog.Description>
      <Box.Stack gap="$4" css={styles.content}>
        <Text>
          We didn&apos;t find a Wallet compatible with the Fuel Network
          installed on your browser.
        </Text>
        <Text>
          Your wallet is the gateway to the Fuel Network, the magical technology
          that helps making modular blockchains possible.
        </Text>
      </Box.Stack>
    </Dialog.Description>
    <Dialog.Footer>
      <Button
        css={styles.installButton}
        as="a"
        href={VITE_WALLET_INSTALL}
        target="_blank"
        rel="noreferrer"
        intent="primary"
        size="lg"
      >
        <b>Install Fuel Wallet</b>
      </Button>
    </Dialog.Footer>
  </>
);

const styles = {
  content: cssObj({
    py: '$6',
  }),
  installButton: cssObj({
    width: '$full',
  }),
};
