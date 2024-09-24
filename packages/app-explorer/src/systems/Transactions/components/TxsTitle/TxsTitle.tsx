// 'use client';
// import { PageTitle } from 'app-commons';
// import TxsButtonContainer from '../TxsButtonContainer/TxsButtonContainer';
// import { TxsTabList } from '../TxsTabList/TxsTabList';
// // import TxsExportCsvModal from '../TxsExportCsvModal/TxsExportCsvModal';

// export type TxsTabListProps = {
//   activeTab: string;
//   setActiveTab: (tabName: string) => void;
// };

// export function TxsTitle({ activeTab='Recent Transactions', setActiveTab=()=>void }: TxsTabListProps) {
//   return (
//     <>
//       <PageTitle
//         title=""
//         //  icon={<Icon icon={IconListDetails}
//         //  />}
//       >
//         Top Tokens
//       </PageTitle>
//       <TxsTabList activeTab={activeTab} setActiveTab={setActiveTab} />
//       <TxsButtonContainer />
//       {/* <TxsExportCsvModal /> */}
//     </>
//   );
// }

import { PageTitle } from 'app-commons';

export function TxsTitle() {
  return <PageTitle title="Recent Transactions" />;
}
