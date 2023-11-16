import { Grid } from '@fuels/ui';
import { Layout } from '~/systems/Core/components/Layout/Layout';
import { TxCardLoader } from '~/systems/Transaction/component/TxCard/TxCard';

import { TransactionsTitle } from './title';

const PER_PAGE = 9;

export default async function Loading() {
  return (
    <Layout
      hero
      contentClassName="[&_.rt-ContainerInner]:space-y-2 tablet:[&_.rt-ContainerInner]:space-y-2 laptop:[&_.rt-ContainerInner]:space-y-10"
    >
      <TransactionsTitle />
      <div className="p-4 tablet:p-8 desktop:p-0">
        <Grid className="grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:gap-x-8 gap-y-6 gap-x-6">
          {[...Array(PER_PAGE)].map((_, i) => (
            <TxCardLoader key={i} />
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
