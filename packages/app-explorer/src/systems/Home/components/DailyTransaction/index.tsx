import { ChartConfig, RoundedContainer } from '@fuels/ui';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = [
  { time: '01:00', value: 100000 },
  { time: '09:00', value: 500000 },
  { time: '17:00', value: 1000000 },
  { time: '23:00', value: 1500000 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#00F58C',
  },
} satisfies ChartConfig;

export const DailyTransaction = () => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    style: 'decimal',
    notation: 'compact',
  });
  return (
    <RoundedContainer className="py-4 px-5 space-y-8 ">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] leading-[24px] text-white font-semibold">
            Daily Transactions
          </h3>
          <span className="text-[13px] leading-[20px] text-white/45 block">
            24H
          </span>
        </div>
        <h2 className="text-[32px] leading-[36px] text-white font-bold">
          1.43M
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
              tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}
            />
            <YAxis
              tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}
              domain={[0, 1500000]}
              tickFormatter={(value) => {
                return numberFormatter.format(value);
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
