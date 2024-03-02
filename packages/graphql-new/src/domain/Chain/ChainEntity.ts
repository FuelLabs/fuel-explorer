import { Entity } from '~/core/Entity';
import { GQLChainInfo } from '~/graphql/generated/sdk';
import { ChainData } from './vo/ChainData';
import { ChainID } from './vo/ChainID';

type ChainProps = {
  data: ChainData;
};

export class ChainEntity extends Entity<ChainProps, ChainID> {
  private constructor(id: ChainID, props: ChainProps) {
    super(id, props);
  }

  static create(chain: GQLChainInfo) {
    const id = ChainID.create(chain);
    const data = ChainData.create(chain);
    return new ChainEntity(id, { data });
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
