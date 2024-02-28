import dynamic from 'next/dynamic';
import { EcosystemScreenLoader } from '~/systems/Ecosystem/components/EcosystemScreenLoader';

const Page = dynamic(
  async () => import('~/systems/Ecosystem/screens/EcosystemScreen'),
  {
    ssr: false,
    loading: EcosystemScreenLoader,
  },
);

export default function Ecosystem() {
  return <Page />;
}
