import { useEffect, useMemo, useState } from 'react';
import { calculatePercentageProgress } from '~staking/systems/Core/utils/eta';
import { formatSecondsToETA } from '~staking/systems/Core/utils/formatSecondsToETA';
import { getDiffSecondsToNow, getSecondsBetweenDates } from '../utils/dateDiff';

interface UseETAParams {
  startDate: string | undefined;
  endDate: string | undefined;
}

const INTERVAL_ETA_REFRESH = 10_000; // 10s

export function useETA({ startDate, endDate }: UseETAParams) {
  const [eta, setEta] = useState<string | undefined>(undefined);
  const [totalDuration, setTotalDuration] = useState<string | undefined>(
    undefined,
  );
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const hasEtaProgressBar = useMemo<boolean>(() => {
    return Boolean(eta) && typeof progress === 'number' && progress < 100;
  }, [eta, progress]);

  useEffect(() => {
    const dateStart = new Date(startDate || '');
    const dateFinish = new Date(endDate || '');

    const durationInSeconds = getSecondsBetweenDates(dateStart, dateFinish);
    setTotalDuration(formatSecondsToETA(durationInSeconds));

    const updateEta = (): string | undefined => {
      const secondsLeftToFinalize = getDiffSecondsToNow(dateFinish);
      const newEta = formatSecondsToETA(secondsLeftToFinalize);
      setEta(newEta);
      return newEta;
    };

    const updateProgress = () => {
      const current = calculatePercentageProgress({
        start: 0,
        current: getSecondsBetweenDates(dateStart, new Date()),
        target: durationInSeconds,
      });

      setProgress(Number(current.toFixed(2)));
    };

    updateEta();
    updateProgress();

    const interval = setInterval(() => {
      const hasEta = updateEta();
      updateProgress();

      if (!hasEta) {
        clearInterval(interval);
      }
    }, INTERVAL_ETA_REFRESH);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return { eta, totalDuration, progress, hasEtaProgressBar };
}
