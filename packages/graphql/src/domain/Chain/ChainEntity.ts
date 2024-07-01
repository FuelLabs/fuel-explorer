import { Entity } from '~/core/Entity';
import type { GQLChainInfo } from '~/graphql/generated/sdk-provider';
import { ChainData } from './vo/ChainData';
import { ChainID } from './vo/ChainID';

type ChainProps = {
  id: ChainID;
  data: ChainData;
};

export class ChainEntity extends Entity<ChainProps, ChainID> {
  static create(chain: GQLChainInfo) {
    const id = ChainID.create(chain);
    const data = ChainData.create(chain);
    return new ChainEntity({ id, data }, id);
  }

  get cursor() {
    return this.props.id.value();
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
