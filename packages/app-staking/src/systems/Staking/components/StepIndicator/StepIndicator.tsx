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
        <span
          key={index}
          aria-hidden
          className={`size-2 border transition-colors duration-300 motion-reduce:transition-none ${
            index <= current
              ? 'border-[var(--fuel-primary)] bg-[var(--fuel-primary)]'
              : 'border-[var(--fuel-indicator-border)] bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}
