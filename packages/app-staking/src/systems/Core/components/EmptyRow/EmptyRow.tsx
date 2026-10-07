import { Button } from '@fuels/ui';

type EmptyRowProps = {
  text: string;
  actionLabel: string;
  onAction: () => void;
};

// The quiet row used where a list has nothing to show: a hairline, one line of
// text and the action on the right.
export function EmptyRow({ text, actionLabel, onAction }: EmptyRowProps) {
  return (
    <div className="fuel-rise flex flex-col items-start gap-4 border-t border-[var(--fuel-border)] py-8 tablet:flex-row tablet:items-center tablet:justify-between">
      <p className="m-0 text-[16px] leading-[20px] tracking-[-0.32px] text-[var(--fuel-element-low-em)]">
        {text}
      </p>
      <Button size="2" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}
