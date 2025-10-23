import type { Address, PublicClient } from 'viem';
import { abi } from './abi';

export const getPausedContracts = async (
  client: PublicClient | undefined,
  contracts: Address[],
): Promise<Address[]> => {
  if (!client) {
    throw new Error('Client not found in getPausedContracts');
  }

  const result = await Promise.all(
    contracts.map(async (address) => {
      try {
        return await client.readContract({
          address,
          abi,
          functionName: 'paused',
        });
      } catch (_err) {
        // If contract doesn't have paused function, consider it not paused
        return false;
      }
    }),
  );

  const pausers = result.map((paused, index) => {
    return {
      address: contracts[index],
      paused,
    };
  });

  return pausers
    .filter((pauser) => pauser.paused)
    .map((pauser) => pauser.address);
};
