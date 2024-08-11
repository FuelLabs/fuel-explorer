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
  { time: '01:00', ETH: 0.1, FUEL: 0.12 },
  { time: '09:00', ETH: 0.5, FUEL: 0.48 },
  { time: '17:00', ETH: 0.9, FUEL: 0.85 },
  { time: '23:00', ETH: 1.2, FUEL: 1.15 },
];

const chartConfig = {
  eth: {
    label: 'ETH',
    color: '#00E8FC', // Light blue for ETH
  },
  fuel: {
    label: 'FUEL',
    color: '#00F58C', // Light green for FUEL
  },
} satisfies ChartConfig;

export const GasSaved = () => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    style: 'currency',
    currency: 'USD',
  });

  return (
    <RoundedContainer className="py-4 px-5 space-y-3 ">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
            Gas Saved
          </h3>
          <span className="text-[13px] leading-[20px] text-muted block">
            24H
          </span>
        </div>
        <h2 className="text-[32px] leading-[36px] text-heading font-bold">
          $1.14
        </h2>

        <ResponsiveContainer width="100%" height={130}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
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
              domain={[0, 1.5]}
              tickFormatter={(value) => {
                return numberFormatter.format(value);
              }}
            />

            <Line
              type="monotone"
              dataKey="ETH"
              stroke={chartConfig.eth.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="FUEL"
              stroke={chartConfig.fuel.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-[24px]">
        <div className="flex items-center gap-[8px]">
          <div className="w-[6px] h-[6px] bg-[#0090FFE0]/85 rounded-full gap-[8px]" />
          <div className="text-[12px] leading-[16px] text-heading">ETH</div>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="w-[6px] h-[6px] bg-brand rounded-full gap-[8px]" />
          <div className="text-[12px] leading-[16px] text-heading">FUEL</div>
        </div>
      </div>
    </RoundedContainer>
  );
};
