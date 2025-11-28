import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql';
import {
  Flex,
  HStack,
  HelperIcon,
  LoadingBox,
  LoadingWrapper,
  Text,
  Tooltip,
  VStack,
} from '@fuels/ui';
import { formatZeroUnits } from 'app-commons';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';

type TxPoliciesProps = {
  transaction: GQLTransactionItemFragment | undefined;
  isLoading?: boolean;
};

const POLICY_NAMES: Record<string, { name: string; description: string }> = {
  tip: {
    name: 'Tip',
    description: 'Optional tip to the block producer',
  },
  witnessLimit: {
    name: 'Witness Limit',
    description: 'Maximum number of witness bytes allowed',
  },
  maturity: {
    name: 'Maturity',
    description: 'Block height until which the transaction cannot be included',
  },
  maxFee: {
    name: 'Max Fee',
    description: 'Maximum fee the sender is willing to pay',
  },
  ownerInputIndex: {
    name: 'Owner',
    description:
      'Input index designated as the transaction owner (PolicyType 32)',
  },
};

export function TxPolicies({ transaction, isLoading }: TxPoliciesProps) {
  const policies = transaction?.policies;
  const ownerInputIndex = transaction?.ownerInputIndex;

  const allPolicies = {
    ...(policies || {}),
    ...(ownerInputIndex != null && { ownerInputIndex }),
  };

  const policyEntries = Object.entries(allPolicies).filter(
    ([key, value]) => key !== '__typename' && value != null,
  );

  const hasPolicies = policyEntries.length > 0;

  // Don't render if no policies and not loading
  if (!hasPolicies && !isLoading) {
    return null;
  }

  return (
    <CardInfo name="Policies">
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={
          <VStack gap="2">
            <LoadingBox className="w-full h-4" />
            <LoadingBox className="w-3/4 h-4" />
          </VStack>
        }
        regularEl={
          <VStack gap="2">
            {policyEntries.map(([key, value]) => {
              const policyInfo = POLICY_NAMES[key];
              if (!policyInfo) return null;

              return (
                <PolicyItem
                  key={key}
                  name={policyInfo.name}
                  description={policyInfo.description}
                  value={value}
                  policyKey={key}
                  transaction={transaction}
                />
              );
            })}
          </VStack>
        }
      />
    </CardInfo>
  );
}

function PolicyItem({
  name,
  description,
  value,
  policyKey,
  transaction,
}: {
  name: string;
  description: string;
  value: string | number;
  policyKey: string;
  transaction: GQLTransactionItemFragment | undefined;
}) {
  const formattedValue = formatPolicyValue(policyKey, value, transaction);

  return (
    <Flex justify="between" align="center" className="gap-2">
      <HStack gap="1" align="center" className="flex-shrink-0">
        <Text className="text-xs">{name}</Text>
        <HelperIcon message={description} iconSize={12} />
      </HStack>
      <Tooltip content={description}>
        <Text className="text-xs text-primary truncate">{formattedValue}</Text>
      </Tooltip>
    </Flex>
  );
}

function formatPolicyValue(
  key: string,
  value: string | number,
  transaction: GQLTransactionItemFragment | undefined,
): string {
  const numValue =
    typeof value === 'string' ? Number.parseInt(value, 10) : value;

  switch (key) {
    case 'tip':
    case 'maxFee':
      return `${formatZeroUnits(numValue.toString())} ETH`;

    case 'witnessLimit':
      return `${numValue.toLocaleString()} bytes`;

    case 'maturity':
      return numValue === 0 ? 'None' : `Block #${numValue}`;

    case 'ownerInputIndex': {
      const inputs = transaction?.inputs || [];
      const ownerInput = inputs[numValue];

      if (ownerInput) {
        const inputType =
          ownerInput.__typename?.replace('Input', '') || 'Unknown';
        return `Input #${numValue} (${inputType})`;
      }

      return `Input #${numValue}`;
    }

    default:
      return numValue.toString();
  }
}
