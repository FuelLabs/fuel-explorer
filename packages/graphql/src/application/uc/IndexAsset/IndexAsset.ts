import { Interface, concat, hash } from 'fuels';
import { Contract, Provider } from 'fuels';
import { bn } from 'fuels';
import { env } from '~/config';
import { abi } from '~/infra/abi/SRC7Abi';
import type Transaction from '~/infra/dao/Transaction';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';
import NFTIndexer from './NFTIndexer';

export default class IndexAsset {
  provider?: Provider;
  loggedTypes = [
    '10032608944051208538',
    '4237256875605624201',
    '17462098202904023478',
    '17188485204969729195',
    '16139176946940135860',
    '13791596350235125220',
    '14321618427101975361',
    '7845998088195677205',
    '12152039456660331088',
    '17415926155927968170',
    '4571204900286667806',
    '2161305517876418151',
    '16280289466020123285',
  ];

  async execute(transaction: Transaction) {
    if (!this.provider) {
      const providerUrl = env.get('FUEL_PROVIDER');
      if (!providerUrl) {
        throw new Error('FUEL_PROVIDER is not set');
      }
      this.provider = new Provider(providerUrl);
    }
    let index = 1;
    const connection = DatabaseConnection.getInstance();
    if (transaction.data.status?.receipts) {
      for (const receipt of transaction.data.status.receipts) {
        if (receipt.receiptType === 'MINT' && receipt.id && receipt.subId) {
          const _id = `${transaction.id}-${new String(index++).padStart(
            8,
            '0',
          )}`;
          const assetId = hash(concat([receipt.id, receipt.subId]));
          const asset = {
            assetId,
            contractId: receipt.id,
            transactionId: transaction.data.id,
            subId: receipt.subId,
            name: null,
            symbol: null,
            decimals: null,
            totalSupply: null,
            error: null,
            blockId: transaction.blockId,
            _id,
            metadata: {} as any,
          };
          const existingAssetContract = await connection.query(
            'select * from indexer.assets_contracts where asset_id = $1 and contract_id = $2',
            [asset.assetId, asset.contractId],
          );
          if (existingAssetContract.length > 0) {
            continue;
          }
          try {
            const contract = new Contract(receipt.id, abi, this.provider);
            const assetBits = { bits: assetId };
            try {
              const { value: results } = await contract
                .multiCall([
                  contract.functions.name(assetBits),
                  contract.functions.symbol(assetBits),
                  contract.functions.decimals(assetBits),
                  contract.functions.total_supply(assetBits),
                  contract.functions.metadata(assetBits, 'uri'),
                ])
                .dryRun();
              asset.name = results[0];
              asset.symbol = results[1];
              asset.decimals = results[2];
              asset.totalSupply = bn(results[3]).toString() as any;
              if (results[4]?.String) {
                asset.metadata.uri = results[4].String;
              }
            } catch {
              const [name, symbol, decimals, supply] = await Promise.allSettled(
                [
                  contract.functions.name(assetBits).dryRun(),
                  contract.functions.symbol(assetBits).dryRun(),
                  contract.functions.decimals(assetBits).dryRun(),
                  contract.functions.total_supply(assetBits).dryRun(),
                ],
              );
              if (name.status === 'fulfilled') asset.name = name.value.value;
              if (symbol.status === 'fulfilled')
                asset.symbol = symbol.value.value;
              if (decimals.status === 'fulfilled')
                asset.decimals = decimals.value.value;
              if (supply.status === 'fulfilled')
                asset.totalSupply = bn(supply.value.value).toString() as any;
              try {
                const { value } = await contract.functions
                  .metadata(assetBits, 'uri')
                  .dryRun();
                if (value?.String) asset.metadata.uri = value.String;
              } catch {}
            }
          } catch (e: any) {
            asset.error = e.message;
          }
          try {
            await connection.query(
              'insert into indexer.assets_contracts (asset_id, contract_id, transaction_id, sub_id, name, symbol, decimals, error, block_id, _id, metadata, total_supply) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) on conflict do nothing',
              [
                asset.assetId,
                asset.contractId,
                asset.transactionId,
                asset.subId,
                asset.name,
                asset.symbol,
                asset.decimals,
                asset.error,
                asset.blockId,
                asset._id,
                asset.metadata,
                asset.totalSupply,
              ],
            );
            const nftIndexer = new NFTIndexer();
            await nftIndexer.execute(asset);
          } catch (_e: any) {}
        }
      }
      for (const receipt of transaction.data.status.receipts) {
        if (receipt.receiptType === 'LOG_DATA') {
          if (this.loggedTypes.includes(receipt.rb)) {
            const contract = new Interface(abi);
            const [log] = contract.decodeLog(receipt.data, receipt.rb);
            if (log && Object.keys(log).includes('metadata')) {
              const assetId = log.asset.bits;
              const key = log.key;
              const value = log.metadata.String;
              const [asset] = await connection.query(
                'select contract_id, sub_id, metadata from indexer.assets_contracts where asset_id = $1',
                [assetId],
              );
              if (asset?.metadata) {
                asset.metadata[key] = value;
              }
              await connection.query(
                'update indexer.assets_contracts set metadata = $1 where asset_id = $2',
                [asset.metadata, assetId],
              );
            }
          }
        }
      }
    }
  }
}
