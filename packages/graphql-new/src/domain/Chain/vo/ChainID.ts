import { Identifier } from '~/core/Identifier';
import { GQLChainInfo } from '~/graphql/generated/sdk';

export class ChainID extends Identifier<number> {
  private constructor(id: number) {
    super(id);
  }

  static create(chain: GQLChainInfo) {
    return new ChainID(Number(chain.consensusParameters.chainId));
  }
}
