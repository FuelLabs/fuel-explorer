import { Text, VStack } from '@fuels/ui';
import { createDayjs } from 'app-commons';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { memo } from 'react';
import { TxFullDateTimestamp } from '~/systems/Transaction/component/TxFullDateTimestamp/TxFullDateTimestamp';

type BlockTimeItemProps = {
  unixTimestamp: number;
  /** When set (e.g. from BlocksTable), relative time uses this so one shared timer drives all rows. */
  nowUnix?: number;
};

function _BlockTimeItem({ unixTimestamp, nowUnix }: BlockTimeItemProps) {
  const dayjs = createDayjs();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(relativeTime);
  const timeAgo =
    nowUnix !== undefined
      ? dayjs.unix(unixTimestamp).from(dayjs.unix(nowUnix))
      : dayjs.unix(unixTimestamp).fromNow();

  return (
    <VStack gap="0px">
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f]">{timeAgo}</Text>
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f] whitespace-nowrap">
        <TxFullDateTimestamp timeStamp={unixTimestamp} />
      </Text>
    </VStack>
  );
}

export default memo(_BlockTimeItem);
