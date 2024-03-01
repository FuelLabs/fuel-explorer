import { ResolverAdapter } from '~/core/Resolver';
import { BalanceResolver } from './BalanceResolver';
import { BlockResolver } from './BlockResolver';
import { ChainResolver } from './ChainResolver';
import { ContractResolver } from './ContractResolver';
import { NodeResolver } from './NodeResolver';
import { TransactionResolver } from './TransactionResolver';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class MainResolver extends ResolverAdapter<any> {
  constructor() {
    super();

    const balanceResolver = new BalanceResolver();
    const blockResolver = new BlockResolver();
    const chainResolver = new ChainResolver();
    const contractResolver = new ContractResolver();
    const nodeResolver = new NodeResolver();
    const transactionResolver = new TransactionResolver();

    this.setResolvers({
      ...balanceResolver.getResolvers(),
      ...blockResolver.getResolvers(),
      ...chainResolver.getResolvers(),
      ...contractResolver.getResolvers(),
      ...nodeResolver.getResolvers(),
      ...transactionResolver.getResolvers(),
    });
  }
}
