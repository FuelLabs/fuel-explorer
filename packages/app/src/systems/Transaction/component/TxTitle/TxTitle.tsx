import { Address } from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';

export function TxTitle({ id }: { id: string }) {
  return (
    <PageTitle
      icon={<IconChecklist size={24} stroke={1.2} />}
      rightElement={<ViewMode />}
    >
      Transaction
      <Address full={true} value={id} fixed="b256" />
    </PageTitle>
  );
}
