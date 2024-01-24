import { Address, bn } from 'fuels';

import {
  FuelChainState__factory,
  FuelMessagePortal__factory,
} from '../fuel-bridge/portal-contracts';

import { logBalances, ethWallet, fuelWallet } from './utils';
import { createRelayMessageParams } from './utils/ethers/createRelayParams';
import { waitForBlockCommit } from './utils/ethers/waitForBlockCommit';
import { waitForBlockFinalization } from './utils/ethers/waitForBlockFinalization';
import { getMessageOutReceipt } from './utils/fuels/getMessageOutReceipt';
import { waitNextBlock } from './utils/fuels/waitNextBlock';

async function main() {
  await logBalances('initial');

  const resp: {
    FuelMessagePortal: string;
    FuelChainState: string;
  } = await fetch('http://localhost:8080/deployments.local.json').then((res) =>
    res.json()
  );
  const fuelPortal = FuelMessagePortal__factory.connect(
    resp.FuelMessagePortal,
    ethWallet
  );
  const fuelState = FuelChainState__factory.connect(
    resp.FuelChainState,
    ethWallet
  );

  const txFuel = await fuelWallet.withdrawToBaseLayer(
    Address.fromString(ethWallet.address),
    bn.parseUnits('0.1')
  );
  const fWithdrawTxResult = await txFuel.waitForResult();
  const messageOutReceipt = getMessageOutReceipt(fWithdrawTxResult.receipts);

  if (!messageOutReceipt) {
    throw new Error('No message found');
  }

  console.log('Waiting for next block to be created...');
  const lastBlockId = await waitNextBlock(
    fuelWallet.provider,
    fWithdrawTxResult.blockId
  );

  const withdrawMessageProof = await fuelWallet.provider.getMessageProof(
    txFuel.id,
    messageOutReceipt.messageId,
    lastBlockId
  );

  if (!withdrawMessageProof) {
    throw new Error('Failed to fetch message proof');
  }

  const relayMessageParams = createRelayMessageParams(withdrawMessageProof);

  // commit block to L1
  await waitForBlockCommit(fuelState, relayMessageParams.rootBlockHeader);
  // wait for block finalization
  await waitForBlockFinalization(fuelState, relayMessageParams.rootBlockHeader);

  // Relay transaction on ETH
  console.log('Relaying message on Ethereum...\n');
  const txETH = await fuelPortal.relayMessage(
    relayMessageParams.message,
    relayMessageParams.rootBlockHeader,
    relayMessageParams.blockHeader,
    relayMessageParams.blockInHistoryProof,
    relayMessageParams.messageInBlockProof
  );
  await txETH.wait();
  await logBalances('final');
}

main();
