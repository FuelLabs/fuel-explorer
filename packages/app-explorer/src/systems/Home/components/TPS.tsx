import { RoundedContainer } from '@fuels/ui';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = [
  { time: '17', value: 1900 },
  { time: '23', value: 1500 },
  { time: '5', value: 1000 },
  { time: '11', value: 1200 },
];

export const TPS = () => {
  //   const numberFormatter = new Intl.NumberFormat('en-US', {
  //     maximumFractionDigits: 2,
  //     style: 'decimal',
  //     notation: 'compact',
  //   });
  return (
    <RoundedContainer className="py-4 px-5  space-y-8">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
            TPS
          </h3>
          <span className="text-[13px] leading-[20px] text-muted block">
            24h
          </span>
        </div>
        <h2 className="text-[32px] leading-[36px] text-heading font-bold">
          1.43M
        </h2>

        <ResponsiveContainer width="100%" height={160}>
          <BarChart
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
              tick={{ className: 'fill-heading', fontSize: '12px' }}
            />
            <YAxis
              tick={{ className: 'fill-heading', fontSize: '12px' }}
              domain={[0, 1900]}
              tickFormatter={(value) => {
                return `${value / 1000}K`;
              }}
            />
            <Bar
              dataKey="value"
              className="dark:fill-white fill-[#eee]"
              radius={[10, 10, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </RoundedContainer>
  );
};
