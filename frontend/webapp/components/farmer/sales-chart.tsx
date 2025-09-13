"use client";

import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Package, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/shadcn/ui/card";

const chartData = [
  { month: "Jan", revenue: 12000, products: 45, transactions: 120 },
  { month: "Feb", revenue: 11500, products: 42, transactions: 115 },
  { month: "Mar", revenue: 13800, products: 52, transactions: 138 },
  { month: "Apr", revenue: 15200, products: 58, transactions: 152 },
  { month: "May", revenue: 17600, products: 67, transactions: 176 },
  { month: "Jun", revenue: 19200, products: 73, transactions: 192 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    value: number;
  }>;
  label?: string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-[#E5E7EB]">
        <p className="font-semibold text-[#374151] mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#374151]">
              {entry.dataKey === "revenue" ? "$" : ""}
              {entry.value?.toLocaleString()}
              {entry.dataKey === "revenue"
                ? ""
                : entry.dataKey === "products"
                ? " products"
                : " transactions"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const SalesChart = () => {
  // Calculate metrics
  const currentMonth = chartData[chartData.length - 1];
  const previousMonth = chartData[chartData.length - 2];
  const revenueGrowth = (
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) *
    100
  ).toFixed(1);
  const productGrowth = (
    ((currentMonth.products - previousMonth.products) /
      previousMonth.products) *
    100
  ).toFixed(1);

  return (
    <div className="p-8 bg-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-lg">
          <BarChart3 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-[#374151] font-['Inter']">
            Analytics Dashboard
          </h2>
          <p className="text-[#374151] opacity-70 text-sm mt-1">
            Track your sales performance and product metrics
          </p>
        </div>
      </motion.div>

      {/* Key Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <Card className="border-0 shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#374151] opacity-70 mb-1">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-[#374151]">
                  ${currentMonth.revenue.toLocaleString()}
                </p>
                <p className="text-sm text-[#10B981] font-medium mt-1">
                  +{revenueGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#374151] opacity-70 mb-1">
                  Products Sold
                </p>
                <p className="text-3xl font-bold text-[#374151]">
                  {currentMonth.products}
                </p>
                <p className="text-sm text-[#10B981] font-medium mt-1">
                  +{productGrowth}% from last month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#374151] opacity-70 mb-1">
                  Transactions
                </p>
                <p className="text-3xl font-bold text-[#374151]">
                  {currentMonth.transactions}
                </p>
                <p className="text-sm text-[#10B981] font-medium mt-1">
                  +12.5% from last month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border-0 shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-[#374151] font-['Inter']">
                  Revenue & Product Trends
                </h3>
                <p className="text-sm text-[#374151] opacity-70 mt-1">
                  6-month performance overview
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                  <span className="text-[#374151]">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#52B788]"></div>
                  <span className="text-[#374151]">Products Sold</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#22C55E"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                    <linearGradient
                      id="productsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#52B788" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#52B788"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#374151", fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#374151", fontSize: 12 }}
                    tickMargin={10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22C55E"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    dot={{ fill: "#22C55E", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#22C55E", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="products"
                    stroke="#52B788"
                    strokeWidth={3}
                    fill="url(#productsGradient)"
                    dot={{ fill: "#52B788", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#52B788", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
