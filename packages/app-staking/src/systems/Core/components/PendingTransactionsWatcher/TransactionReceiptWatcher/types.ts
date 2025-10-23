import type { QueryKey } from '@tanstack/react-query';
import type { HexAddress } from 'app-commons';
import type { SequencerUserAddress } from '~staking/systems/Core/utils/address';
import type { PendingTransactionL1 } from '../../../hooks/usePendingTransactions';

export type TransactionReceiptWatcherProps = {
  transaction: PendingTransactionL1;
};

export type ModularQueryKey = ({
  address,
}: {
  address?: HexAddress | SequencerUserAddress;
}) => Array<QueryKey>;
