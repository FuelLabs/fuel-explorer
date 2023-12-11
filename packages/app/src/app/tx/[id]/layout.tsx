import { VStack } from '@fuels/ui';
import { Layout } from '~/systems/Core/components/Layout/Layout';

export default function TxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <VStack className="min-h-[65vh] laptop:gap-14">{children}</VStack>
    </Layout>
  );
}
