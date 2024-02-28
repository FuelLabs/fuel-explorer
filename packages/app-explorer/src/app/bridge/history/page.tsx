import dynamicImport from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamicImport(
  import('app-portal').then((mod) => mod.BridgeHistoryPage),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="history" />,
  },
);

export default function BridgeHistory() {
  return <Page />;
}
