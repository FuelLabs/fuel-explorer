import { Entity } from '~/core/Entity';
import type { GQLChainInfo } from '~/graphql/generated/sdk';
import { ChainData } from './vo/ChainData';
import { ChainID } from './vo/ChainID';

type ChainProps = {
  data: ChainData;
};

export class ChainEntity extends Entity<ChainProps, ChainID> {
  static create(chain: GQLChainInfo) {
    const id = ChainID.create(chain);
    const data = ChainData.create(chain);
    return new ChainEntity({ data }, id);
  }

  get data() {
    return this.props.data.value();
  }

  get chainId() {
    return this.data.consensusParameters.chainId;
  }

  toGQLNode(): GQLChainInfo {
    return this.data;
  }
}
