// Staking contract and asset constants used for incremental aggregation.
// These match the hardcoded values in migration 019 MV definitions.

export const STAKING_CONTRACT =
  '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c';

export const FUEL_ASSET_ID =
  '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82';

export const TREASURY_ADDRESSES = [
  '0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601',
  '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2',
];

// Hex-encoded scriptData substrings that identify staking operations
export const SCRIPT_DATA_DEPOSIT = '76465706f736974'; // "deposit"
export const SCRIPT_DATA_WITHDRAW = '87769746864726177'; // "withdraw"
export const SCRIPT_DATA_CLAIM_REWARDS = 'd636c61696d5f72657761726473'; // "claim_rewards"

// Cosmos excluded delegator (internal/system delegator)
export const COSMOS_EXCLUDED_DELEGATOR =
  '0x85308a35b3ad660213ea91a5d37bbf9620708ecc';
