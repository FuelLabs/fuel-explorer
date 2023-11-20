import { VStack } from '@fuels/ui';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { TxTitle } from '~/systems/Transaction/component/TxTitle/TxTitle';

export default function TxLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <Layout>
      <VStack className="min-h-[65vh] laptop:gap-14">
        <TxTitle id={id} />
        {children}
      </VStack>
    </Layout>
  );
}
