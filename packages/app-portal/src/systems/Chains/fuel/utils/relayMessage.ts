import {
  contractMessagePredicate,
  contractMessageScript,
} from '@fuel-bridge/message-predicates';
import type {
  BytesLike,
  Message,
  Provider,
  TransactionResponse,
  TxParamsType,
  WalletUnlocked as FuelWallet,
} from 'fuels';
import {
  InputType,
  OutputType,
  Predicate,
  ScriptTransactionRequest,
  ZeroBytes32,
  arrayify,
  bn,
  concat,
  hexlify,
} from 'fuels';

import { resourcesToInputs } from './transaction';

type RelayMessageOptions = TxParamsType & {
  contractIds?: BytesLike[];
};

// Details for relaying common messages with certain predicate roots
function getCommonRelayableMessages(provider: Provider) {
  // Create a predicate for common messages
  const predicate = new Predicate({
    bytecode: contractMessagePredicate,
    provider,
  });

  const assetId = provider.getBaseAssetId();

  // Details for relaying common messages with certain predicate roots
  const relayableMessages: CommonMessageDetails[] = [
    {
      name: 'Message To Contract v1.3',
      predicateRoot: predicate.address.toHexString(),
      predicate: contractMessagePredicate,
      script: contractMessageScript,
      buildTx: async (
        relayer: FuelWallet,
        message: Message,
        details: CommonMessageDetails,
        opts?: RelayMessageOptions,
      ): Promise<ScriptTransactionRequest> => {
        const script = arrayify(details.script);
        const predicateBytecode = arrayify(details.predicate);
        // get resources to fund the transaction
        const resources = await relayer.getResourcesToSpend([
          {
            amount: bn(100),
            assetId,
          },
        ]);
        // convert resources to inputs
        const spendableInputs = resourcesToInputs(resources);

        // get contract id
        const data = arrayify(message.data);
        if (data.length < 32)
          throw new Error('cannot find contract ID in message data');
        const contractId = hexlify(data.slice(0, 32));

        // build the transaction
        const transaction = new ScriptTransactionRequest({
          script,
        });
        transaction.inputs.push({
          type: InputType.Message,
          amount: message.amount,
          sender: message.sender.toHexString(),
          recipient: message.recipient.toHexString(),
          witnessIndex: 0,
          data: message.data,
          nonce: message.nonce,
          predicate: predicateBytecode,
        });
        transaction.inputs.push({
          type: InputType.Contract,
          txPointer: ZeroBytes32,
          contractId,
        });

        for (const additionalContractId of opts?.contractIds || []) {
          if (additionalContractId) {
            transaction.inputs.push({
              type: InputType.Contract,
              txPointer: ZeroBytes32,
              contractId: additionalContractId,
            });
          }
        }

        transaction.inputs.push(...spendableInputs);

        transaction.outputs.push({
          type: OutputType.Contract,
          inputIndex: 1,
        });

        for (const [index, additionalContractId] of (
          opts?.contractIds || []
        ).entries()) {
          if (additionalContractId) {
            transaction.outputs.push({
              type: OutputType.Contract,
              inputIndex: 2 + index,
            });
          }
        }

        transaction.outputs.push({
          type: OutputType.Change,
          to: relayer.address.toB256(),
          assetId,
        });
        transaction.outputs.push({
          type: OutputType.Variable,
        });

        transaction.witnesses.push(concat([ZeroBytes32, ZeroBytes32]));

        const transactionCost = await relayer.getTransactionCost(transaction);

        transaction.gasLimit = transactionCost.gasUsed.mul(1.2);
        transaction.maxFee = transactionCost.maxFee;

        return transaction;
      },
    },
  ];

  return relayableMessages;
}

type CommonMessageDetails = {
  name: string;
  predicateRoot: string;
  predicate: string;
  script: string;
  buildTx: (
    relayer: FuelWallet,
    message: Message,
    details: CommonMessageDetails,
    txParams: TxParamsType,
  ) => Promise<ScriptTransactionRequest>;
};

// Relay commonly used messages with predicates spendable by anyone
export async function relayCommonMessage({
  relayer,
  message,
  txParams,
}: {
  relayer: FuelWallet;
  message: Message;
  txParams?: RelayMessageOptions;
}): Promise<TransactionResponse> {
  // find the relay details for the specified message
  let messageRelayDetails: CommonMessageDetails | undefined;
  const predicateRoot = message.recipient.toHexString();

  for (const details of getCommonRelayableMessages(relayer.provider)) {
    if (details.predicateRoot.toLowerCase() === predicateRoot.toLowerCase()) {
      messageRelayDetails = details;
      break;
    }
  }
  if (!messageRelayDetails)
    throw new Error('message is not a common relayable message');

  // build and send transaction
  const transaction = await messageRelayDetails.buildTx(
    relayer,
    message,
    messageRelayDetails,
    txParams || {},
  );
  const estimatedTx = await relayer.provider.estimatePredicates(transaction);
  // @TODO: should remove this when sdk fixes estimation
  estimatedTx.maxFee = estimatedTx.maxFee.add(bn(100_000));

  return relayer.sendTransaction(estimatedTx);
}
