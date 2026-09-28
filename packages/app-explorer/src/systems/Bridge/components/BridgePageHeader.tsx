import { Button, SectionTitle } from '@fuels/ui';
import { Routes } from 'app-commons';
import { tv } from 'tailwind-variants';
import { BRIDGE_DOCS_URL } from '../constants';

export function BridgePageHeader() {
  const classes = styles();

  return (
    <header className={classes.root()}>
      <div>
        <SectionTitle as="p">Bridge</SectionTitle>
        <h1 className={classes.title()}>
          Move assets between Ethereum and Fuel
        </h1>
        <p className={classes.lead()}>
          Deposit to Fuel Ignition or withdraw back to Ethereum. Connect both
          wallets, choose an asset and confirm.
        </p>
      </div>
      <div className={classes.actions()}>
        <Button
          as="a"
          href={BRIDGE_DOCS_URL}
          target="_blank"
          rel="noreferrer"
          size="3"
          color="gray"
          variant="soft"
        >
          Read docs
        </Button>
        <Button as="a" href={Routes.bridgeHistory()} size="3" color="gray">
          View history
        </Button>
      </div>
    </header>
  );
}

const styles = tv({
  slots: {
    root: [
      'fuel-edge col-span-full order-[-2] grid items-end gap-6',
      'px-6 pt-10 pb-6 tablet:px-10 tablet:pb-10 desktop:pt-[60px]',
      'min-[720px]:grid-cols-[1fr_auto] min-[720px]:gap-10',
    ],
    title: [
      'mt-3 mb-4 max-w-[640px] font-medium text-heading',
      'text-[40px] leading-[44px] tracking-[-1.6px]',
      'min-[720px]:text-[48px] min-[720px]:leading-[56px] min-[720px]:tracking-[-1.92px]',
    ],
    lead: 'm-0 max-w-[520px] text-[18px] leading-[22px] tracking-[-0.18px] text-[var(--fuel-element-low-em)]',
    actions: 'flex gap-2',
  },
});
