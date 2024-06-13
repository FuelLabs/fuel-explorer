import { Paginator } from '~/core/Paginator';
import { ResolverAdapter } from '~/core/Resolver';
import { OperationsTable } from '~/domain/Operation/OperationModel';
import { OperationRepository } from '~/domain/Operation/OperationRepository';
import type {
  GQLOperation,
  GQLQueryOperationsArgs,
} from '~/graphql/generated/sdk';
import { db } from '~/infra/database/Db';

type Source = GQLOperation;
type Params = {
  operations: GQLQueryOperationsArgs;
};

class OperationResolver extends ResolverAdapter<Source> {
  private constructor(
    private readonly operationRepository = new OperationRepository(
      db.connection(),
    ),
  ) {
    super();
    this.setResolvers({
      Query: {
        operations: this.operations.bind(this),
      },
    });
  }

  static create() {
    return new OperationResolver().getResolvers();
  }

  async operations(_: Source, params: Params['operations']) {
    const paginator = new Paginator(OperationsTable, params);
    const operations = await this.operationRepository.findMany(params);
    const startCursor = paginator.getStartCursor(operations);
    const endCursor = paginator.getEndCursor(operations);
    return paginator.createPaginatedResult(
      operations,
      startCursor,
      endCursor,
      (item) => item.toGQLNode(),
    );
  }
}

export default OperationResolver.create();
