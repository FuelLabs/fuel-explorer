import type { GQLNodeInfo } from '~/graphql/generated/sdk-provider';
import type { GraphQLContext } from '../GraphQLContext';

type Source = GQLNodeInfo;
type Params = {
  nodeInfo: null;
};

export class NodeResolver {
  static create() {
    const resolvers = new NodeResolver();
    return {
      Query: {
        nodeInfo: resolvers.nodeInfo,
      },
    };
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
