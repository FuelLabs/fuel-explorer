import { AnimatedNumber, HStack, RoundedContainer } from '@fuels/ui';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    <RoundedContainer className="py-4 px-5 h-full flex flex-col">
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden space-y-[16px]">
        <div className="flex items-center justify-between">
          <h2 className="fuel-label m-0">{t('home.hourly_tps')}</h2>
          <span className="fuel-label">{t('common.window_24h')}</span>
        </div>
        <HStack className="items-baseline gap-3" gap={'0'}>
          <HStack className="items-baseline" gap={'0'}>
            <p className="fuel-stat m-0">
              <AnimatedNumber
                value={currentHourAvg}
                format={(v) => v.toFixed(2)}
              />
            </p>
            <div className="text-[12px] leading-[12px] text-heading ml-1">
              {t('home.tx_per_second')}
            </div>
          </HStack>
          {peakTps > 0 && (
            <span className="text-[12px] text-muted">
              {t('home.peak')}{' '}
              <span className="text-heading font-medium">
                {peakTps.toFixed(2)}
              </span>{' '}
              {t('home.tx_per_second')}
            </span>
          )}
        </HStack>
        <div className="h-[136px] laptop:h-auto laptop:flex-1 laptop:min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 0"
                stroke="var(--fuel-grid-line)"
                vertical={true}
                horizontal={false}
              />
              <XAxis
                dataKey="time"
                tick={{ className: 'fill-heading', fontSize: '12px' }}
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
                        backgroundColor: 'var(--fuel-background)',
                        border: '1px solid var(--fuel-line)',
                        borderRadius: 0,
                        padding: '8px 12px',
                        fontSize: '12px',
                      }}
                    >
                      <div
                        style={{
                          color: 'var(--fuel-element-high-em)',
                          fontWeight: 'bold',
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </div>
                      <div style={{ color: 'var(--fuel-brand-text)' }}>
                        {t('home.peak_tps')}: {data.max.toFixed(2)}{' '}
                        {t('home.tx_per_second')}
                      </div>
                      <div style={{ color: 'var(--fuel-element-high-em)' }}>
                        {t('home.avg_tps')}: {data.avg.toFixed(2)}{' '}
                        {t('home.tx_per_second')}
                      </div>
                    </div>
                  );
                }}
                cursor={{ strokeWidth: 0.1, radius: 10 }}
              />
              {peakTps > 0 && (
                <ReferenceLine
                  y={peakTps}
                  stroke="var(--fuel-element-low-em)"
                  strokeDasharray="5 3"
                />
              )}
              <Bar
                dataKey="max"
                radius={0}
                barSize={5}
                fill="var(--fuel-primary)"
              />
              <Bar dataKey="avg" radius={0} barSize={5} xAxisId="overlay">
                {chartData.map((_, index) => (
                  <Cell
                    key={`avg-${index}`}
                    fill="var(--fuel-element-low-em)"
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </RoundedContainer>
  );
};

export default TPSHourly;
