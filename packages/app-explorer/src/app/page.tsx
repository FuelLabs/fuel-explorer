// 'use client';
// import { GridTable } from '@fuels/ui';
// import { Suspense, useState } from 'react';
// import { columns, data } from '~/systems/Home/components/DataTable/data';
// import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
// import { TxsAccountTable } from '~/systems/Transactions/components/TxsAccontTable/TxsAccountTable';
// import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
// import { TxsTokenTable } from '~/systems/Transactions/components/TxsTokenTable/TxsTokenTable';
// import type { TxsRouteProps } from '~/systems/Transactions/types';

// export default function Home({ searchParams: { page = '1' } }: TxsRouteProps) {
//   const [activeTab, setActiveTab] = useState('Top Tokens');
//   const [currentGridPage, setCurrentGridPage] = useState<number>(0);
//   return (
//     <>
//       <TxsTitle activeTab={activeTab} setActiveTab={setActiveTab} />

//       <Suspense
//         key={page}
//         fallback={<TxListLoader page={page} numberOfTxs={10} />}
//       >
//         {activeTab === 'Top Tokens' ? (
//           <GridTable
//             onPageChanged={() => {}}
//             data={data}
//             columns={columns}
//             pageCount={1}
//             currentPage={currentGridPage}
//             setCurrentPage={setCurrentGridPage}
//           />
//         ) : activeTab === 'Top NFTs' ? (
//           <TxsTokenTable />
//         ) : activeTab === 'Top Accounts' ? (
//           <TxsAccountTable />
//         ) : (
//           ''
//         )}
//       </Suspense>
//     </>
//   );
// }

import { Suspense } from 'react';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';
import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';
import { TxsScreenSync } from '~/systems/Transactions/pages/TxsScreenSync';
import type { TxsRouteProps } from '~/systems/Transactions/types';
// import { TxsTitle } from '~/systems/Transactions/components/TxsTitle/TxsTitle';

export default async function Home({
  searchParams: { cursor, dir },
}: TxsRouteProps) {
  return (
    <>
      <TxsTitle />
      <Suspense key={cursor} fallback={<TxListLoader numberOfTxs={10} />}>
        <TxsScreenSync cursor={cursor} dir={dir} />
      </Suspense>
    </>
  );
}

export const revalidate = 10;
