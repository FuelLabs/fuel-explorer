import { Button, Dialog, Flex, Text, VStack } from '@fuels/ui';
import { WALLET_INSTALL_NEXT } from 'app-commons';
import { tv } from 'tailwind-variants';

type FuelVersionDialogOptions = {
  isOpen: boolean;
};

export const FuelVersionDialog = ({ isOpen }: FuelVersionDialogOptions) => {
  const classes = styles();

  return (
    <Dialog open={isOpen}>
      <Dialog.Content>
        <Dialog.Title>
          <Flex align="center" gap="2">
            Fuel Wallet Version
          </Flex>
        </Dialog.Title>
        <Dialog.Description>
          <VStack gap="4" className={classes.content()}>
            <Text>
              The current version of the Fuel Wallet you are using is not
              compatible with the Fuel Bridge.
            </Text>
            {/*
            TODO: once we have the Fuel Wallet Development version available on
            Chrome WebStore the text should be replaced with the following:

            Install a Fuel Wallet Development version available on Chrome Web Store.
          */}
            <Text>
              Please install a newer version of the Fuel Wallet available on the
              link below and follow the{' '}
              <b>install from source code instructions</b>.
            </Text>
          </VStack>
          <Button
            className={classes.installButton()}
            as="a"
            href={WALLET_INSTALL_NEXT}
            target="_blank"
            rel="noreferrer"
            color="green"
            size="4"
          >
            Install Fuel Wallet
          </Button>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog>
  );
};

export const styles = tv({
  slots: {
    content: 'py-6',
    installButton: 'w-full',
  },
});
