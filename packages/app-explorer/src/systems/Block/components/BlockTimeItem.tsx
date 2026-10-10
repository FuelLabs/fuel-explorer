import {
  formatDateTime,
  formatDateTimeTitle,
  formatRelative,
} from 'app-commons';
import { useTranslation } from 'react-i18next';

type BlockTimeItemProps = {
  time: Date;
  timeAgo: string;
};

export default function BlockTimeItem({ time, timeAgo }: BlockTimeItemProps) {
  const { i18n } = useTranslation();
  const timeDate = new Date(time);
  const valid = !Number.isNaN(timeDate.getTime());

  const formattedTime = formatDateTime(timeDate, 'medium', i18n.language);
  const relative = valid
    ? formatRelative(timeDate, Date.now(), i18n.language)
    : timeAgo;

  return (
    <div
      className="flex flex-col text-[11px] text-[var(--fuel-element-low-em)] leading-[16px]"
      title={valid ? formatDateTimeTitle(timeDate, i18n.language) : undefined}
    >
      <span>{relative}</span>
      <span className="whitespace-nowrap">{formattedTime}</span>
    </div>
  );
}
