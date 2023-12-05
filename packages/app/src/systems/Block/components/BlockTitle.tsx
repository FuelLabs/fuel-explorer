'use client';
import { Address } from '@fuels/ui';
import { IconCube } from '@tabler/icons-react';
import { PageSubtitle } from '~/systems/Core/components/PageSubtitle/PageSubtitle';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { ViewMode } from '~/systems/Core/components/ViewMode/ViewMode';
import { isValidAddress } from '~/systems/Core/utils/address';

export function BlockTitle({ id }: { id: string }) {
  return (
    <PageTitle
      icon={<IconCube size={24} stroke={2.4} />}
      rightElement={<ViewMode />}
    >
      Block
      {isValidAddress(id) ? (
        <Address full value={id || ''} fixed="b256" />
      ) : (
        <PageSubtitle>#{id}</PageSubtitle>
      )}
    </PageTitle>
  );
}
