import { useTranslation } from 'react-i18next';

type BlockTimeItemProps = {
  time: Date;
  timeAgo: string;
};

export default function BlockTimeItem({ time, timeAgo }: BlockTimeItemProps) {
  const { i18n } = useTranslation();
  const timeDate = new Date(time);

  const formattedTime = timeDate.toLocaleString(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="flex flex-col text-[11px] text-[var(--fuel-element-low-em)] leading-[16px]">
      <span>{timeAgo}</span>
      <span className="whitespace-nowrap">{formattedTime}</span>
    </div>
  );
}
