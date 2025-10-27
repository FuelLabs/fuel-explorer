import type { Address } from 'viem';
import { useReadContracts } from 'wagmi';
import { abi } from './abi';

interface UsePausedContractParams {
  conditions: Address[];
}

export const usePausedContract = ({ conditions }: UsePausedContractParams) => {
  return useReadContracts({
    contracts: conditions.map((pauser) => ({
      address: pauser,
      abi,
      functionName: 'paused',
    })),
  });
};
