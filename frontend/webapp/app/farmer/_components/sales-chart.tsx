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
  { month: "Jan", wheat: 1200, rice: 1000 },
  { month: "Feb", wheat: 1100, rice: 1150 },
  { month: "Mar", wheat: 1300, rice: 1250 },
  { month: "Apr", wheat: 1400, rice: 1300 },
  { month: "May", wheat: 1650, rice: 1400 },
];

const chartConfig = {
  wheat: {
    label: "Wheat",
    color: "hsl(var(--chart-1))",
  },
  rice: {
    label: "Rice",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export const SalesChart = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Monthly Sales</h2>
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
            dataKey="rice"
            type="natural"
            fill="var(--color-rice)"
            fillOpacity={0.4}
            stroke="var(--color-rice)"
            stackId="a"
          />
          <Area
            dataKey="wheat"
            type="natural"
            fill="var(--color-wheat)"
            fillOpacity={0.4}
            stroke="var(--color-wheat)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
