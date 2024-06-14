import { ResolverAdapter } from '~/core/Resolver';
import type { GQLNodeInfo } from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLNodeInfo;
type Params = {
  nodeInfo: null;
};

class NodeResolver extends ResolverAdapter<Source> {
  private constructor() {
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

  async nodeInfo(
    _: Source,
    _params: Params['nodeInfo'],
    { client }: GraphQLContext,
  ) {
    // TODO: need to check with @luizstacio about the nodeInfo resolver
    const res = await client.sdk.nodeInfo();
    return res.data.nodeInfo;
  }
}

export default NodeResolver.create();
