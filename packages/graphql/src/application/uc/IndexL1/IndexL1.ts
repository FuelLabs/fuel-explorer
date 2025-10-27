import { setTimeout } from 'node:timers/promises';
import { ethers } from 'ethers';
import { type Abi, decodeEventLog } from 'viem';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';
import { decodeMessage } from '~/infra/util/util';
import AbiFactory from './abi/AbiFactory';

export default class IndexL1 {
  async syncContract(contract: {
    _id: number;
    block_height: number;
    contract_hash: string;
    name: string;
  }) {
    const network = env.get('FUEL_CHAIN') || '';
    const connection = DatabaseConnection.getInstance();
    const base = network === 'mainnet' ? 'mainnet' : 'sepolia';
    const provider = new ethers.JsonRpcProvider(
      `https://eth-${base}.g.alchemy.com/v2/${env.get('ALCHEMY_API_KEY')}`,
    );
    const lastBlockNumber = await provider.getBlockNumber();
    if (contract.block_height > lastBlockNumber) {
      logger.debug('Timer', `Contract: ${contract.name} -  Waiting for block`);
      await setTimeout(10000);
      return;
    }
    const abi = AbiFactory.create(network, contract.name);
    if (!abi) {
      logger.error('Timer', 'ABI not found', contract);
      return;
    }
    const options = {
      fromBlock: contract.block_height,
      toBlock: Math.min(lastBlockNumber + 1, contract.block_height + 1000),
    };
    logger.debug(
      'Timer',
      `Contract: ${contract.name} - from block #${options.fromBlock} - to #${options.toBlock}`,
    );
    const api = new ethers.Contract(contract.contract_hash, abi, provider);
    const logs = await provider.getLogs({
      address: contract.contract_hash,
      topics: [],
      fromBlock: options.fromBlock,
      toBlock: options.toBlock,
    });
    logger.debug(
      'Timer',
      `Contract: ${contract.name} -  Found ${logs.length} logs`,
    );
    const blockIndex: { [blockNumber: number]: number } = {};
    for (const log of logs) {
      const parsedLog = api.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      logger.debug(
        'Timer',
        `Contract: ${contract.name} -  Parsed Log: ${parsedLog}`,
      );
      const eventName = parsedLog?.name;
      const eventSignature = parsedLog?.signature;
      const data: { eventName: string; args: any } = decodeEventLog({
        abi: AbiFactory.create(network, contract.name) as Abi,
        data: log.data as `0x${string}`,
        topics: log.topics as [],
      });
      logger.debug(
        'Timer',
        `Contract: ${contract.name} -  Decoded event Log: ${eventName}, ${data.args.data}`,
      );

      const decodedArgs = decodeMessage(data.args.data);

      logger.debug(
        'Timer',
        `Contract: ${contract.name} - Decoded Args: ${decodedArgs}`,
      );
      let blockTimestamp = 0;
      if (!blockIndex[log.blockNumber]) {
        // Retry logic with exponential backoff
        let block = null;
        const retries = 3;
        for (let attempt = 1; attempt <= retries; attempt++) {
          try {
            block = await provider.getBlock(log.blockNumber);
            break; // Success, exit retry loop
          } catch (error: any) {
            logger.debug(
              'Timer',
              `Contract: ${contract.name} - Block fetch attempt ${attempt} failed for block ${log.blockNumber}: ${error.message}`,
            );

            if (attempt < retries) {
              const delay = 2 ** attempt * 1000; // exponential backoff: 2s, 4s, 8s
              await new Promise((resolve) => setTimeout(resolve as any, delay));
            }
          }
        }

        if (block) {
          blockTimestamp = block.timestamp;
          blockIndex[log.blockNumber] = block.timestamp;
        } else {
          // Use 0 as default timestamp when all retries fail
          blockTimestamp = 0;
          blockIndex[log.blockNumber] = 0;
          logger.debug(
            'Timer',
            `Using default timestamp 0 for block ${log.blockNumber} after max retries`,
          );
        }
      } else {
        blockTimestamp = blockIndex[log.blockNumber];
      }

      logger.debug(
        'Timer',
        `Contract: ${contract.name} Saving transaction ${log?.transactionHash}. Decoded Args: ${decodedArgs}`,
      );
      const [contractL1Log] = await connection.query(
        'insert into indexer.contract_l1_logs (contract_hash, block_height, tx_hash, raw_log, event, signature, decoded_args, decoded_data, timestamp, log_index) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) on conflict (block_height, log_index) do update set log_index = EXCLUDED.log_index returning _id',
        [
          contract.contract_hash,
          log.blockNumber,
          log.transactionHash,
          log,
          eventName,
          eventSignature,
          JSON.stringify(data.args, (_, v) =>
            typeof v === 'bigint' ? v.toString() : v,
          ),
          decodedArgs,
          new Date(blockTimestamp * 1000),
          log.index,
        ],
      );
      const args = { ...data.args, ...decodedArgs };
      for (const key in args) {
        await connection.query(
          'insert into indexer.contract_l1_args (contract_l1_log_id, key, value) values ($1, $2, $3) on conflict do nothing',
          [contractL1Log._id, key, args[key]],
        );
      }
    }
    await connection.query(
      'update indexer.contract_l1_index set block_height = $1 where _id = $2',
      [options.toBlock, contract._id],
    );
  }

  async execute() {
    const connection = DatabaseConnection.getInstance();
    while (true) {
      const contracts = await connection.query(
        `select * from indexer.contract_l1_index where status = 'active' and network = $1`,
        [env.get('FUEL_CHAIN')],
      );
      await Promise.all(
        contracts.map((contract) => this.syncContract(contract)),
      );
      await setTimeout(1000);
    }
  }
}
