import { Button, Card, Flex, Text, VStack } from '@fuels/ui';
import { IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { shortAddress } from '~/systems/Core';

type AccountConnectionInputProps = {
  networkName?: string;
  networkImage: ReactNode | string;
  label?: string;
  isConnecting?: boolean;
  account?: {
    address?: string;
    alias?: string;
    avatar?: string;
  };
  onConnect: () => void;
  onDisconnect?: () => void;
};

export const AccountConnectionInput = ({
  networkName,
  networkImage,
  label,
  isConnecting,
  account,
  onConnect,
  onDisconnect,
}: AccountConnectionInputProps) => {
  const classes = styles();

  return (
    <Card className={classes.root()}>
      <Card.Body className={classes.cardBody()}>
        <Flex justify="between" gap="1">
          <VStack gap="1">
            <Text className={classes.textLabel()}>{label}</Text>
            <Flex gap="2" align="center">
              {typeof networkImage === 'string' ? (
                <img
                  width="20"
                  height="20"
                  src={networkImage}
                  alt={networkName}
                />
              ) : (
                networkImage
              )}
              <Text className={classes.textNetwork()}>{networkName}</Text>
            </Flex>
          </VStack>
          <VStack align="end" justify="between" gap="0">
            {account?.address && (
              <>
                <Button
                  size="1"
                  variant="link"
                  className={classes.disconnectButton()}
                  iconSize={13}
                  onClick={onDisconnect}
                >
                  Disconnect
                  <IconX size={13} />
                </Button>
                <Text aria-label={`${networkName}: Connected Wallet`}>
                  {shortAddress(account.alias, {
                    minLength: 16,
                  }) ||
                    shortAddress(account.address, {
                      start: 6,
                      end: 6,
                    })}
                </Text>
              </>
            )}
          </VStack>
        </Flex>
      </Card.Body>
    </Card>
  );
};

export const styles = tv({
  slots: {
    root: [
      'overflow-x-hidden bg-input border border-solid border-input px-0 py-1',
    ],
    cardBody: 'px-3 py-2',
    connectButton: 'w-[50px]',
    disconnectButton: 'text-[12px]  mr-[-2px]',
    textLabel: 'text-xs',
    textNetwork: 'text-heading',
    textConnect: 'text-xs text-inherit',
  },
});
