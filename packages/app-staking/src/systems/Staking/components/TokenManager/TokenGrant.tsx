import {
  BadgeAsset,
  Button,
  Card,
  Flex,
  HStack,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@fuels/ui';
import { FuelToken, SHOW_CLAIM_BUTTON, TOKENS } from 'app-commons';
import { useMemo } from 'react';
import type { Address } from 'viem';
import { getShortError } from '~staking/systems/Core';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import { ViewInExplorer } from '~staking/systems/Core/components/ViewInExplorer/ViewInExplorer';
import { useAnimatedCounter } from '~staking/systems/Core/hooks/useAnimatedCounter';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { usePendingTransactionsCache } from '~staking/systems/Core/hooks/usePendingTransactionsCache';
import { formatAnimatedBalance } from '~staking/systems/Core/utils/formatAnimatedBalance';
import { useFormatBalance } from '../../../Core/hooks/useFormatBalance';
import { useVesting } from '../../hooks/useVesting';
import { useVestingReleases } from '../../services/useVestingReleases';
import { useVestingUnpaid } from '../../services/useVestingUnpaid';
import { formatTimestamp } from '../../utils/formatTimestamp';

type TokenGrantProps = {
  account: Address | undefined;
};
const { token, symbol, decimals } = TOKENS[FuelToken.V1];

export const TokenGrant = ({ account }: TokenGrantProps) => {
  const { toast } = useToast();
  const { getPendingTransaction, addPendingTransaction } =
    usePendingTransactionsCache();

  const { data: unpaid_val } = useVestingUnpaid(account);
  const { data: releases } = useVestingReleases(account);
  const { start, cliff, end, amount, claimed: claimed_val } = releases ?? {};
  const unpaid = useFormatBalance(unpaid_val, decimals);
  const claimed = useFormatBalance(claimed_val, decimals);
  const totalGrant = useFormatBalance(amount, decimals);

  const cachedTx = useMemo(() => {
    return getPendingTransaction(token, PendingTransactionTypeL1.ClaimVesting);
  }, [getPendingTransaction]);
  const {
    handlers: { claim },
    isClaiming,
    isWaitingVestingClaim,
    isConfirmedVestingClaim,
    error,
  } = useVesting({ pendingTx: cachedTx, account });

  const hasUnpaidTokens = amount && amount > 0n;

  const unpaidRef = useAnimatedCounter({
    to: unpaid.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({
        value,
        formatted: unpaid.formatted,
      });
    },
  });
  const grantRef = useAnimatedCounter({
    to: totalGrant.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({ value, formatted: totalGrant.formatted });
    },
  });
  const totalClaimedRef = useAnimatedCounter({
    to: claimed.formatted.display,
    format: (value) => {
      return formatAnimatedBalance({ value, formatted: claimed.formatted });
    },
  });

  const handleClaim = () => {
    const formatted = unpaid.original.display;

    claim({
      options: {
        onSuccess: (hash) => {
          addPendingTransaction({
            hash,
            token,
            symbol,
            formatted,
            type: PendingTransactionTypeL1.ClaimVesting,
            layer: 'l1',
          });
          toast({
            title: 'Vesting Claim has been submitted',
            description: `${formatted} ${symbol}`,
            action: <ViewInExplorer hash={hash} />,
            variant: 'info',
          });
        },
      },
    });
  };

  if (!hasUnpaidTokens || SHOW_CLAIM_BUTTON !== 'true') return null;

  return (
    <VStack gap="2">
      <Text className="font-mono" size="4" weight="bold" mb="2">
        V1 Token Grant
      </Text>
      <div className="filter-single-clip-polygon">
        <Card className="p-6 border-single-clip-polygon">
          <Card.Header className="p-0">
            <Card.Title size="2">Unclaimed tokens</Card.Title>
          </Card.Header>
          <Card.Body className="p-0 flex flex-col md:flex-row gap-4">
            <HStack
              gap="4"
              mt={{
                initial: '2',
                md: '0',
              }}
            >
              <Tooltip
                content={`${unpaid.formatted.display} ${symbol}`}
                delayDuration={0}
              >
                <Text
                  ref={unpaidRef}
                  size="8"
                  weight="bold"
                  className="self-center font-mono"
                  as="span"
                >
                  1
                </Text>
              </Tooltip>
              <BadgeAsset icon="/assets/fuel.png" variant="solid">
                {symbol}
              </BadgeAsset>
            </HStack>
            {!unpaid.amount.isZero() && (
              <VStack align="start" gap="0">
                <Button
                  variant="solid"
                  color="green"
                  size="2"
                  isLoading={isClaiming || isWaitingVestingClaim}
                  disabled={isConfirmedVestingClaim}
                  onClick={handleClaim}
                >
                  Claim tokens
                </Button>
                <AnimatedError
                  error={error ? getShortError(error) : undefined}
                />
              </VStack>
            )}
          </Card.Body>
        </Card>
      </div>

      <Flex
        justify="between"
        direction={{
          initial: 'column',
          md: 'row',
        }}
        gap="1"
        className="bg-gray-3 rounded-md px-2 py-1.5 mr-[40px]"
      >
        <HStack gap="2">
          <VStack gap="0">
            <div>
              <Text size="2" weight="medium" className="text-gray-11">
                Total grant:{' '}
              </Text>
              <Tooltip
                content={`${totalGrant.original.display} ${symbol}`}
                delayDuration={0}
              >
                <Text size="2" weight="medium" className="text-gray-12">
                  <span ref={grantRef}>0</span> {symbol}
                </Text>
              </Tooltip>
            </div>
          </VStack>
          <VStack gap="0">
            <div>
              <Text size="2" weight="medium" className="text-gray-11">
                Total claimed:{' '}
              </Text>
              <Tooltip
                content={`${claimed.original.display} ${symbol}`}
                delayDuration={0}
              >
                <Text size="2" weight="medium" className="text-gray-12">
                  <span ref={totalClaimedRef}>0</span> {symbol}
                </Text>
              </Tooltip>
            </div>
          </VStack>
        </HStack>

        <Flex
          direction={{
            initial: 'column',
            md: 'row',
          }}
          gap={{
            initial: '1',
            md: '2',
          }}
        >
          <span className="hidden md:inline-block text-gray-11">•</span>
          <HStack gap="1" align="center">
            <Text size="2" weight="medium" className="text-gray-11">
              Start date:{' '}
            </Text>
            <Text size="2" weight="medium" className="text-gray-12">
              {formatTimestamp(start)}
            </Text>
          </HStack>
          <span className="hidden md:inline-block text-gray-11">•</span>
          <HStack gap="1" align="center">
            <Text size="2" weight="medium" className="text-gray-11">
              Cliff end:{' '}
            </Text>
            <Text size="2" weight="medium" className="text-gray-12">
              {formatTimestamp(cliff)}
            </Text>
          </HStack>
          <span className="hidden md:inline-block text-gray-11">•</span>
          <HStack gap="1" align="center">
            <Text size="2" weight="medium" className="text-gray-11">
              Release end:{' '}
            </Text>
            <Text size="2" weight="medium" className="text-gray-12">
              {formatTimestamp(end)}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </VStack>
  );
};
