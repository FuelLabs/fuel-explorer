import { toast } from '@fuels/ui';
import type { Address } from 'viem';
import { usePublicClient, useWriteContract } from 'wagmi';
import { ContractPausedError } from '../../errors/ContractPausedError';
import { getPausedContracts } from '../usePausedContract/getPausedContracts';
import type { SafeWriteContractParams } from './types';

export const useSafeWriteContract = (params?: SafeWriteContractParams) => {
  const publicClient = usePublicClient();

  return useWriteContract({
    mutation: {
      onMutate: async (write) => {
        // Get contract address and any additional pauser addresses
        const pauserAddresses: Address[] = [write.address];
        if (params?.conditions?.pauser?.length) {
          pauserAddresses.push(...params.conditions.pauser);
        }

        if (!publicClient) {
          throw new Error('Wallet public client cannot be undefined');
        }

        // Get all paused contracts
        const pausers = await getPausedContracts(publicClient, pauserAddresses);
        if (pausers.length > 0) {
          throw new ContractPausedError();
        }
      },
      onError: (error, _variables, _context) => {
        if (error instanceof ContractPausedError) {
          toast.warning(error.message);
          return;
        }
      },
    },
  });
};
