import dynamicImport from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamicImport(
  async () => import('~/systems/Bridge/screens/BridgeHistoryScreen'),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="history" />,
  },
);

export default function BridgeHistory() {
  return <Page />;
}

export const dynamic = 'force-static';
