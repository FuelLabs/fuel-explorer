import { Alert } from '@fuels/ui';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import type { PredicateMetadata } from '~portal/systems/Ecosystem/types';

export type AccountPredicateInfoProps = {
  metadata: PredicateMetadata;
};

export function AccountPredicateInfo({ metadata }: AccountPredicateInfoProps) {
  return (
    <Alert
      variant="soft"
      color="blue"
      size="1"
      className="border border-blue-6"
    >
      <Alert.Icon>
        <IconInfoCircleFilled size="md" />
      </Alert.Icon>

      <Alert.Text>
        <b>{metadata.name}</b>
        <br />
        {metadata.description}
      </Alert.Text>
    </Alert>
  );
}
