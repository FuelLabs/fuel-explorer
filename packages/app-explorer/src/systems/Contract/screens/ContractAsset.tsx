import { getContractBalances } from '../actions/get-contract';
import { ContractAssetList } from '../components/ContractAssetList';

type ContractAssetsProps = {
  id: string;
};

export async function ContractAssets({ id }: ContractAssetsProps) {
  const balances = await getContractBalances({ id });
  return <ContractAssetList balances={balances.edges} />;
}
