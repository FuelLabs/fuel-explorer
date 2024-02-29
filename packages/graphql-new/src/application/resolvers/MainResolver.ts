import { ResolverAdapter } from '~/core/Resolver';
import { BlockResolver } from './BlockResolver';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class MainResolver extends ResolverAdapter<any> {
  constructor() {
    super();

    const blockResolvers = new BlockResolver();
    this.setResolvers({
      ...blockResolvers.getResolvers(),
    });
  }
}
