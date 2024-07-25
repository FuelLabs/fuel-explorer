import { Button, Card, Flex, LoadingBox, Text, VStack } from '@fuels/ui';
import { IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { shortAddress } from '~portal/systems/Core';

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
  isLoading?: boolean;
  isConnected: boolean;
};

export const AccountConnectionInput = ({
  networkName,
  networkImage,
  label,
  isConnecting: _isConnecting,
  account,
  onConnect: _onConnect,
  onDisconnect,
  isLoading,
  isConnected,
}: AccountConnectionInputProps) => {
  const classes = styles();

  return (
    <Card className={classes.root()}>
      <Card.Body className={classes.cardBody()}>
        <Flex align="center" justify="between" gap="1">
          <VStack gap="1">
            <Text className={classes.textLabel()}>{label}</Text>
            <Flex gap="2" align="center">
              {typeof networkImage === 'string' ? (
                <Flex className="max-w-[20px] max-h-[20px]">
                  <img
                    className="w-full h-full"
                    src={networkImage}
                    alt={networkName}
                  />
                </Flex>
              ) : (
                networkImage
              )}
              <Text className={classes.textNetwork()}>{networkName}</Text>
            </Flex>
          </VStack>

          <VStack align="end" gap="0">
            {account?.address && (
              <>
                <Button
                  size="1"
                  variant="link"
                  className={classes.disconnectButton()}
                  iconSize={13}
                  onClick={onDisconnect}
                  color="gray"
                  disabled={!isConnected}
                >
                  <Text className={classes.textDisconnect()} size="1">
                    Disconnect
                  </Text>
                  <IconX size={13} />
                </Button>
                {isLoading ? (
                  <LoadingBox className="w-[100px] h-[20px]" />
                ) : (
                  <Text
                    className={classes.textAccountConnected()}
                    aria-label={`${networkName}: Connected Wallet`}
                  >
                    {shortAddress(account.alias, {
                      minLength: 16,
                    }) ||
                      shortAddress(account.address, {
                        start: 6,
                        end: 6,
                      })}
                  </Text>
                )}
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
    root: ['overflow-x-hidden p-0 bg-gray-1 h-[64px]'],
    cardBody: 'px-3 py-2',
    connectButton: 'w-[50px]',
    disconnectButton: 'text-[12px] mr-[-2px] my-[2px] text-gray-10',
    textLabel: 'text-xs',
    textNetwork: 'text-heading',
    textConnect: 'text-xs text-inherit',
    textDisconnect: 'text-[11px]',
    textAccountConnected: 'text-sm text-gray-11',
  },
});
