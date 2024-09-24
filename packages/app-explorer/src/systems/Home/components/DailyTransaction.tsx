import { ChartConfig, RoundedContainer } from '@fuels/ui';
import dayjs from 'dayjs';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
// import { Block } from '../interface/blocks.interface';

// const chartData = [
//   { time: '01:00', value: 100000 },
//   { time: '09:00', value: 500000 },
//   { time: '17:00', value: 1000000 },
//   { time: '23:00', value: 1500000 },
// ];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#00F58C',
  },
} satisfies ChartConfig;

interface DailyTransactionProps {
  blocks: any;
}
const DailyTransaction = (blocks: DailyTransactionProps) => {
  console.log(blocks.blocks);
  const chartData = blocks.blocks?.map((block: any) => ({
    time: dayjs(block.timeStamp).format('HH:mm'),
    value: block.value,
  }));

  const cumilativeTsx = blocks.blocks.reduce(
    (sum: any, block: any) => sum + Number(block.value),
    0,
  );
  return (
    <RoundedContainer className="py-4 px-5 space-y-8 ">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="text-[15px] leading-[24px] text-heading font-semibold group">
            <span className="">Daily Transactions</span>
            <div className="absolute left-[20px] top-[30px] w-[20rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-3 py-2 text-xs font-light text-black dark:text-white bg-gray-3 rounded-lg shadow-sm">
              The percentage of block resources utilized by transactions.
              <div className="absolute left-[10px] top-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gray-3" />
            </div>
          </div>
          <span className="text-[13px] leading-[20px] text-muted block">
            24H
          </span>
        </div>
        <h2 className="text-[32px] leading-[36px] text-heading font-bold">
          {cumilativeTsx}
        </h2>

        <ResponsiveContainer width="100%" height={160}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{
                fontSize: 10,
                className: 'fill-heading',
              }}
            />
            <YAxis
              tick={{
                fontSize: 12,
                className: 'fill-heading',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartConfig.desktop.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </RoundedContainer>
  );
};

export default DailyTransaction;
