import { ethers } from 'ethers';
import { env } from '~/config';

export function createL1Provider(): ethers.JsonRpcProvider {
  const network = env.get('FUEL_CHAIN') || '';
  const base = network === 'mainnet' ? 'mainnet' : 'sepolia';
  return new ethers.JsonRpcProvider(
    `https://eth-${base}.g.alchemy.com/v2/${env.get('ALCHEMY_API_KEY')}`,
  );
}
