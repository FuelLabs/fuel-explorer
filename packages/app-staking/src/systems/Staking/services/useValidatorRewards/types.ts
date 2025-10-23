export type ValidatorReward = {
  amount: string;
  denom: string;
};

export type ValidatorRewardsData = {
  rewards: Array<ValidatorReward>;
};
