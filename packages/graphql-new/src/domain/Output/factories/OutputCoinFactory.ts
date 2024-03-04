import { BN, bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import { GQLCoinOutput, GQLOutput } from '~/graphql/generated/sdk';

type Source = GQLCoinOutput;
export type OutputCoinGroupedEntry = {
  type: 'CoinOutput';
  to: string;
  assetId: string;
  totalAmount: BN;
  outputs: Source[];
};

export class OutputCoinFactory {
  value: OutputCoinGroupedEntry[];
  private constructor(data: GQLOutput[]) {
    const outputs = GQLNode.filterByType(data, 'CoinOutput');
    this.value = this.entriesFromOutputs(outputs as Source[]);
  }

  static create(outputsData: GQLOutput[]) {
    return new OutputCoinFactory(outputsData);
  }

  private entriesFromOutputs(outputs: Source[]) {
    return Object.entries(groupBy(outputs, (i) => i.assetId)).map(
      ([assetId, outputs]) => {
        const type = outputs[0].__typename;
        const to = outputs[0].to;
        const totalAmount = this.getTotalAmount(outputs);
        return { to, assetId, type, totalAmount, outputs };
      },
    );
  }

  private getTotalAmount(outputs: Source[]) {
    return outputs.reduce((acc, output) => acc.add(bn(output.amount)), bn(0));
  }
}
