import { route } from 'app-commons';
import { basePath } from '~staking/systems/Core/basePath.mjs';

export const Routes = {
  home: route(`${basePath}/assets`),
  stakingRig: route(`${basePath}/on-fuel`),
  stakingL1: route(`${basePath}/on-ethereum`),
  stakingL1CurrentPositions: route(`${basePath}/on-ethereum/positions`),
  stakingL1Validators: route(`${basePath}/on-ethereum/validators`),
  stakingL1Transactions: route(`${basePath}/on-ethereum/transactions`),
  conversion: route('/upgrade'),
};
