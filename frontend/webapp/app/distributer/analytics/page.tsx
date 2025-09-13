"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartConfig, ChartTooltipContent } from "@/components/shadcn/ui/chart";
import { AlertTriangle, TrendingUp, Activity, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

const chartData = [
  { month: "Jan", sales: 12000, verifications: 150, transactions: 45 },
  { month: "Feb", sales: 11000, verifications: 140, transactions: 42 },
  { month: "Mar", sales: 13000, verifications: 160, transactions: 48 },
  { month: "Apr", sales: 14000, verifications: 180, transactions: 52 },
  { month: "May", sales: 16500, verifications: 200, transactions: 58 },
  { month: "Jun", sales: 18000, verifications: 220, transactions: 62 },
];

const fraudData = [
  {
    type: "Suspicious Quantity Fluctuations",
    severity: "Medium",
    count: 3,
    description: "Unusual batch size variations detected in corn shipments"
  },
  {
    type: "Documentation Inconsistencies",
    severity: "Low",
    count: 1,
    description: "Minor discrepancies in certification timestamps"
  },
  {
    type: "Location Anomalies",
    severity: "High",
    count: 1,
    description: "Product tracked outside expected distribution routes"
  }
];

const chartConfig = {
  sales: {
    label: "Sales ($)",
    color: "#22c55e",
  },
  verifications: {
    label: "Verifications",
    color: "#52b788",
  },
  transactions: {
    label: "Transactions",
    color: "#16a34a",
  },
} satisfies ChartConfig;

const SeverityBadge = ({ severity }: { severity: string }) => {
  const getConfig = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "vericrop-badge-error";
      case "medium":
        return "vericrop-badge-pending";
      case "low":
        return "vericrop-badge-info";
      default:
        return "vericrop-badge-info";
    }
  };

  return (
    <div className={getConfig(severity)}>
      {severity}
    </div>
  );
};

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Advanced data insights and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <TrendingUp className="h-8 w-8 vericrop-text-primary" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Sales</h3>
          <div className="text-2xl font-bold vericrop-text-primary">$84,500</div>
          <p className="text-xs text-green-600">+15.2% vs last month</p>
        </div>

        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <Shield className="h-8 w-8 vericrop-text-success" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Verifications</h3>
          <div className="text-2xl font-bold vericrop-text-primary">1,125</div>
          <p className="text-xs text-green-600">+8.3% vs last month</p>
        </div>

        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <Activity className="h-8 w-8 vericrop-text-secondary" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Batches</h3>
          <div className="text-2xl font-bold vericrop-text-primary">247</div>
          <p className="text-xs text-blue-600">Currently processing</p>
        </div>

        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <BarChart3 className="h-8 w-8 vericrop-text-accent" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Success Rate</h3>
          <div className="text-2xl font-bold vericrop-text-primary">98.7%</div>
          <p className="text-xs text-green-600">Quality maintained</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Trends</h3>
          <p className="text-gray-600">Sales, verifications, and transaction analytics over time</p>
        </div>

        <ChartContainer
          config={chartConfig}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-gray-600"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-gray-600"
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="transactions"
                type="monotone"
                fill="var(--color-transactions)"
                fillOpacity={0.3}
                stroke="var(--color-transactions)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="verifications"
                type="monotone"
                fill="var(--color-verifications)"
                fillOpacity={0.3}
                stroke="var(--color-verifications)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="sales"
                type="monotone"
                fill="var(--color-sales)"
                fillOpacity={0.3}
                stroke="var(--color-sales)"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Fraud Detection & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fraud Detection Overview */}
        <div className="lg:col-span-2 vericrop-card-primary">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Fraud Detection Overview
              </h3>
              <p className="text-gray-600">
                Machine learning insights on supply chain security
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>

          <div className="space-y-4">
            {fraudData.map((item, index) => (
              <div key={index} className="vericrop-card-secondary vericrop-hover-lift">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{item.type}</h4>
                      <SeverityBadge severity={item.severity} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">{item.count}</span> occurrence{item.count > 1 ? 's' : ''} detected
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="vericrop-card-primary">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Button className="w-full vericrop-btn-primary justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="w-full vericrop-btn-secondary justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Audit Trail
            </Button>
            <Button className="w-full vericrop-btn-secondary justify-start">
              <Activity className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button className="w-full vericrop-btn-secondary justify-start">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Alert Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
