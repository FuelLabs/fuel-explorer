import dynamicImport from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamicImport(
  async () => import('app-portal/src/systems/Bridge/page-root'),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="bridge" />,
  },
);

export default function BridgeHistory() {
  return <Page />;
}

export const dynamic = 'force-static';
