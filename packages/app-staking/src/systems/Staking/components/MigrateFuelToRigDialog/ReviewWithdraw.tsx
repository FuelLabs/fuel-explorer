import {
  Button,
  FuelLogo,
  HStack,
  LoadingBox,
  LoadingWrapper,
  Separator,
  Text,
  VStack,
} from '@fuels/ui';
import { TokenBadge } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import { type BN, DECIMAL_FUEL } from 'fuels';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { FormattedAmount } from '~staking/systems/Core/components/FormattedAmount/FormattedAmount';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';

interface Props {
  stakedAmount?: BN | null;
  errorMsg?: string | null;
  isSubmitting: boolean;
  onConfirm: () => void;
}

export function ReviewWithdraw({
  stakedAmount,
  errorMsg,
  isSubmitting,
  onConfirm,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Text size="3" weight="medium">
            Step 1 - Withdraw from Fuel Staking
          </Text>
          <div className="flex items-center gap-2">
            <TokenBadge image="/assets/fuel.png" symbol="FUEL" size="small" />
            <LoadingWrapper
              loadingEl={<LoadingBox className="w-32 h-6" />}
              regularEl={
                <FormattedAmount
                  amount={stakedAmount || undefined}
                  decimals={DECIMAL_FUEL}
                  symbol="FUEL"
                  textProps={{
                    as: 'div',
                    size: '6',
                    weight: 'bold',
                    className:
                      'font-mono text-[24px] text-heading text-ellipsis',
                  }}
                />
              }
            />
          </div>
        </div>
        <Separator size="4" />
        <RegularInfoSection
          header="To"
          text="My Account"
          textSupport="(FUEL balance)"
          icon={<FuelLogo size={24} />}
        />
        <Separator size="4" />
        <HStack gap="2">
          <IconInfoCircle size={24} className="shrink-0 text-blue-11" />
          <VStack gap="1">
            <Text className="text-heading">
              This operation will withdraw all your staked assets and rewards
            </Text>
            <Text className="text-gray-10 text-sm">
              After this transaction, you'll be able to deposit to The Rig in
              the next step
            </Text>
          </VStack>
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
          {errorMsg ? 'Retry' : 'Confirm Withdraw →'}
        </Button>
      </div>
    </div>
  );
}
