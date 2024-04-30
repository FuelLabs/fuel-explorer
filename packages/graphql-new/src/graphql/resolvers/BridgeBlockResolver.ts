import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { BridgeBlocksTable } from '~/domain/BridgeBlock/BridgeBlockModel';
import { BridgeBlockRepository } from '~/domain/BridgeBlock/BridgeBlockRepository';
import {
  GQLBridgeBlock,
  GQLQueryBridgeBlocksArgs,
} from '~/graphql/generated/sdk';

type Source = GQLBridgeBlock;
type Params = {
  bridgeBlocks: GQLQueryBridgeBlocksArgs;
};

class BridgeBlockResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly repository = new BridgeBlockRepository(),
  ) {
    super();
    this.setResolvers({
      Query: {
        bridgeBlocks: this.bridgeBlocks.bind(this),
      },
    });
  }

  static create() {
    return new BridgeBlockResolver().getResolvers();
  }

  async bridgeBlocks(_: Source, params: Params['bridgeBlocks']) {
    const paginator = new Paginator(BridgeBlocksTable, params);
    const blocks = await this.repository.findMany(params);
    const startCursor = paginator.getStartCursor(blocks);
    const endCursor = paginator.getEndCursor(blocks);

    return paginator.createPaginatedResult(
      blocks,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }
}

export default BridgeBlockResolver.create();
