import { useAccount, useWallet } from '@fuels/react';
import { Alert, Button, Card, Text, VStack } from '@fuels/ui';
import { IconInfoCircle } from '@fuels/ui';
import { useQuery } from '@tanstack/react-query';
import * as AppCommons from 'app-commons';
import { DECIMAL_FUEL } from 'fuels';
import { Link } from 'react-router-dom';
import { StakingMigration } from '~staking/contracts/rig/StakingMigration';
import { IconRig } from './IconRig';

const RIG_URL = 'https://rig.st';

export const StakingMigrationBanner = () => {
  const { account } = useAccount();
  const { wallet } = useWallet();
  const accountAddress = account ?? undefined;

  const { data: migrationData } = useQuery({
    queryKey: ['staking-migration-claimable', accountAddress],
    enabled:
      !!accountAddress &&
      !!wallet &&
      !!AppCommons.CURRENT_NETWORK_CONTRACTS?.L2_STAKING &&
      AppCommons.CURRENT_NETWORK_CONTRACTS.L2_STAKING !== '0x',
    queryFn: async () => {
      if (!wallet) return { pendingDeposit: undefined };

      try {
        const stakingMigration = new StakingMigration(
          AppCommons.CURRENT_NETWORK_CONTRACTS.L2_STAKING,
          wallet,
        );

        const identity = { Address: { bits: wallet.address.toB256() } } as any;

        const { value: pendingDeposit } = await stakingMigration.functions
          .get_pending_deposit_to_be_claimed(identity)
          .dryRun();

        return {
          pendingDeposit: pendingDeposit?.gt(0) ? pendingDeposit : undefined,
        };
      } catch (err) {
        console.error(
          '[StakingMigrationBanner] Error querying migration:',
          err,
        );
        return { pendingDeposit: undefined };
      }
    },
  });

  const pendingDeposit = migrationData?.pendingDeposit;
  const hasClaimable = !!pendingDeposit && pendingDeposit.gt(0);

  return (
    <VStack gap="4">
      <Card>
        <Card.Body>
          <VStack gap="3">
            <Text className="m-0 font-medium text-heading text-[20px] leading-[24px] tracking-[-0.4px]">
              Liquid stake on The Rig
            </Text>
            <Text className="m-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
              Stake on Ignition and receive a liquid token. Rewards compound
              automatically.
            </Text>
            <Button
              color="gray"
              size="3"
              onClick={() =>
                window.open(RIG_URL, '_blank', 'noopener,noreferrer')
              }
              leftIcon={IconRig}
              leftIconClassName="relative -top-[1px]"
              className="self-start"
            >
              Open The Rig
            </Button>
          </VStack>
        </Card.Body>
      </Card>
      {hasClaimable && (
        <Alert color="blue" size="3" variant="surface">
          <Alert.Icon>
            <IconInfoCircle className="text-blue-12" />
          </Alert.Icon>
          <Text className="text-gray-11">
            You have{' '}
            {pendingDeposit.format({
              units: DECIMAL_FUEL,
              precision: 2,
            })}{' '}
            stFUEL to claim on{' '}
            <Link to={RIG_URL} target="_blank" className="underline">
              The Rig
            </Link>
            .
          </Text>
        </Alert>
      )}
    </VStack>
  );
};
