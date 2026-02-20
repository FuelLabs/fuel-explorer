import { Text, VStack } from '@fuels/ui';
import { TxFullDateTimestamp } from '~/systems/Transaction/component/TxFullDateTimestamp/TxFullDateTimestamp';
import { TxTimeAgoTimestamp } from '~/systems/Transaction/component/TxTimeAgoTimestamp/TxTimeAgoTimestamp';

type BlockTimeItemProps = {
  unixTimestamp: number;
};

export default function BlockTimeItem({ unixTimestamp }: BlockTimeItemProps) {
  return (
    <VStack gap="0px">
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f]">
        <TxTimeAgoTimestamp timeStamp={unixTimestamp} loading={null} />
      </Text>
      <Text className="text-[0.7rem] p-0 m-0 text-[#9f9f9f] whitespace-nowrap">
        <TxFullDateTimestamp timeStamp={unixTimestamp} />
      </Text>
    </VStack>
  );
}
