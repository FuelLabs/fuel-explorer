import { Button, HStack, Link, Separator, Text } from '@fuels/ui';
import { TokenBadge } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import { type BN, DECIMAL_FUEL } from 'fuels';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { FormattedAmount } from '~staking/systems/Core/components/FormattedAmount/FormattedAmount';
import type { AssetFuelData } from '~staking/systems/Core/hooks/useIndexedAsset';

interface Props {
  balanceDifference?: BN | null;
  estimatedStFuelAmount?: BN | null;
  stFuelAsset?: AssetFuelData;
  errorMsg?: string | null;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function ReviewDepositToRig({
  balanceDifference,
  estimatedStFuelAmount,
  stFuelAsset,
  errorMsg,
  isSubmitting,
  onConfirm,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Text size="3" weight="medium">
            Step 2 - Deposit to Rig Staking
          </Text>
          <div className="flex items-center gap-2">
            <TokenBadge image="/assets/fuel.png" symbol="FUEL" size="small" />
            <FormattedAmount
              amount={balanceDifference || undefined}
              decimals={DECIMAL_FUEL}
              symbol="FUEL"
              textProps={{
                as: 'div',
                size: '6',
                weight: 'bold',
                className: 'font-mono text-[24px] text-heading text-ellipsis',
              }}
            />
          </div>
        </div>
        <Separator size="4" />
        <div className="flex flex-col gap-2">
          <Text size="3" weight="medium">
            You'll receive approximately
          </Text>
          <div className="flex items-center gap-2">
            <TokenBadge
              image={stFuelAsset?.icon}
              symbol={stFuelAsset?.symbol || 'stFUEL'}
              size="small"
            />
            <FormattedAmount
              amount={estimatedStFuelAmount || undefined}
              decimals={stFuelAsset?.decimals || DECIMAL_FUEL}
              symbol={stFuelAsset?.symbol}
              textProps={{
                as: 'div',
                size: '6',
                weight: 'bold',
                className: 'font-mono text-[24px] text-heading text-ellipsis',
              }}
            />
          </div>
        </div>
        <Separator size="4" />
        <HStack gap="2">
          <IconInfoCircle size={24} className="shrink-0 text-blue-11" />
          <Link
            href="https://rig.st/"
            target="_blank"
            isExternal
            className="text-heading no-underline hover:no-underline"
          >
            <Text>Learn more about The Rig</Text>
          </Link>
        </HStack>
      </div>
      <div>
        <ErrorInline error={errorMsg} className="mb-1" />
        <Button
          type="button"
          className="rounded-md w-full"
          size="3"
          onClick={onConfirm}
          isLoading={isSubmitting}
          loadingText="Submitting..."
        >
          {errorMsg ? 'Retry' : 'Confirm Deposit'}
        </Button>
      </div>
    </div>
  );
}
