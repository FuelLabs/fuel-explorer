export type StakingEnv = 'MAINNET' | 'SANDBOX' | 'TESTNET' | 'LOCAL';
export type StakingEnvSystems = 'COSMOS' | 'COMET';
export type StakingEnvFallback = {
  COSMOS: {
    REST: string;
  };
  COMET: {
    SECURE: string;
  };
};
