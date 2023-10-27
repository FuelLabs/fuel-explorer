import { Address } from '@fuels/ui';
import { IconHash } from '@tabler/icons-react';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';

export default function Title({ params }: { params: { id: string } }) {
  return (
    <PageTitle icon={<IconHash size={20} stroke={1.2} />}>
      Account
      <Address full value={params.id} />
    </PageTitle>
  );
}
