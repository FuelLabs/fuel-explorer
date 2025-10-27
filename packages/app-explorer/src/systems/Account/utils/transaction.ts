import { OutputType, ScriptTransactionRequest, bn } from 'fuels';

import type { Account, BN } from 'fuels';

type CreateTransferProps = {
  amount: BN;
  destinyAddress: string;
  assetId: string;
  wallet: Account;
  balance: BN;
  isUsingMaxBalance: boolean;
  feeDiscount?: number;
};

export const createTransfer = async ({
  amount,
  destinyAddress,
  assetId,
  wallet,
  balance,
  isUsingMaxBalance,
  feeDiscount = 0,
}: CreateTransferProps) => {
  const rawTxRequest = new ScriptTransactionRequest();

  // add transfer to transaction request, using the full amount
  wallet.addTransfer(rawTxRequest, {
    amount,
    destination: destinyAddress,
    assetId,
  });

  // get cost for current simple transfer tx of full amount to destiny
  const rawTxCost = await wallet.getTransactionCost(rawTxRequest);
  // add 50% more to the maxFee
  rawTxRequest.maxFee = bn(rawTxCost.maxFee).add(rawTxCost.maxFee.div(2));
  rawTxRequest.gasLimit = rawTxCost.gasUsed;

  const isSendingBaseAsset =
    assetId === (await wallet.provider.getBaseAssetId());
  if (isSendingBaseAsset) {
    // if requiredQuantities is bigger than balance, means we don't have funds to pay for amount + fee
    const shouldDiscountFeeFromOutput = !!rawTxCost.requiredQuantities.find(
      (quantity) => {
        if (quantity.assetId !== assetId) return false;

        const amountPlusFee = bn(quantity.amount).add(rawTxRequest.maxFee);
        return amountPlusFee.gt(balance || 0);
      },
    );

    if (shouldDiscountFeeFromOutput) {
      for (const output of rawTxRequest.outputs) {
        if (output.type === OutputType.Coin && output.assetId === assetId) {
          // discount request maxFee and extra inputted discountFee, avoiding errors with not enough funds for prediacte fee
          const amountWithFeeDiscounted = bn(output.amount)
            .sub(
              rawTxRequest.maxFee,
              // as we dont know the predicate estimate, apply extra discount without affecting fund
            )
            .sub(feeDiscount);
          // we need to reduce plus 1 as the getResourcesToSpend doesn't accept the exact balance amount, needs to be 1 unit less
          output.amount = amountWithFeeDiscounted.sub(1);
          break;
        }
      }
    }
  }

  // calculate the cost again with the new discounted fee from outputs of rawTxRequest
  const discountedTxCost = await wallet.getTransactionCost(rawTxRequest);

  const fundedTxRequest = await wallet.fund(rawTxRequest, discountedTxCost);

  if (isUsingMaxBalance && isSendingBaseAsset) {
    // if it's sending the max balance, go over the outputs to apply needed changes and
    for (const output of fundedTxRequest.outputs) {
      // make sure all the balance will be send to the destiny address
      if (output.type === OutputType.Change && output.assetId === assetId) {
        output.to = destinyAddress;
      }
    }
  }

  return fundedTxRequest;
};
