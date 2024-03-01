import { ResolverAdapter } from '~/core/Resolver';
import { BlockResolver } from '~/graphql/resolvers/BlockResolver';
import { TransactionResolver } from './TransactionResolver';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class MainResolver extends ResolverAdapter<any> {
  constructor() {
    super();

    const blockResolver = new BlockResolver();
    const transactionResolver = new TransactionResolver();

    this.setResolvers({
      ...blockResolver.getResolvers(),
      ...transactionResolver.getResolvers(),
    });
  }
}