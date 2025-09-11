"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", wheat: 4000, rice: 2400, maize: 2400 },
  { month: "Feb", wheat: 3000, rice: 1398, maize: 2210 },
  { month: "Mar", wheat: 2000, rice: 9800, maize: 2290 },
  { month: "Apr", wheat: 2780, rice: 3908, maize: 2000 },
  { month: "May", wheat: 1890, rice: 4800, maize: 2181 },
  { month: "Jun", wheat: 2390, rice: 3800, maize: 2500 },
  { month: "Jul", wheat: 3490, rice: 4300, maize: 2100 },
];

const chartConfig = {
  wheat: {
    label: "Wheat",
    color: "#2563eb",
  },
  rice: {
    label: "Rice",
    color: "#60a5fa",
  },
  maize: {
    label: "Maize",
    color: "#34d399",
  },
} satisfies ChartConfig;

export const SalesChart = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Monthly Sales by Crop</h2>
      <ChartContainer config={chartConfig} className="h-[400px]">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey="wheat" fill="var(--color-wheat)" />
          <Bar dataKey="rice" fill="var(--color-rice)" />
          <Bar dataKey="maize" fill="var(--color-maize)" />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
