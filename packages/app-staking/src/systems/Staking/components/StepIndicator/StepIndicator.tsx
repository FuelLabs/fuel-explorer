import { Square } from '@fuels/ui';
type StepIndicatorProps = {
  /** Zero-based index of the step on screen. */
  current: number;
  total: number;
  label: string;
};

// A row of squares that fill as the dialog moves through its steps.
export function StepIndicator({ current, total, label }: StepIndicatorProps) {
  return (
    <div role="img" aria-label={label} className="flex items-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <Square
          key={index}
          kind={index <= current ? 'brand' : 'idle'}
          className="transition-colors duration-300 motion-reduce:transition-none"
        />
      ))}
    </div>
  );
}
