import {
  Button,
  Copyable,
  FuelLogo,
  HStack,
  Separator,
  Text,
  VStack,
  shortAddress,
} from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import type { BN } from 'fuels';
import { ErrorInline } from '~staking/systems/Core/components/ErrorInline/ErrorInline';
import { LogoEth } from '~staking/systems/Core/components/LogoEth/LogoEth';
import { RegularInfoSection } from '~staking/systems/Core/components/RegularInfoSection/RegularInfoSection';
import { useFormattedTokenAmount } from '~staking/systems/Core/hooks/useFormattedTokenAmount';

interface StakeApprovalProps {
  amount?: BN | null;
  rates: any[];
  onApprove: () => void;
  onBack: () => void;
  fromAccount?: string;
  isLoadingApproval?: boolean;
  errorMsg?: string | null;
}

const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

export function StakeApproval({
  amount,
  rates,
  onApprove,
  fromAccount = '',
  onBack,
  isLoadingApproval,
  errorMsg,
}: StakeApprovalProps) {
  const { formattedAmount, formattedAmountUsd } = useFormattedTokenAmount({
    amount: amount || null,
    symbol,
    decimals,
    rates,
  });

  // Display a truncated version of the address
  const displayAddress = shortAddress(fromAccount);

  return (
    <VStack gap="8">
      <VStack gap="3" className="flex-1">
        <Text weight="medium" className="text-heading">
          Approve spending of FUEL
        </Text>

        <Text className="text-gray-10 text-sm">
          To continue with the staking process, you need to grant permission for
          this contract to spend tokens from your Ethereum balance.
        </Text>

        <Separator size="4" />
        <RegularInfoSection
          header="Amount to be approved"
          text={formattedAmount.display}
          textSupport={`(${formattedAmountUsd})`}
          icon={<FuelLogo size={22} />}
        />

        <Separator size="4" />
        <RegularInfoSection
          header="From Account"
          text={<Copyable value={fromAccount}>{displayAddress}</Copyable>}
          icon={<LogoEth />}
        />
      </VStack>
      <div>
        <ErrorInline error={errorMsg} className="mb-1" />
        <HStack gap="3" className="w-full">
          <Button
            variant="outline"
            color="gray"
            type="button"
            className="rounded-md flex-1"
            size="3"
            onClick={onBack}
            disabled={isLoadingApproval}
          >
            ← Back
          </Button>
          <Button
            type="button"
            className="rounded-md flex-1"
            size="3"
            onClick={onApprove}
            isLoading={isLoadingApproval}
            loadingText="Approving..."
          >
            {errorMsg ? 'Retry' : 'Approve'}
          </Button>
        </HStack>
      </div>
    </VStack>
  );
}
