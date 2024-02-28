import dynamicImport from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamicImport(
  async () => import('~/systems/Bridge/screens/BridgeScreen'),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="bridge" />,
  },
);

export default function Bridge() {
  return <Page />;
}

export const dynamic = 'force-static';
