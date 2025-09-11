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
import {
  ChartContainer,
  ChartConfig,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  TrendingUp,
  Users,
  DollarSign,
  Star,
  ShoppingCart,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const salesData = [
  { month: "Jan", sales: 45000, customers: 1200, avgOrder: 37.5 },
  { month: "Feb", sales: 42000, customers: 1150, avgOrder: 36.5 },
  { month: "Mar", sales: 52000, customers: 1400, avgOrder: 37.15 },
  { month: "Apr", sales: 58000, customers: 1550, avgOrder: 37.42 },
  { month: "May", sales: 63000, customers: 1680, avgOrder: 37.5 },
  { month: "Jun", sales: 71000, customers: 1850, avgOrder: 38.38 },
];

const topProducts = [
  { product: "Organic Wheat Flour", sales: 12400, rating: 4.8, units: 620 },
  { product: "Premium Corn Oil", sales: 9800, rating: 4.6, units: 490 },
  { product: "Fresh Tomato Sauce", sales: 8500, rating: 4.4, units: 850 },
  { product: "Soybean Protein", sales: 7200, rating: 4.9, units: 180 },
  { product: "Durum Pasta", sales: 6800, rating: 4.5, units: 340 },
];

const customerInsights = [
  {
    metric: "Peak Shopping Hours",
    value: "2-6 PM",
    trend: "+15%",
    description: "Highest customer traffic during afternoon hours",
  },
  {
    metric: "Average Basket Size",
    value: "$47.50",
    trend: "+8%",
    description: "Customers purchasing more items per visit",
  },
  {
    metric: "Return Customer Rate",
    value: "73%",
    trend: "+12%",
    description: "Strong customer loyalty and satisfaction",
  },
];

const chartConfig = {
  sales: {
    label: "Sales ($)",
    color: "#22c55e",
  },
  customers: {
    label: "Customers",
    color: "#52b788",
  },
  avgOrder: {
    label: "Avg Order ($)",
    color: "#16a34a",
  },
} satisfies ChartConfig;

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );
};

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Retail Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Sales insights, customer analytics, and business intelligence
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <DollarSign className="h-8 w-8 vericrop-text-primary" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Monthly Revenue
          </h3>
          <div className="text-2xl font-bold vericrop-text-primary">
            $71,000
          </div>
          <p className="text-xs text-green-600">+12.7% vs last month</p>
        </div>

        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <Users className="h-8 w-8 vericrop-text-success" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Active Customers
          </h3>
          <div className="text-2xl font-bold vericrop-text-primary">1,850</div>
          <p className="text-xs text-green-600">+10.1% vs last month</p>
        </div>

        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <Star className="h-8 w-8 vericrop-text-secondary" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Rating</h3>
          <div className="text-2xl font-bold vericrop-text-primary">4.7</div>
          <p className="text-xs text-green-600">Customer satisfaction</p>
        </div>

        <div className="vericrop-card-secondary text-center vericrop-hover-scale">
          <div className="flex items-center justify-center mb-3">
            <ShoppingCart className="h-8 w-8 vericrop-text-accent" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Conversion Rate
          </h3>
          <div className="text-2xl font-bold vericrop-text-primary">68.3%</div>
          <p className="text-xs text-green-600">Above industry avg</p>
        </div>
      </div>

      {/* Sales Trends Chart */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Sales & Customer Trends
          </h3>
          <p className="text-gray-600">
            Monthly sales performance, customer growth, and average order values
          </p>
        </div>

        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
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
                dataKey="sales"
                type="monotone"
                fill="var(--color-sales)"
                fillOpacity={0.3}
                stroke="var(--color-sales)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="vericrop-card-primary">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Top Performing Products
            </h3>
            <p className="text-gray-600">
              Best-selling products with customer ratings
            </p>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="vericrop-card-secondary vericrop-hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {product.product}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>
                        <span className="font-medium">Sales:</span> $
                        {product.sales.toLocaleString()}
                      </span>
                      <span>
                        <span className="font-medium">Units:</span>{" "}
                        {product.units}
                      </span>
                    </div>
                    <div className="mt-2">
                      <RatingStars rating={product.rating} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights */}
        <div className="vericrop-card-primary">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Customer Insights
            </h3>
            <p className="text-gray-600">
              Behavioral patterns and shopping preferences
            </p>
          </div>

          <div className="space-y-4">
            {customerInsights.map((insight, index) => (
              <div
                key={index}
                className="vericrop-card-secondary vericrop-hover-lift"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {insight.metric}
                  </h4>
                  <span className="text-sm text-green-600 font-medium">
                    {insight.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold vericrop-text-primary mb-2">
                  {insight.value}
                </div>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <Button className="w-full vericrop-btn-primary justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Customer Analysis Report
                </Button>
                <Button className="w-full vericrop-btn-secondary justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Sales Forecast
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
