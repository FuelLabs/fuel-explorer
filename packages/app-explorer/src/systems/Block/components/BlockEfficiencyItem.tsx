import { useEffect, useState } from 'react';

type BlockEfficiencyItemProps = {
  current: number;
  total: number;
};

export default function BlockEfficiencyItem({
  current,
  total,
}: BlockEfficiencyItemProps) {
  const [filled, setFilled] = useState(false);

  // Fill from empty on mount so the bar draws in once.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Convert current and total to millions
  const currentInMillions = current / 1_000_000;
  const totalInMillions = total / 1_000_000;

  // Calculate progress percentage
  const progress = (current / total) * 100;
  const ratio = Math.min(Math.max(progress / 100, 0), 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="fuel-label flex items-center justify-between whitespace-nowrap text-[11px]">
        {/* Format current and total as M (millions) */}
        <span>
          {currentInMillions % 1 === 0
            ? currentInMillions.toFixed(0)
            : currentInMillions.toFixed(1)}
          M /
          {totalInMillions % 1 === 0
            ? totalInMillions.toFixed(0)
            : totalInMillions.toFixed(1)}
          M
        </span>
        <span>({progress.toFixed(2)}%)</span>
      </div>
      <div className="h-[2px] w-full bg-[var(--fuel-line)]">
        <div
          className="h-full origin-left bg-[var(--fuel-primary)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{ transform: `scaleX(${filled ? ratio : 0})` }}
        />
      </div>
    </div>
  );
}
