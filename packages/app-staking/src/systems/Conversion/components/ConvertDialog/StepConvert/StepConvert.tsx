import {
  BadgeAsset,
  Button,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@fuels/ui';
import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { useNavigate } from 'react-router-dom';
import type { Address } from 'viem';
import { Routes } from '~staking/routes';
import type { ConversionMachineState } from '~staking/systems/Conversion/machines/conversionMachine';
import { getShortError } from '~staking/systems/Core';
import { AnimatedError } from '~staking/systems/Core/components/AnimatedError/AnimatedError';
import { ViewInExplorer } from '~staking/systems/Core/components/ViewInExplorer/ViewInExplorer';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { usePendingTransactionsCache } from '~staking/systems/Core/hooks/usePendingTransactionsCache';
import { bnToBigInt } from '~staking/systems/Core/utils/bn';
import { useTokenMigration } from '~staking/systems/Staking/hooks/useTokenMigration';

type StepConvertProps = {
  token: Address;
  ctx: ConversionMachineState['context'];
  onClose: () => void;
};

const DAY_IN_SEC = 24 * 60 * 60;
const REGULAR_LOCK_YEARS = 2;

const defaultPeriod = (REGULAR_LOCK_YEARS * 365 * DAY_IN_SEC).toString(); // 2 years

const { symbol: symbolV1, decimals: decimalsV1 } = TOKENS[FuelToken.V1];
const { symbol: symbolV2, decimals: decimalsV2 } = TOKENS[FuelToken.V2];

export const StepConvert = ({ token, ctx, onClose }: StepConvertProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPendingTransaction } = usePendingTransactionsCache();
  const { migrate, isMigrating, error: errorMigration } = useTokenMigration();

  const amountV1 = bnToBigInt(ctx.amount);
  const amountV1Format = useFormatBalance(amountV1, decimalsV1);
  const amountV2 =
    (amountV1 * CURRENT_NETWORK_CONTRACTS.MIGRATOR_MULTIPLIER) /
    CURRENT_NETWORK_CONTRACTS.MIGRATOR_DOWNSCALING_FACTOR;
  const amountV2Format = useFormatBalance(amountV2, decimalsV2);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    migrate({
      amount: amountV1,
      period: defaultPeriod,
      options: {
        onSuccess: (hash) => {
          addPendingTransaction({
            hash,
            token,
            symbol: symbolV1,
            formatted: amountV1Format.formatted.display,
            type: PendingTransactionTypeL1.Migrate,
            layer: 'l1',
          });
          onClose();
          toast({
            title: 'Migration has been submitted',
            description: `${amountV1Format.formatted.display} ${symbolV1}`,
            action: <ViewInExplorer hash={hash} />,
            variant: 'info',
          });
          navigate(Routes.stakingL1());
        },
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col flex-1">
      <VStack gap="0" className="flex-1 mt-8">
        <VStack gap="4">
          <VStack flexGrow="1" gap="4">
            <Text size="2" weight="medium" className="text-gray-11">
              V1 Amount
            </Text>
            <HStack gap="3" align="center">
              <LoadingWrapper
                isLoading={!amountV1Format}
                loadingEl={<LoadingBox className="w-28 h-6" />}
                regularEl={
                  <Tooltip
                    content={`${amountV1Format.original.display} ${symbolV1}`}
                    delayDuration={0}
                  >
                    <Text className="font-mono" size="6" weight="bold">
                      {amountV1Format.formatted.display}
                    </Text>
                  </Tooltip>
                }
              />
              <BadgeAsset icon="/assets/fuel.png" variant="transparent">
                {symbolV1}
              </BadgeAsset>
            </HStack>
          </VStack>
          <VStack flexGrow="1" gap="3">
            <Text size="2" weight="medium" className="text-gray-11 mt-4">
              You'll receive
            </Text>
            <HStack gap="3" align="center">
              <LoadingWrapper
                isLoading={amountV2Format == null}
                loadingEl={<LoadingBox className="w-28 h-6" />}
                regularEl={
                  <Tooltip
                    content={`${amountV2Format.original.display} ${symbolV2}`}
                    delayDuration={0}
                  >
                    <Text className="font-mono" size="6" weight="bold">
                      {amountV2Format.formatted.display}
                    </Text>
                  </Tooltip>
                }
              />
              <BadgeAsset icon="/assets/fuel.png" variant="transparent">
                {symbolV2}
              </BadgeAsset>
            </HStack>
          </VStack>
        </VStack>
        <AnimatedError
          error={errorMigration ? getShortError(errorMigration) : undefined}
        />
      </VStack>
      <Separator size="4" className="my-5" />
      <Button
        variant="solid"
        color="green"
        className="w-full"
        isLoading={isMigrating}
        type="submit"
      >
        Upgrade
      </Button>
    </form>
  );
};
