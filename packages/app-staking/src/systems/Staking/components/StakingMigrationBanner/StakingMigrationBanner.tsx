import { useAccount, useWallet } from '@fuels/react';
import {
  Alert,
  AnimatedHeight,
  Button,
  HStack,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Text,
  VStack,
} from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import * as AppCommons from 'app-commons';
import { DECIMAL_FUEL } from 'fuels';
import { Link } from 'react-router-dom';
import { StakingMigration } from '~staking/contracts/rig/StakingMigration';
import { IconRig } from './IconRig';

export const StakingMigrationBanner = () => {
  const showBanner =
    (AppCommons as any).SHOW_STAKING_MIGRATION_BANNER ??
    (typeof import.meta !== 'undefined' && (import.meta as any).env
      ? (import.meta as any).env.VITE_SHOW_STAKING_MIGRATION_BANNER !== 'false'
      : true);

  if (!showBanner) return null;

  const { account } = useAccount();
  const { wallet } = useWallet();
  const accountAddress = account ?? undefined;

  const { data: migrationData, isPending: isMigrationLoading } = useQuery({
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

  const goToRig = () => {
    window.open('https://rig.st', '_blank', 'noopener,noreferrer');
  };

  const isConnected = !!wallet && !!accountAddress;
  const pendingDeposit = migrationData?.pendingDeposit;
  const hasClaimable = !!pendingDeposit && pendingDeposit.gt(0);

  // Base migration message
  const baseMessage =
    'This staking service has migrated to The Rig, a liquid staking protocol on Ignition. The Rig solves the opportunity cost many stakers face and facilitates auto-compounding out of the box';

  // Determine the specific message based on connection and deposit status
  const getSpecificMessage = () => {
    if (!isConnected) {
      return "Connect your wallet here to determine if you're eligible to claim stFUEL.";
    }

    if (isMigrationLoading) {
      return 'Checking your claimable balance...';
    }
  };

  const specificMessage = getSpecificMessage();

  return (
    <AnimatedHeight enabled>
      <Alert color="orange" size="3" variant="surface">
        <Alert.Icon>
          <IconInfoCircle className="text-orange-12" />
        </Alert.Icon>
        <Alert.Text className="text-orange-12 font-semibold">
          Staking on Fuel has migrated to The Rig
        </Alert.Text>
        <VStack gap="0" className="text-heading">
          <Alert.Text className="break-words overflow-hidden text-heading">
            {baseMessage}
          </Alert.Text>
        </VStack>
        <HStack align="center" wrap="wrap">
          <HoverCard>
            <HoverCardTrigger>
              <Button
                color="gray"
                variant="solid"
                size="4"
                onClick={goToRig}
                leftIcon={IconRig}
                leftIconClassName="relative -top-[1px]"
                className="min-w-[180px]"
              >
                <Text>Learn more about The Rig</Text>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="max-w-[320px]">
              <Text size="2">
                Manage deposits, withdrawals, and staking on The Rig. You can
                also view historic rewards and validator info there.
              </Text>
            </HoverCardContent>
          </HoverCard>
        </HStack>
      </Alert>
      {hasClaimable && (
        <Alert color="blue" size="3" variant="surface" className="mt-4">
          <Alert.Icon>
            <IconInfoCircle className="text-blue-12" />
          </Alert.Icon>
          <Text className="text-gray-11">
            You have{' '}
            {pendingDeposit.format({
              units: DECIMAL_FUEL,
              precision: 2,
            })}{' '}
            stFUEL to claim - you can obtain your assets via{' '}
            <Link to="https://rig.st" target="_blank" className=" underline">
              the Rig
            </Link>
          </Text>
        </Alert>
      )}
      {specificMessage && (
        <Alert color="blue" size="3" variant="surface" className="mt-4">
          <Alert.Icon>
            <IconInfoCircle className="text-blue-12" />
          </Alert.Icon>
          <Text className="text-gray-11">{specificMessage}</Text>
        </Alert>
      )}
    </AnimatedHeight>
  );
};
