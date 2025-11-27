import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql';
import {
  Badge,
  Card,
  Flex,
  HStack,
  HelperIcon,
  LoadingBox,
  Text,
  Tooltip,
  VStack,
} from '@fuels/ui';
import { formatZeroUnits } from 'app-commons';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

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

  // Combine policies and ownerInputIndex into a single object
  const allPolicies = {
    ...(policies || {}),
    ...(ownerInputIndex != null && { ownerInputIndex }),
  };

  // Check if we have any non-null policies
  const hasPolicies = Object.entries(allPolicies).some(
    ([key, value]) => key !== '__typename' && value != null,
  );

  if (isLoading) {
    return (
      <Card>
        <Card.Body>
          <VStack gap="2">
            <LoadingBox className="w-full h-6" />
            <LoadingBox className="w-full h-6" />
            <LoadingBox className="w-full h-6" />
          </VStack>
        </Card.Body>
      </Card>
    );
  }

  if (!hasPolicies) {
    return (
      <EmptyCard hideImage>
        <EmptyCard.Title>No Policies</EmptyCard.Title>
        <EmptyCard.Description>
          This transaction does not have any policies set.
        </EmptyCard.Description>
      </EmptyCard>
    );
  }

  return (
    <Card>
      <Card.Body>
        <VStack gap="3">
          {Object.entries(allPolicies).map(([key, value]) => {
            if (key === '__typename' || value == null) return null;

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
      </Card.Body>
    </Card>
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
  const isOwner = policyKey === 'ownerInputIndex';

  return (
    <Flex justify="between" align="center">
      <HStack gap="1" align="center">
        <Text className="text-sm font-medium">{name}</Text>
        <HelperIcon message={description} />
        {isOwner && (
          <Badge color="blue" variant="ghost" size="1">
            NEW
          </Badge>
        )}
      </HStack>
      <Tooltip content={description}>
        <Text className="text-sm text-muted">{formattedValue}</Text>
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
      // Show the input index and type
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
