import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Collapsible } from '../../../../../../../ui/src/components/Collapsible/Collapsible';
import { TxScriptsContent } from './TxScriptsContent';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { count?: number }) =>
      opts && typeof opts.count === 'number' ? `${key}:${opts.count}` : key,
  }),
}));

jest.mock('@fuels/ui', () => ({
  Box: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  HStack: ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  cx: (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(' '),
}));

jest.mock('~/systems/Core/components/EmptyCard/EmptyCard', () => {
  const EmptyCard = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  );
  EmptyCard.Title = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  );
  EmptyCard.Description = EmptyCard.Title;
  return { EmptyCard };
});

jest.mock(
  '~/systems/Transaction/component/TxScripts/ReceiptItem/ReceiptItem',
  () => ({
    ReceiptItem: ({
      receipt,
    }: {
      receipt?: { item?: { receiptType?: string | null } | null };
    }) => <div data-testid="receipt">{receipt?.item?.receiptType ?? ''}</div>,
  }),
);

function receipt(type: string, nested?: string[]) {
  return {
    item: { receiptType: type },
    receipts: nested?.map((nestedType) => ({
      item: { receiptType: nestedType },
    })),
  };
}

function txFrom(groups: ReturnType<typeof receipt>[][]) {
  const operations = groups.map((receipts, i) => ({
    type: `op-${i}`,
    receipts,
  }));
  return {
    operations,
    receipts: groups.flat().map((_, i) => ({ id: i })),
  };
}

function receiptTypes() {
  return screen.queryAllByTestId('receipt').map((node) => node.textContent);
}

describe('TxScriptsContent', () => {
  const longTx = txFrom([
    [receipt('A', ['A-nested']), receipt('B'), receipt('C'), receipt('D')],
  ]);

  it('renders only the first and last receipt until expanded', () => {
    const { rerender } = render(
      <TxScriptsContent tx={longTx as never} opened={false} />,
    );

    expect(receiptTypes()).toEqual(['A', 'D']);
    expect(screen.getByText('tx.expand_more:4')).toBeInTheDocument();

    rerender(<TxScriptsContent tx={longTx as never} opened />);
    expect(receiptTypes()).toEqual(['A', 'A-nested', 'B', 'C', 'D']);

    rerender(<TxScriptsContent tx={longTx as never} opened={false} />);
    expect(receiptTypes()).toEqual(['A', 'D']);
  });

  it('renders every receipt when there are three or fewer', () => {
    render(
      <TxScriptsContent
        tx={
          txFrom([
            [receipt('A', ['A-nested']), receipt('B'), receipt('C')],
          ]) as never
        }
        opened={false}
      />,
    );

    expect(receiptTypes()).toEqual(['A', 'A-nested', 'B', 'C']);
  });

  it('uses the first receipt of the first operation and the last of the last', () => {
    render(
      <TxScriptsContent
        tx={
          txFrom([
            [receipt('A'), receipt('B')],
            [receipt('C')],
            [receipt('D'), receipt('E')],
          ]) as never
        }
        opened={false}
      />,
    );

    expect(receiptTypes()).toEqual(['A', 'E']);
  });

  it('pins the first and last receipts across operations with empty receipts', () => {
    render(
      <TxScriptsContent
        tx={
          txFrom([
            [],
            [receipt('A'), receipt('B'), receipt('C')],
            [receipt('D')],
            [],
          ]) as never
        }
        opened={false}
      />,
    );

    expect(receiptTypes()).toEqual(['A', 'D']);
  });
});

describe('Collapsible', () => {
  function Probe() {
    return <div>json-viewer</div>;
  }

  it('does not mount collapsed content', () => {
    render(
      <Collapsible>
        <Collapsible.Header>Head</Collapsible.Header>
        <Collapsible.Content>
          <Probe />
        </Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.queryByText('json-viewer')).not.toBeInTheDocument();
  });

  it('mounts content when expanded, then unmounts it after collapse', async () => {
    render(
      <Collapsible>
        <Collapsible.Header>Head</Collapsible.Header>
        <Collapsible.Content>
          <Probe />
        </Collapsible.Content>
      </Collapsible>,
    );

    const toggle = screen.getByRole('button', {
      name: 'ui.collapsible.toggle',
    });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('json-viewer')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('json-viewer')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('json-viewer')).not.toBeInTheDocument();
    });
  });
});
