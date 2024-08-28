'use client';
import { Icon } from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';
import TxsButtonContainer from '../TxsButtonContainer/TxsButtonContainer';
import { TxsTabList } from '../TxsTabList/TxsTabList';
// import TxsExportCsvModal from '../TxsExportCsvModal/TxsExportCsvModal';

export type TxsTabListProps = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export function TxsTitle({ activeTab, setActiveTab }: TxsTabListProps) {
  return (
    <>
      <PageTitle icon={<Icon icon={IconListDetails} />}>Top Tokens</PageTitle>
      <TxsTabList activeTab={activeTab} setActiveTab={setActiveTab} />
      <TxsButtonContainer />
      {/* <TxsExportCsvModal /> */}
    </>
  );
}
