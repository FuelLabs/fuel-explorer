import {
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
