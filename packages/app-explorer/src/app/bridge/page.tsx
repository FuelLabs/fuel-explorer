import dynamic from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamic(
  async () => import('~/systems/Bridge/screens/BridgeScreen'),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="bridge" />,
  },
);

export default function Bridge() {
  return <Page />;
}
