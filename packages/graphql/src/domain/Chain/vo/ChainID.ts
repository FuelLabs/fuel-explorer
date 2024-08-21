import { Identifier } from '~/core/Identifier';
import type { GQLChainInfo } from '~/graphql/generated/sdk-provider';

export class ChainID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static create(chain: GQLChainInfo) {
    return new ChainID(Number(chain.consensusParameters.chainId));
  }
}
