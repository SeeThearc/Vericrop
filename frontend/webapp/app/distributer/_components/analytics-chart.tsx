"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartConfig, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", sales: 12000, verifications: 150 },
  { month: "Feb", sales: 11000, verifications: 140 },
  { month: "Mar", sales: 13000, verifications: 160 },
  { month: "Apr", sales: 14000, verifications: 180 },
  { month: "May", sales: 16500, verifications: 200 },
];

const chartConfig = {
  sales: {
    label: "Sales ($)",
    color: "hsl(var(--chart-1))",
  },
  verifications: {
    label: "Verifications",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export const AnalyticsChart = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Monthly Analytics</h2>
      <ChartContainer config={chartConfig} className="h-[400px] transition-all duration-300">
        <AreaChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="verifications"
            type="natural"
            fill="var(--color-verifications)"
            fillOpacity={0.4}
            stroke="var(--color-verifications)"
            stackId="a"
          />
          <Area
            dataKey="sales"
            type="natural"
            fill="var(--color-sales)"
            fillOpacity={0.4}
            stroke="var(--color-sales)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
