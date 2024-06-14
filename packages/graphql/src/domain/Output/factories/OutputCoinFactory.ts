import { bn } from 'fuels';
import { groupBy } from 'lodash';
import { GQLNode } from '~/core/GQLNode';
import {
  type GQLCoinOutput,
  type GQLGroupedOutputCoin,
  GQLGroupedOutputType,
  type GQLOutput,
} from '~/graphql/generated/sdk-provider';

type Source = GQLCoinOutput;
type Typename = GQLGroupedOutputCoin['__typename'];
export type OutputCoinGroupedEntry = GQLGroupedOutputCoin;

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
        const to = outputs[0].to;
        const totalAmount = this.getTotalAmount(outputs).toString();
        return {
          __typename: 'GroupedOutputCoin' as Typename,
          type: GQLGroupedOutputType.OutputCoin,
          to,
          assetId,
          totalAmount,
          outputs,
        };
      },
    );
  }

  private getTotalAmount(outputs: Source[]) {
    return outputs.reduce((acc, output) => acc.add(bn(output.amount)), bn(0));
  }
}
