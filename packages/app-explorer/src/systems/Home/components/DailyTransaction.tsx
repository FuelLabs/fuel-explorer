import { AnimatedNumber, type ChartConfig, RoundedContainer } from '@fuels/ui';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { InfoHint } from '~/systems/Core/components/InfoHint/InfoHint';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--fuel-primary)',
  },
} satisfies ChartConfig;

interface DailyTransactionProps {
  blocks: any;
}

const formatInteger = (v: number) => Math.round(v).toLocaleString();

const DailyTransaction = (blocks: DailyTransactionProps) => {
  const { t } = useTranslation();
  const { chartDataArray, cumilativeTsx } = useMemo(() => {
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
    const cumilativeTsx = Array.isArray(blocks.blocks)
      ? blocks.blocks.reduce(
          (sum: number, block: any) => sum + Number(block?.value || 0),
          0,
        )
      : 0;

    return {
      chartData,
      chartDataArray,
      cumilativeTsx,
    };
  }, [blocks]);

  return (
    <RoundedContainer className="py-4 px-5 h-full flex flex-col">
      <div className="flex flex-col flex-1 min-h-0 space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="fuel-label m-0">{t('home.daily_transactions')}</h2>
            <InfoHint content={t('home.daily_transactions_hint')} />
          </div>
          <span className="fuel-label block">{t('common.window_24h')}</span>
        </div>
        <p className="fuel-stat m-0">
          <AnimatedNumber value={cumilativeTsx} format={formatInteger} />
        </p>

        <div className="h-[136px] laptop:h-auto laptop:flex-1 laptop:min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartDataArray}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--fuel-grid-line)"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{
                  fontSize: 12,
                  className: 'fill-heading',
                }}
              />
              <Tooltip
                formatter={(value: any) => [`${Number(value)}`]}
                labelFormatter={(label: any) => label.toLocaleString()}
                contentStyle={{
                  backgroundColor: 'var(--fuel-background)',
                  borderColor: 'var(--fuel-line)',
                  borderRadius: 0,
                  color: 'var(--fuel-element-high-em)',
                }}
                labelStyle={{
                  color: 'var(--fuel-element-high-em)',
                  fontWeight: 'bold',
                }}
                itemStyle={{
                  color: 'var(--fuel-brand-text)',
                }}
                cursor={{ strokeWidth: 0.1, radius: 10 }}
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
      </div>
    </RoundedContainer>
  );
};

export default DailyTransaction;
