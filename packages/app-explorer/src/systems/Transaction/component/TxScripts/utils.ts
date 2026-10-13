import type {
  GQLTransactionReceiptFragment,
  Maybe,
} from '@fuel-explorer/graphql/sdk';

export function parseTXScriptJson(
  item?: Maybe<GQLTransactionReceiptFragment>,
): Record<string, any> {
  if (!item) return {};
  return Object.entries(item).reduce((acc, [key, value]) => {
    if (!value || key === '__typename') return acc;
    if (typeof value === 'object') {
      return { ...acc, [key]: parseTXScriptJson(value) };
    }
    return { ...acc, [key]: value };
  }, {});
}

export function notBoolean(value: any) {
  return typeof value !== 'boolean' ? value : '';
}

const SUMMARY_THRESHOLD = 3;

// Long operation lists start folded, showing only their first and last receipt.
export function hasFoldedOperations(
  tx?: {
    operations?: Maybe<Array<Maybe<{ receipts?: Maybe<Array<unknown>> }>>>;
  } | null,
) {
  const count = (tx?.operations ?? []).reduce(
    (acc, op) => acc + (op?.receipts?.length ?? 0),
    0,
  );
  return count > SUMMARY_THRESHOLD;
}
