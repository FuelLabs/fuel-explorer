import { Entity } from '~/core/Entity';
import type { GQLChainInfo } from '~/graphql/generated/sdk-provider';
import { ChainData } from './vo/ChainData';
import { ChainID } from './vo/ChainID';

type ChainProps = {
  id: ChainID;
  data: ChainData;
};

export class ChainEntity extends Entity<ChainProps, ChainID> {
  static create(chainInfo: GQLChainInfo) {
    const chainId = ChainID.create(chainInfo);
    const chainData = ChainData.create(chainInfo);
    return new ChainEntity({ id: chainId, data: chainData }, chainId);
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
