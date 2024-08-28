'use client';
import { Icon } from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import TxsButtonContainer from '../TxsButtonContainer/TxsButtonContainer';
// import TxsExportCsvModal from '../TxsExportCsvModal/TxsExportCsvModal';

export function TxsTitle() {
  return (
    <>
      <PageTitle icon={<Icon icon={IconListDetails} />}>Top Tokens</PageTitle>
      <TxsButtonContainer />
      {/* <TxsExportCsvModal /> */}
    </>
  );
}
