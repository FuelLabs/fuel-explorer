import type {
  Asset,
  Coin,
  MessageCoin,
  Resource,
  TransactionRequestInput,
  TransactionResult,
} from 'fuels';
import {
  InputType,
  ReceiptType,
  ZeroBytes32,
  getReceiptsMessageOut,
  hexlify,
  isCoin,
  isMessage,
} from 'fuels';
import {
  getAssetEthCurrentChain,
  getAssetFuelCurrentChain,
} from '~portal/systems/Assets/utils/network';
import {
  isSameEthAddress,
  parseFuelAddressToEth,
} from '../../eth/utils/address';

export function resourcesToInputs(resources: Array<Resource>) {
  const coinResources: Coin[] = resources.filter((r) =>
    isCoin(r),
  ) as unknown as Coin[];

  const coinInputs: Array<TransactionRequestInput> = coinResources.map(
    (r: Coin) => ({
      type: InputType.Coin,
      id: r.id,
      owner: r.owner.toString(),
      amount: r.amount.toHex(),
      assetId: r.assetId,
      txPointer: ZeroBytes32,
      witnessIndex: 0,
    }),
  );
  const messageCoinResources: MessageCoin[] = resources.filter((r) =>
    isMessage(r),
  ) as unknown as MessageCoin[];

  const messageCoinInputs: Array<TransactionRequestInput> =
    messageCoinResources.map((r: MessageCoin) => ({
      type: InputType.Message,
      assetId: r.assetId,
      sender: r.sender.toString(),
      recipient: r.recipient.toString(),
      nonce: r.nonce,
      amount: r.amount.toHex(),
      daHeight: r.daHeight.toHex(),
      witnessIndex: 0,
    }));
  return [...coinInputs, ...messageCoinInputs];
}

export function getAssetAmountWithdrawed({
  txResult,
  assets,
}: {
  txResult?: TransactionResult;
  assets?: Asset[];
}) {
  if (!txResult || !assets) return undefined;

  const messageOutReceipt = getReceiptsMessageOut(txResult?.receipts || [])[0];

  if (messageOutReceipt) {
    const burnReceipt = txResult?.receipts?.find(
      (receipt) => receipt.type === ReceiptType.Burn,
    );
    if (burnReceipt) {
      const receipt = burnReceipt as Extract<
        typeof burnReceipt,
        { type: ReceiptType.Burn }
      >;
      const amount = receipt.val;
      const ethAssetId = messageOutReceipt.data
        ? parseFuelAddressToEth(
            hexlify(messageOutReceipt.data).replace('0x', '').slice(72, 136),
          )
        : undefined;
      const ethAsset = assets
        .map((asset) => ({
          asset,
          ethNetwork: getAssetEthCurrentChain(asset),
        }))
        .find(({ ethNetwork }) => {
          return isSameEthAddress(ethNetwork?.address, ethAssetId);
        });
      const fuelAsset = ethAsset?.asset
        ? getAssetFuelCurrentChain(ethAsset.asset)
        : undefined;

      return {
        asset: ethAsset?.asset,
        amount: amount.format({
          units: fuelAsset?.decimals,
          precision: fuelAsset?.decimals,
        }),
      };
    }
  }

  const asset = assets.find((asset) => asset.symbol === 'ETH');

  if (!asset) return undefined;

  const ethNetwork = getAssetEthCurrentChain(asset);

  return {
    asset,
    amount: messageOutReceipt?.amount?.format({
      precision: ethNetwork?.decimals,
    }),
  };
}
