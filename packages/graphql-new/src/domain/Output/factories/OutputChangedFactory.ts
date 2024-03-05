import { BN, bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import { GQLChangeOutput, GQLOutput } from '~/graphql/generated/sdk';

type Source = GQLChangeOutput;
export type OutputChangeGroupedEntry = {
  type: 'ChangeOutput';
  to: string;
  assetId: string;
  totalAmount: BN;
  outputs: Source[];
};

export class OutputChangedFactory {
  value: OutputChangeGroupedEntry[];
  private constructor(data: GQLOutput[]) {
    const outputs = GQLNode.filterByType(data, 'ChangeOutput');
    this.value = this.entriesFromOutputs(outputs as Source[]);
  }

  static create(outputsData: GQLOutput[]) {
    return new OutputChangedFactory(outputsData);
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
