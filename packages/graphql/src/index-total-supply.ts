import { Contract, Provider } from 'fuels';
import { bn } from 'fuels';
import { abi } from '~/infra/abi/SRC7Abi';
import { env } from './config';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

const connection = DatabaseConnection.getInstance();

export async function indexTotalSupply() {
  const providerUrl = env.get('FUEL_PROVIDER');
  if (!providerUrl) {
    throw new Error('FUEL_PROVIDER is not set');
  }
  const provider = new Provider(providerUrl);
  const assets = await connection.query(
    'select asset_id, contract_id from indexer.assets_contracts where total_supply is null',
    [],
  );
  console.log(assets.length);
  let index = 0;
  for (const asset of assets) {
    try {
      console.log(index++, assets.length, asset.asset_id);
      const contract = new Contract(asset.contract_id, abi, provider);
      const outputTotalSupply = await contract.functions
        .total_supply({ bits: asset.asset_id })
        .dryRun();
      const totalSupply = bn(outputTotalSupply.value).toString() as any;
      await connection.query(
        'update indexer.assets_contracts set total_supply = $1 where asset_id = $2',
        [totalSupply, asset.asset_id],
      );
    } catch (e: any) {
      console.log(e);
    }
  }
}

(async () => {
  await indexTotalSupply();
})();
