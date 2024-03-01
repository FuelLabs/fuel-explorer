import { IUseCase } from '~/core/UseCase';
import { TransactionRepository } from '~/domain/Transaction/TransactionRepository';
import { GQLBlock } from '~/generated/types';

type Input = {
  block: GQLBlock;
  blockId: number;
};

export class SyncTransactions implements IUseCase<Input, void> {
  async execute({ block, blockId }: Input) {
    const repository = new TransactionRepository();
    await repository.insertMany(block.transactions, blockId);
  }
}
