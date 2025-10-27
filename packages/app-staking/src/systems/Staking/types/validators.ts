import type { SequencerValidatorAddress } from '~staking/systems/Core';
export interface BaseValidator {
  operator_address: SequencerValidatorAddress;
  tokens: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string; // ISO 8601 ex: 2024-11-20T00:00:00Z
  };
}

export interface Validator extends BaseValidator {
  consensus_pubkey: {
    '@type': string;
    key: string;
  };
  jailed: boolean;
  status: string;
  delegator_shares: string;
  unbonding_height: string;
  unbonding_time: string; // ISO 8601 ex: 2024-11-20T00:00:00Z
  min_self_delegation: string;
  unbonding_on_hold_ref_count: string;
  unbonding_ids: string[];
}
