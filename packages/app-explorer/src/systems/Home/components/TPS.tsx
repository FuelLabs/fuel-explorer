import { RoundedContainer } from '@fuels/ui';
import {
  Bar,
  BarChart,
  CartesianGrid,
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
    time: dayjs(block.time).format('HH:mm'),
    value: block.value / 3600,
  }));
  const averageTPS =
    blocks.reduce((sum: any, block: any) => sum + Number(block.value), 0) /
    blocks.length;

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
          {`${averageTPS.toFixed(0)}K`}
        </h2>

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
              tick={{ className: 'fill-heading', fontSize: '12px' }}
            />
            <YAxis tick={{ className: 'fill-heading', fontSize: '12px' }} />
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

import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'recharts';

// Mock data for illustration. You would fetch real-time data from an API.
const initialData = [
  { time: '14', tps: 1800 },
  { time: '', tps: 1400 },
  { time: '', tps: 1000 },
  { time: '10', tps: 1200 },
  { time: '4', tps: 700 },
];

const TPSChart = () => {
  const [data, setData] = useState(initialData);

  // Function to simulate data fetching (replace with real API call)
  const fetchTPSData = () => {
    // Simulate API call and update the data
    const newData = data.map((item) => ({
      ...item,
      tps: Math.floor(Math.random() * 2000), // Random TPS data
    }));
    setData(newData);
  };

  useEffect(() => {
    // Fetch new data every 5 seconds (for demo), adjust interval as needed
    const interval = setInterval(() => {
      fetchTPSData();
    }, 5000); // Adjust to hourly interval if required

    return () => clearInterval(interval);
  }, [data]);

  const maxTps = Math.max(...data.map((item) => item.tps)); // Find the max TPS value

  return (
    <div
      style={{
        width: '100%',
        height: 300,
        backgroundColor: '#1C1C1E',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          {/* Custom grid with only vertical lines (divisions between hours) */}
          <CartesianGrid
            vertical={true}
            horizontal={false} // Remove horizontal lines
            stroke="#333"
            strokeDasharray="3 3" // Dashed vertical lines to match the design
          />
          <XAxis
            dataKey="time"
            tick={{ fill: '#ccc' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 2000]}
            tick={{ fill: '#ccc' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            labelStyle={{ color: '#ccc' }}
            itemStyle={{ color: '#21BF96' }}
            formatter={(value: number) => [`${value} TXs`, 'TPS']}
          />
          {/* Bars: Highlight the highest bar with green, rest with grey */}
          <Bar
            dataKey="tps"
            fill={(entry) => (entry.tps === maxTps ? '#21BF96' : '#666')}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TPSChart;
