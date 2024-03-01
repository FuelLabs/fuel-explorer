import { Entity } from '~/core/Entity';
import { GQLChainInfo } from '~/graphql/generated/sdk';
import { ChainItem } from './ChainModel';
import { ChainData } from './vo/ChainData';
import { ChainModelID } from './vo/ChainModelID';

type ChainProps = {
  data: ChainData;
};

export class ChainEntity extends Entity<ChainProps, ChainModelID> {
  private constructor(id: ChainModelID, props: ChainProps) {
    super(id, props);
  }

  static create(chain: ChainItem) {
    if (!chain?.data) {
      throw new Error('Invalid chain data');
    }

    const item = chain.data;
    const id = ChainModelID.create(item);
    const data = ChainData.create(item);
    return new ChainEntity(id, { data });
  }

  static toDBItem(chain: GQLChainInfo) {
    return {
      _id: ChainModelID.create(chain).value(),
      data: ChainData.create(chain).value(),
    };
  }

  get data() {
    return this.props.data.value();
  }

  toGQLNode(): GQLChainInfo {
    return this.data;
  }
}
