import { cssObj } from '@fuel-ui/css';
import { Card, Text, Image, Button, Box, Icon, Tooltip } from '@fuel-ui/react';
import type { ReactNode } from 'react';
import { shortAddress } from '~/systems/Core';

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
        <Box.Stack gap="$1">
          <Box>
            <Text fontSize="sm">{label}</Text>
          </Box>
          <Box.Flex align="center" wrap="wrap" justify="space-between">
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
            {!account?.address ? (
              showConnect && (
                <Button
                  isLoading={isConnecting}
                  css={styles.connectButton}
                  size="xs"
                  intent="primary"
                  aria-label={`${label} Connect wallet`}
                  onPress={onConnect}
                >
                  <Text fontSize="sm" color="inherit">
                    Connect wallet
                  </Text>
                </Button>
              )
            ) : (
              <Box.Flex gap={'$1'} justify={'center'} align={'center'}>
                <Text>
                  {shortAddress(account.alias, {
                    minLength: 16,
                  }) ||
                    shortAddress(account.address, {
                      start: 6,
                      end: 6,
                    })}
                </Text>
                <Box css={styles.disconnectButton} onClick={onDisconnect}>
                  <Tooltip content="Disconnect account">
                    <Icon icon="X" size={20} aria-label="Disconnect account" />
                  </Tooltip>
                </Box>
              </Box.Flex>
            )}
          </Box.Flex>
        </Box.Stack>
      </Card.Body>
    </Card>
  );
};

const styles = {
  root: cssObj({
    minHeight: '$15',
    overflowX: 'hidden',
    backgroundColor: '$cardBg !important',
  }),
  cardBody: cssObj({
    px: '$3',
    py: '$2',
  }),
  connectButton: cssObj({
    width: '$36',
  }),
  connectedButton: cssObj({
    justifyContent: 'space-between',
    gap: 0,
    borderColor: '$border',
  }),
  circle: cssObj({
    minWidth: '$3',
    height: '$3',
    backgroundColor: '$intentsError9',
    borderRadius: '$full',
  }),
  disconnectButtonIcon: cssObj({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'fit-content',
  }),
  disconnectButton: cssObj({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  }),
};
