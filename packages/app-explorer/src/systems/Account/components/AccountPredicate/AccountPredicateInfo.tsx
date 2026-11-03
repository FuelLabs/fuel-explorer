import { TxNotice } from '~/systems/Transaction/component/TxNotice/TxNotice';
import type { PredicateMetadata } from '~portal/systems/Ecosystem/types';

export type AccountPredicateInfoProps = {
  metadata: PredicateMetadata;
};

export function AccountPredicateInfo({ metadata }: AccountPredicateInfoProps) {
  return (
    <TxNotice>
      <b className="font-medium text-heading">{metadata.name}</b>
      <br />
      {metadata.description}
    </TxNotice>
  );
}
