import { formatSecondsToETA } from '~staking/systems/Core/utils/formatSecondsToETA';
import { getDiffSecondsToNow } from '~staking/systems/Staking/utils/dateDiff';

export function calculatePercentageProgress({
  start,
  current,
  target,
}: {
  start: number | null;
  current: number | null;
  target: number | undefined;
}): number {
  if (start == null || current == null || target == null) return 0;
  const totalDistance = target - start;
  const coveredDistance = current - start;

  if (totalDistance <= 0) return 0;
  if (start > target || current > target) return 100;

  const progress = (Number(coveredDistance) / Number(totalDistance)) * 100;

  // Clamp the progress between 0 and 100
  return Math.max(0, Math.min(100, progress));
}

export const formatETA = (
  targetDate: string | undefined,
): string | undefined => {
  if (!targetDate) return undefined;
  const diffInSeconds = getDiffSecondsToNow(new Date(targetDate));
  return formatSecondsToETA(diffInSeconds, '~');
};
