import type { GQLChainInfo } from '@core/generated/gql-types';
import { Identifier } from '@core/shared/Identifier';

export class ChainID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static create(chain: GQLChainInfo) {
    return new ChainID(Number(chain.consensusParameters.chainId));
  }
}
