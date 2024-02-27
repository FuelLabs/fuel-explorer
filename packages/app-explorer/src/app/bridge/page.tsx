'use client';

import dynamicImport from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamicImport(
  async () => import('app-portal').then((mod) => mod.BridgePage),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="bridge" />,
  },
);

export default function BridgeHistory() {
  return <Page />;
}

export const dynamic = 'force-static';
