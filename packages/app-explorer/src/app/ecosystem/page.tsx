'use client';

import dynamicImport from 'next/dynamic';
import { EcosystemScreenLoader } from '~/systems/Ecosystem/components/EcosystemScreenLoader';

const Page = dynamicImport(
  async () => import('app-portal/src/systems/Ecosystem/page'),
  {
    ssr: false,
    loading: () => <EcosystemScreenLoader />,
  },
);

export default function AppBridge() {
  return <Page />;
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
