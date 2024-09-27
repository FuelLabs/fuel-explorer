import { ChartConfig, RoundedContainer } from '@fuels/ui';
import dayjs from 'dayjs';
import { DateTime } from 'fuels';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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
  const chartData = blocks.blocks?.reduce(
    (acc: { [key: string]: number }, block: any) => {
      const time = dayjs(Number(block.time)).format('HH:mm');
      const value = +block.value;
      acc[time] = (acc[time] || 0) + value;
      return acc;
    },
    {},
  );

  const chartDataArray = chartData
    ? Object.entries(chartData).map(([time, value]) => ({
        time,
        value,
      }))
    : [];
  const cumilativeTsx = blocks.blocks.reduce(
    (sum: any, block: any) => sum + Number(block.value),
    0,
  );
  return (
    <RoundedContainer className="py-4 px-5 h-full space-y-8 ">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="text-[15px] leading-[24px] text-heading font-semibold group relative">
            <div className=" relative group">
              <div className="flex items-center group">
                <span className="">Daily Transactions</span>
                <span className="ml-2 group cursor-pointer">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 0.5C5.71442 0.5 4.45772 0.881218 3.3888 1.59545C2.31988 2.30968 1.48676 3.32484 0.994786 4.51256C0.502816 5.70028 0.374095 7.00721 0.624899 8.26809C0.875703 9.52896 1.49477 10.6872 2.40381 11.5962C3.31285 12.5052 4.47104 13.1243 5.73192 13.3751C6.99279 13.6259 8.29973 13.4972 9.48744 13.0052C10.6752 12.5132 11.6903 11.6801 12.4046 10.6112C13.1188 9.54229 13.5 8.28558 13.5 7C13.4982 5.27665 12.8128 3.62441 11.5942 2.40582C10.3756 1.18722 8.72335 0.50182 7 0.5ZM6.75 3.5C6.89834 3.5 7.04334 3.54399 7.16668 3.6264C7.29002 3.70881 7.38615 3.82594 7.44291 3.96299C7.49968 4.10003 7.51453 4.25083 7.48559 4.39632C7.45665 4.5418 7.38522 4.67544 7.28033 4.78033C7.17544 4.88522 7.04181 4.95665 6.89632 4.98559C6.75083 5.01453 6.60003 4.99968 6.46299 4.94291C6.32595 4.88614 6.20881 4.79001 6.1264 4.66668C6.04399 4.54334 6 4.39834 6 4.25C6 4.05109 6.07902 3.86032 6.21967 3.71967C6.36032 3.57902 6.55109 3.5 6.75 3.5ZM7.5 10.5C7.23479 10.5 6.98043 10.3946 6.7929 10.2071C6.60536 10.0196 6.5 9.76522 6.5 9.5V7C6.36739 7 6.24022 6.94732 6.14645 6.85355C6.05268 6.75979 6 6.63261 6 6.5C6 6.36739 6.05268 6.24021 6.14645 6.14645C6.24022 6.05268 6.36739 6 6.5 6C6.76522 6 7.01957 6.10536 7.20711 6.29289C7.39465 6.48043 7.5 6.73478 7.5 7V9.5C7.63261 9.5 7.75979 9.55268 7.85356 9.64645C7.94732 9.74021 8 9.86739 8 10C8 10.1326 7.94732 10.2598 7.85356 10.3536C7.75979 10.4473 7.63261 10.5 7.5 10.5Z"
                      fill="#646464"
                    />
                  </svg>
                </span>
              </div>
              <div className="absolute left-[20px] top-[30px] w-[20rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-3 py-2 text-xs font-light text-black dark:text-white  bg-gray-3 rounded-lg shadow-sm">
                The total number of transactions completed on Fuel Network
                within a 24-hour period.
                <div className="absolute left-[10px] top-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gray-3" />
              </div>
            </div>
          </div>
          <span className="text-[13px] leading-[20px] text-muted block">
            24h
          </span>
        </div>
        <h2 className="text-[32px] leading-[36px] text-heading font-bold">
          {cumilativeTsx.toLocaleString()}
        </h2>

        <ResponsiveContainer width="100%" height={160}>
          <LineChart
            data={chartDataArray}
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
            <Tooltip
              formatter={(value) => [`${Number(value)}`]}
              labelFormatter={(label) => label.toLocaleString()}
              contentStyle={{
                backgroundColor: 'var(--gray-1)',
                borderColor: 'var(--gray-2)',
                borderRadius: '8px',
                color: 'var(--gray-1)',
              }}
              labelStyle={{
                color: 'var(--gray-12)',
                fontWeight: 'bold',
              }}
              itemStyle={{
                color: '#00F58C',
              }}
              cursor={{ strokeWidth: 0.1, radius: 10 }}
            />
            <YAxis
              tick={{
                fontSize: 12,
                className: 'fill-heading',
                key: DateTime.now(),
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
