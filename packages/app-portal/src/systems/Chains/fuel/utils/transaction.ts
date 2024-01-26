import type {
  Coin,
  MessageCoin,
  Resource,
  TransactionRequestInput,
} from 'fuels';
import { InputType, ZeroBytes32, isCoin, isMessage } from 'fuels';

export function resourcesToInputs(resources: Array<Resource>) {
  const coinResources: Coin[] = resources.filter((r) =>
    isCoin(r)
  ) as unknown as Coin[];

  const coinInputs: Array<TransactionRequestInput> = coinResources.map(
    (r: Coin) => ({
      type: InputType.Coin,
      id: r.id,
      owner: r.owner.toB256(),
      amount: r.amount.toHex(),
      assetId: r.assetId,
      txPointer: ZeroBytes32,
      witnessIndex: 0,
    })
  );
  const messageCoinResources: MessageCoin[] = resources.filter((r) =>
    isMessage(r)
  ) as unknown as MessageCoin[];

  const messageCoinInputs: Array<TransactionRequestInput> =
    messageCoinResources.map((r: MessageCoin) => ({
      type: InputType.Message,
      assetId: r.assetId,
      sender: r.sender.toB256(),
      recipient: r.recipient.toB256(),
      nonce: r.nonce,
      amount: r.amount.toHex(),
      daHeight: r.daHeight.toHex(),
      witnessIndex: 0,
    }));
  return [...coinInputs, ...messageCoinInputs];
}
