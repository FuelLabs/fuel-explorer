import type { PrismaClient } from '@prisma/client';
import type { ReceiptMessageOut } from 'fuels';
import {
  getTransactionsSummaries,
  Provider,
  Address,
  ChainName,
  ReceiptType,
} from 'fuels';
import type { PublicClient } from 'viem';
import { FUEL_CHAIN_STATE } from '~/contracts/FuelChainState';
import { FUEL_MESSAGE_PORTAL } from '~/contracts/FuelMessagePortal';

import MailService from '../services/mailService';

import { shortAddress } from './address';

export const handleNewEthBlock = async (
  prisma: PrismaClient,
  fuelProviderUrl: string,
  ethPublicClient: PublicClient
) => {
  const mailService = await MailService.getInstance();

  const abiFuelChainState = FUEL_CHAIN_STATE.abi.find(
    ({ name, type }) => name === 'CommitSubmitted' && type === 'event'
  );

  // Grab the last logs of commit state to the fuelChainState
  const logs = await ethPublicClient.getLogs({
    address: process.env.ETH_FUEL_CHAIN_STATE as `0x${string}`,
    event: {
      type: 'event',
      name: 'CommitSubmitted',
      inputs: abiFuelChainState?.inputs || [],
    },
    fromBlock: 'earliest',
  });

  for (const lastLog of logs) {
    const { blockHash } = lastLog.args as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    const fuelProvider = new Provider(fuelProviderUrl);
    try {
      const block = await fuelProvider.getBlock(blockHash);

      const addresses = await prisma.address.findMany({
        include: {
          withdrawer: true,
        },
      });

      for (const address of addresses) {
        const owner = Address.fromString(address.address).toB256();

        const transactionsByOwner = await getTransactionsSummaries({
          provider: fuelProvider,
          filters: {
            owner,
            first: 1000,
          },
        });

        // Filter all transaction that have a withdraw to ETH
        const withdrawTransactions = transactionsByOwner.transactions.filter(
          (t) => {
            return t.operations.find((o) => o.to?.chain === ChainName.ethereum);
          }
        );

        // Get the blocks that need to be notified
        const withdrawsWithBlocks = await Promise.all(
          withdrawTransactions.map(async (tranasction) => {
            const messageReceipt = tranasction.receipts.find(
              (r) => r.type === ReceiptType.MessageOut
            ) as ReceiptMessageOut;

            const abiMessageRelayed = FUEL_MESSAGE_PORTAL.abi.find(
              ({ name, type }) => name === 'MessageRelayed' && type === 'event'
            );

            const logs = await ethPublicClient.getLogs({
              address: process.env.ETH_FUEL_MESSAGE_PORTAL as `0x${string}`,
              event: {
                type: 'event',
                name: 'MessageRelayed',
                inputs: abiMessageRelayed?.inputs || [],
              },
              args: {
                messageId: messageReceipt?.messageId as `0x${string}`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any,
              fromBlock: 'earliest',
            });

            const isAlreadyRelayed = !!logs[0];

            const isReady = tranasction.blockId
              ? (await fuelProvider.getBlock(tranasction.blockId))?.height.lte(
                  block?.height || 0
                )
              : false;

            return {
              tranasction,
              block,
              isAlreadyRelayed,
              isReady,
            };
          })
        );

        for (const w of withdrawsWithBlocks) {
          // Message is already sent
          // Check if the email was already sent
          let dbTransaction = await prisma.transaction.findUnique({
            where: {
              transactionId: w.tranasction.id,
            },
            include: {
              address: {
                include: {
                  withdrawer: true,
                },
              },
            },
          });
          if (!dbTransaction && w.tranasction.id && w.tranasction.status) {
            dbTransaction = await prisma.transaction.create({
              data: {
                transactionId: w.tranasction.id,
                status: w.tranasction.status,
                address: {
                  connect: {
                    address: owner,
                  },
                },
                blockHeight: w.block?.height.toNumber(),
              },
              include: {
                address: {
                  include: {
                    withdrawer: true,
                  },
                },
              },
            });
          }
          if (
            w.isReady &&
            !w.isAlreadyRelayed &&
            dbTransaction &&
            !dbTransaction.emailSent
          ) {
            await mailService.sendMail(
              {
                from: process.env.FROM_EMAIL,
                to: dbTransaction.address.withdrawer.email,
                subject: 'Withdraw Notification',
              },
              {
                address: shortAddress(dbTransaction.address.address),
                transactionId: shortAddress(w.tranasction.id),
                completeWithdrawLink: process.env.WITHDRAW_LINK!,
              }
            );
            // Update the email is sent
            await prisma.transaction.update({
              where: { transactionId: dbTransaction.transactionId },
              data: { emailSent: true },
            });
          }
        }
      }
    } catch (e) {
      console.error(e);
      console.log('Not finalized yet');
    }
  }
};
