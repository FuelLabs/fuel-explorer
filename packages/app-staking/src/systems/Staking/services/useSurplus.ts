import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import { useReadContract } from 'wagmi';
import { vaultAbi } from '~staking/contracts/vault/vaultAbi';

export const useSurplus = () => {
  return useReadContract({
    address: CURRENT_NETWORK_CONTRACTS.VAULT,
    abi: vaultAbi,
    functionName: 'surplus',
  });
};
