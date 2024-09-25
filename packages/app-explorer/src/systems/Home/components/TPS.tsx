import { HStack, RoundedContainer } from '@fuels/ui';
import dayjs from 'dayjs';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

export interface TPSProps {
  blocks: any;
}

export const TPS = (props: TPSProps) => {
  const blocks = props.blocks;

  const chartData = blocks?.map((block: any) => ({
    time: dayjs(Number(block.time)).format('HH:mm'),
    value: block.value / 3600,
  }));

  const averageTPS =
    blocks.reduce((sum: any, block: any) => sum + Number(block.value), 0) /
    blocks.length;

  const highestValue = Math.max(
    ...chartData.map((data: any) => Number(data.value)),
  );

  const getTicks = () => {
    const ticks: string[] = [];
    for (let i = 0; i < chartData.length; i += 6) {
      ticks.push(chartData[i].time);
    }
    return ticks;
  };

  return (
    <RoundedContainer className="py-4 px-5 h-full space-y-8">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
            TPS
          </h3>
          <span className="text-[13px] leading-[20px] text-muted block">
            24
          </span>
        </div>
        <HStack className="items-baseline" gap={'0'}>
          <h2 className="text-[32px] leading-[36px] text-heading font-bold">
            {`${Math.ceil(averageTPS / 3600)}`}
          </h2>
          <div className="text-[12px] leading-[12px] text-heading ">TX/s</div>
        </HStack>

        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              stroke="#333"
              vertical={true}
              horizontal={false}
            />
            <XAxis
              dataKey="time"
              ticks={getTicks()}
              tick={{ className: 'fill-heading', fontSize: '12px' }}
              interval={0}
              tickFormatter={(value) => value}
            />
            <YAxis tick={{ className: 'fill-heading', fontSize: '12px' }} />
            <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={5}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value === highestValue ? '#00F58C' : '#eee'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </RoundedContainer>
  );
};
