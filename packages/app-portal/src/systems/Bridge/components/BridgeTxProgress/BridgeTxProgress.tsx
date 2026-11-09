import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BridgeTxProgressProps {
  initial: Date | undefined;
  duration: number;
  isDone?: boolean;
}

const getPercentage = (value: number, max: number) => {
  return Math.round((value / max) * 100);
};

const MAX = 100;
const FADE_MS = 300;

export function BridgeTxProgress({
  initial,
  duration,
  isDone,
}: BridgeTxProgressProps) {
  const { t } = useTranslation();
  const target = useMemo(
    () => dayjs(initial).add(duration, 'minutes'),
    [initial, duration],
  );
  const totalDurationInSeconds = useMemo(() => duration * 60, [duration]);

  const remainingSeconds = useMemo(() => {
    const current = dayjs();
    const diffInSeconds = target.diff(current, 'seconds');
    return diffInSeconds <= 0 ? 0 : diffInSeconds;
  }, [target]);

  const [progress, setProgress] = useState(
    remainingSeconds === 0 || isDone
      ? 100
      : getPercentage(
          totalDurationInSeconds - remainingSeconds,
          totalDurationInSeconds,
        ),
  );

  useEffect(() => {
    if (remainingSeconds === 0 || isDone) {
      setProgress(100);
      return;
    }

    const updateProgress = () => {
      const current = dayjs();
      const diffInSeconds = target.diff(current, 'seconds');

      if (diffInSeconds <= 0) {
        setProgress(100);
        clearInterval(intervalId);
        return;
      }

      setProgress(
        getPercentage(
          totalDurationInSeconds - diffInSeconds,
          totalDurationInSeconds,
        ),
      );
    };

    const intervalId = setInterval(updateProgress, 1000);

    return () => clearInterval(intervalId);
  }, [target, remainingSeconds, totalDurationInSeconds, isDone]);

  // At 100% the bar fades out, then unmounts.
  const [gone, setGone] = useState(progress === MAX);
  useEffect(() => {
    if (progress !== MAX) {
      setGone(false);
      return;
    }
    const timeout = setTimeout(() => setGone(true), FADE_MS);
    return () => clearTimeout(timeout);
  }, [progress]);

  if (gone) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a progressbar is read-only and not focusable
    <div
      role="progressbar"
      aria-label={t('portal.bridge.progress_label')}
      aria-valuemin={0}
      aria-valuemax={MAX}
      aria-valuenow={progress}
      className="mt-2 h-0.5 w-full overflow-hidden bg-[var(--fuel-line)] transition-opacity duration-300 ease-out motion-reduce:transition-none"
      style={{ opacity: progress === MAX ? 0 : 1 }}
    >
      <div
        className="h-full w-full origin-left bg-[var(--fuel-primary)] transition-transform duration-1000 ease-linear motion-reduce:transition-none"
        style={{ transform: `scaleX(${progress / MAX})` }}
      />
    </div>
  );
}
