import { cssObj } from '@fuel-ui/css';
import { Box, Button, Card, Image, Text } from '@fuel-ui/react';
import type { ReactNode } from 'react';
import { shortAddress } from '~portal/systems/Core';

type AccountConnectionInputProps = {
  networkName?: string;
  networkImage: ReactNode | string;
  label?: string;
  isConnecting?: boolean;
  showConnect?: boolean;
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
  showConnect,
  account,
  onConnect,
  onDisconnect,
}: AccountConnectionInputProps) => {
  return (
    <Card css={styles.root} variant="outlined">
      <Card.Body css={styles.cardBody}>
        <Box.Flex justify="space-between" gap="$1">
          <Box.Stack gap="$1">
            <Text fontSize="sm">{label}</Text>
            <Box.Flex gap="$2" align="center">
              {typeof networkImage === 'string' ? (
                <Image
                  width="20"
                  height="20"
                  src={networkImage}
                  alt={networkName}
                />
              ) : (
                networkImage
              )}
              <Text color="intentsBase12">{networkName}</Text>
            </Box.Flex>
          </Box.Stack>
          <Box.Stack align="flex-end" gap="0">
            {!account?.address ? (
              showConnect && (
                <Button
                  isLoading={isConnecting}
                  css={styles.connectButton}
                  size="xs"
                  intent="primary"
                  aria-label={`${label} Connect wallet`}
                  onClick={onConnect}
                >
                  <Text fontSize="sm" color="inherit">
                    Connect wallet
                  </Text>
                </Button>
              )
            ) : (
              <>
                <Button
                  size="xs"
                  variant="link"
                  css={styles.disconnectButton}
                  rightIcon="X"
                  iconSize={13}
                  onClick={onDisconnect}
                >
                  Disconnect
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
          </Box.Stack>
        </Box.Flex>
      </Card.Body>
    </Card>
  );
};

const styles = {
  root: cssObj({
    minHeight: '$15',
    overflowX: 'hidden',
    backgroundColor: '$inputBaseBg !important',
    borderColor: '$inputBaseBorder !important',
  }),
  cardBody: cssObj({
    px: '$3',
    py: '$2',
  }),
  connectButton: cssObj({
    width: '$36',
  }),
  disconnectButton: cssObj({
    mr: '-$1',
  }),
};
