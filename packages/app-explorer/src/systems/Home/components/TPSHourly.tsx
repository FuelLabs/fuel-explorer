import { HStack, RoundedContainer } from '@fuels/ui';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface TPSHourlyProps {
  tpsPerMinute: any;
  peakTps?: number;
}

export const TPSHourly = ({ tpsPerMinute, peakTps = 0 }: TPSHourlyProps) => {
  const { chartData, currentHourAvg } = useMemo(() => {
    if (!Array.isArray(tpsPerMinute) || tpsPerMinute.length === 0) {
      return { chartData: [], currentHourAvg: 0 };
    }

    const hourBuckets = new Map<
      string,
      { displayHour: string; sum: number; count: number; max: number }
    >();

    for (const element of tpsPerMinute) {
      const ts = dayjs(Number(element.time));
      const key = ts.format('YYYY-MM-DD HH:00');
      const displayHour = ts.format('HH:00');
      const value = Number(element.value) || 0;
      const bucket = hourBuckets.get(key);
      if (bucket) {
        bucket.sum += value;
        bucket.count += 1;
        bucket.max = Math.max(bucket.max, value);
      } else {
        hourBuckets.set(key, { displayHour, sum: value, count: 1, max: value });
      }
    }

    const chartData = Array.from(hourBuckets.values()).map(
      ({ displayHour, sum, count, max }) => ({
        time: displayHour,
        avg: sum / count,
        max,
      }),
    );

    const currentHourAvg =
      chartData.length > 0 ? chartData[chartData.length - 1].avg : 0;

    return { chartData, currentHourAvg };
  }, [tpsPerMinute]);

  return (
    <RoundedContainer className="py-4 px-5 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0 space-y-[16px]">
        <div className="flex items-center justify-between">
          <span className="text-[15px] leading-[24px] text-heading font-semibold">
            Hourly TPS
          </span>
          <span className="text-[13px] leading-[20px] text-muted">24h</span>
        </div>
        <HStack className="items-baseline gap-3" gap={'0'}>
          <HStack className="items-baseline" gap={'0'}>
            <h2 className="text-[27px] lg:text-[32px] leading-[36px] text-heading font-bold">
              {currentHourAvg.toFixed(2)}
            </h2>
            <div className="text-[12px] leading-[12px] text-heading ml-1">
              TX/s
            </div>
          </HStack>
          {peakTps > 0 && (
            <span className="text-[12px] text-muted">
              Peak:{' '}
              <span className="text-[#FF6B6B] font-semibold">
                {peakTps.toFixed(2)}
              </span>{' '}
              TX/s
            </span>
          )}
        </HStack>
        <ResponsiveContainer width="100%" className="flex-1 min-h-0">
          <ComposedChart
            data={chartData}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 0"
              stroke="#333"
              vertical={true}
              horizontal={false}
            />
            <XAxis
              dataKey="time"
              tick={{ className: 'fill-heading', fontSize: '10px' }}
              interval={Math.max(0, Math.floor(chartData.length / 6) - 1)}
            />
            <XAxis dataKey="time" xAxisId="overlay" hide />
            <YAxis
              hide
              domain={[
                0,
                (max: number) =>
                  peakTps > 0 ? Math.max(max, peakTps * 1.1) : max,
              ]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div
                    style={{
                      backgroundColor: 'var(--gray-1)',
                      border: '1px solid var(--gray-2)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        color: 'var(--gray-12)',
                        fontWeight: 'bold',
                        marginBottom: 4,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ color: '#00F58C' }}>
                      Avg TPS: {data.avg.toFixed(2)} TX/s
                    </div>
                    <div style={{ color: 'var(--gray-12)' }}>
                      Peak TPS: {data.max.toFixed(2)} TX/s
                    </div>
                    {peakTps > 0 && (
                      <div
                        style={{
                          color: '#FF6B6B',
                          marginTop: 2,
                          fontSize: '11px',
                        }}
                      >
                        Day Peak: {peakTps.toFixed(2)} TX/s
                      </div>
                    )}
                  </div>
                );
              }}
              cursor={{ strokeWidth: 0.1, radius: 10 }}
            />
            {peakTps > 0 && (
              <ReferenceLine
                y={peakTps}
                stroke="#FF6B6B"
                strokeDasharray="5 3"
                label={{
                  value: `Peak: ${peakTps.toFixed(2)}`,
                  position: 'right',
                  fill: '#FF6B6B',
                  fontSize: 10,
                }}
              />
            )}
            <Bar
              dataKey="max"
              radius={[10, 10, 10, 10]}
              barSize={5}
              fill="#00F58C"
            />
            <Bar
              dataKey="avg"
              radius={[10, 10, 10, 10]}
              barSize={5}
              xAxisId="overlay"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`avg-${index}`}
                  className="text-[rgb(180,180,180)] dark:text-[rgb(223,223,223)] fill-current"
                />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </RoundedContainer>
  );
};

export default TPSHourly;
