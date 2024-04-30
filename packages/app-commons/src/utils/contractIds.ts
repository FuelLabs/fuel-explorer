import { ETH_CHAIN_NAME, FUEL_CHAIN_NAME } from '../config';

import {
  getBridgeSolidityContracts as getSolidityContracts,
  getBridgeTokenContracts as getTokenContracts,
} from '@fuel-explorer/contract-ids';

export type {
  BridgeTokenContracts,
  BridgeSolidityContracts,
} from '@fuel-explorer/contract-ids';

export function getBridgeTokenContracts() {
  return getTokenContracts(ETH_CHAIN_NAME, FUEL_CHAIN_NAME);
}

export function getBridgeSolidityContracts() {
  return getSolidityContracts(ETH_CHAIN_NAME, FUEL_CHAIN_NAME);
}
