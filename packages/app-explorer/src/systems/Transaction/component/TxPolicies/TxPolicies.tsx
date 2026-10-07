import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql';
import {
  HStack,
  HelperIcon,
  LoadingBox,
  LoadingWrapper,
  Tooltip,
  VStack,
} from '@fuels/ui';
import { bn } from 'fuels';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { TxFact } from '../TxItem/TxFact';

type TxPoliciesProps = {
  transaction: GQLTransactionItemFragment | undefined;
  isLoading?: boolean;
};

const POLICY_KEYS = [
  'tip',
  'witnessLimit',
  'maturity',
  'maxFee',
  'ownerInputIndex',
] as const;

const POLICY_I18N: Record<(typeof POLICY_KEYS)[number], string> = {
  tip: 'tip',
  witnessLimit: 'witness_limit',
  maturity: 'maturity',
  maxFee: 'max_fee',
  ownerInputIndex: 'owner',
};

export function TxPolicies({ transaction, isLoading }: TxPoliciesProps) {
  const { t } = useTranslation();
  const policies = transaction?.policies;

  const allPolicies = {
    ...(policies || {}),
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
    <TxFact label={t('tx.policies')}>
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={
          <VStack gap="2">
            <LoadingBox className="h-4 w-full" />
            <LoadingBox className="h-4 w-3/4" />
          </VStack>
        }
        regularEl={
          <VStack gap="2">
            {policyEntries.map(([key, value]) => {
              const i18nKey = POLICY_I18N[key as keyof typeof POLICY_I18N];
              if (!i18nKey) return null;

              return (
                <PolicyItem
                  key={key}
                  name={t(`tx.policy.${i18nKey}.name`)}
                  description={t(`tx.policy.${i18nKey}.description`)}
                  value={value}
                  policyKey={key}
                  transaction={transaction}
                  t={t}
                />
              );
            })}
          </VStack>
        }
      />
    </TxFact>
  );
}

function PolicyItem({
  name,
  description,
  value,
  policyKey,
  transaction,
  t,
}: {
  name: string;
  description: string;
  value: string | number;
  policyKey: string;
  transaction: GQLTransactionItemFragment | undefined;
  t: TFunction;
}) {
  const formattedValue = formatPolicyValue(policyKey, value, transaction, t);

  return (
    <div className="flex items-center justify-between gap-2 text-[13px]">
      <HStack gap="1" align="center" className="shrink-0">
        <span className="text-[var(--fuel-element-low-em)]">{name}</span>
        <HelperIcon message={description} iconSize={12} />
      </HStack>
      <Tooltip content={description}>
        <span className="truncate text-heading">{formattedValue}</span>
      </Tooltip>
    </div>
  );
}

function formatPolicyValue(
  key: string,
  value: string | number,
  transaction: GQLTransactionItemFragment | undefined,
  t: TFunction,
): string {
  switch (key) {
    case 'tip':
    case 'maxFee':
      return `${bn(value).format()} ETH`;

    case 'witnessLimit': {
      const numValue = bn(value).toNumber();
      return t('tx.policy.bytes', { bytes: numValue.toLocaleString() });
    }

    case 'maturity': {
      const numValue = bn(value).toNumber();
      return numValue === 0
        ? t('tx.policy.none')
        : t('tx.policy.block', { height: numValue });
    }

    case 'ownerInputIndex': {
      const numValue = bn(value).toNumber();
      const inputs = transaction?.inputs || [];
      const ownerInput = inputs[numValue];

      if (ownerInput) {
        const inputType =
          ownerInput.__typename?.replace('Input', '') || t('tx.policy.unknown');
        return t('tx.policy.input_typed', { index: numValue, type: inputType });
      }

      return t('tx.policy.input', { index: numValue });
    }

    default:
      return bn(value).toString();
  }
}
