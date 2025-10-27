import { Progress } from '@fuels/ui';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

interface BridgeTxProgressProps {
  initial: Date | undefined;
  duration: number;
  isDone?: boolean;
}

const getPercentage = (value: number, max: number) => {
  return Math.round((value / max) * 100);
};

const MAX = 100;

export function BridgeTxProgress({
  initial,
  duration,
  isDone,
}: BridgeTxProgressProps) {
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

  if (progress === MAX) {
    return null;
  }

  return <Progress color="green" value={progress} max={MAX} />;
}
