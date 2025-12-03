import { TransactionCoder, arrayify } from 'fuels';
import { logger } from '~/core/Logger';
import type {
  GQLPolicies,
  GQLTransaction,
} from '~/graphql/generated/sdk-provider';

type PoliciesWithRawPayload = GQLPolicies & { rawPayload?: string };

export class PoliciesResolver {
  static create() {
    const _resolvers = new PoliciesResolver();
    return {
      Transaction: {
        policies: PoliciesResolver.resolvePolicies,
      },
      Policies: {
        ownerInputIndex: PoliciesResolver.resolveOwnerInputIndex,
      },
    };
  }

  /**
   * Enhances the Policies object with the transaction's rawPayload
   * so that downstream resolvers can decode transaction-level policies.
   */
  static resolvePolicies(
    transaction: GQLTransaction,
  ): PoliciesWithRawPayload | null {
    if (!transaction.policies) {
      return null;
    }

    // Add rawPayload to the Policies object so child resolvers can access it
    return {
      ...transaction.policies,
      rawPayload: transaction.rawPayload,
    };
  }

  /**
   * Resolves the Owner policy (PolicyType 32) using fuels-ts SDK decoder.
   * The Owner policy designates which input index is the transaction owner.
   */
  static resolveOwnerInputIndex(
    policies: PoliciesWithRawPayload,
  ): number | null {
    try {
      const rawPayload = policies.rawPayload;
      if (!rawPayload) {
        return null;
      }

      // Use fuels-ts SDK to decode the transaction
      const bytes = arrayify(rawPayload);
      const [decoded] = new TransactionCoder().decode(bytes, 0);

      // Access ownerInputIndex from decoded policies
      const ownerInputIndex = decoded.policies?.find(
        (p: { type: number; data: unknown }) => p.type === 32,
      )?.data;

      if (ownerInputIndex != null) {
        logger.debug(
          'PoliciesResolver.ownerInputIndex',
          `Owner policy found: ${ownerInputIndex}`,
        );
        return Number(ownerInputIndex);
      }

      return null;
    } catch (error) {
      logger.error('PoliciesResolver.ownerInputIndex', error);
      return null;
    }
  }
}
