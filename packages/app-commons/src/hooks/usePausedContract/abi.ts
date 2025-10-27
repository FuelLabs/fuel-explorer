import { parseAbi } from 'viem';

// This is the shared implementation of "paused" function for all contracts
export const abi = parseAbi(['function paused() view returns (bool)']);
