import { ResolverAdapter } from '~/core/Resolver';
import { GQLNodeInfo } from '~/graphql/generated/sdk';
import { GraphQLSDK } from '../GraphQLSDK';

type Source = GQLNodeInfo;
type Params = {
  nodeInfo: null;
};

class NodeResolver extends ResolverAdapter<Source> {
  private constructor(private readonly client = new GraphQLSDK()) {
    super();
    this.setResolvers({
      Query: {
        nodeInfo: this.nodeInfo.bind(this),
      },
    });
  }

  static create() {
    return new NodeResolver().getResolvers();
  }

  async nodeInfo(_: Source, _params: Params['nodeInfo']) {
    // TODO: need to check with @luizstacio about the nodeInfo resolver
    const res = await this.client.sdk.nodeInfo();
    return res.data.nodeInfo;
  }
}

export default NodeResolver.create();
