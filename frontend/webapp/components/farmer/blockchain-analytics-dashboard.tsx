"use client";
import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Coins,
  Upload,
  Star,
  PieChart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface AnalyticsData {
  lifecycleDurations: {
    averageFarmDuration: number;
    averageProcessingDuration: number;
    averageDistributionDuration: number;
    averageTotalDuration: number;
  };
  transactionVolume: {
    totalTransactions: number;
    totalGasUsed: number;
    averageGasPrice: number;
    monthlyData: Array<{
      month: string;
      transactions: number;
      gasUsed: number;
    }>;
  };
  gradeDistribution: Array<{
    grade: string;
    count: number;
    percentage: number;
  }>;
  reputationTrend: Array<{
    date: string;
    score: number;
    transactions: number;
  }>;
  ipfsActivity: {
    totalUploads: number;
    totalSize: number;
    monthlyUploads: Array<{
      month: string;
      uploads: number;
      size: number;
    }>;
  };
}

interface BlockchainAnalyticsDashboardProps {
  data: AnalyticsData;
}

export const BlockchainAnalyticsDashboard = ({
  data,
}: BlockchainAnalyticsDashboardProps) => {
  // Color scheme for charts
  const colors = {
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
    danger: "#EF4444",
    purple: "#8B5CF6",
    pink: "#EC4899",
  };

  const gradeColors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Blockchain Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Comprehensive insights into your on-chain activity and performance
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
          Last 6 Months
        </Badge>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">
                    Avg Lifecycle
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {data.lifecycleDurations.averageTotalDuration} days
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Farm to Retail</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">
                    Gas Used
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {(data.transactionVolume.totalGasUsed / 1000000).toFixed(1)}
                    M
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {data.transactionVolume.totalTransactions} transactions
                  </p>
                </div>
                <Coins className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">
                    IPFS Uploads
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {data.ipfsActivity.totalUploads}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    {(data.ipfsActivity.totalSize / (1024 * 1024)).toFixed(1)}{" "}
                    MB total
                  </p>
                </div>
                <Upload className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 mb-1">
                    Avg Rating
                  </p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {data.reputationTrend[
                      data.reputationTrend.length - 1
                    ]?.score.toFixed(1) || "N/A"}
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-600 mr-1" />
                    <p className="text-xs text-yellow-600">Current Score</p>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Volume Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-blue-500" />
                Transaction Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.transactionVolume.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        value,
                        name === "transactions" ? "Transactions" : "Gas Used",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="transactions"
                      stackId="1"
                      stroke={colors.primary}
                      fill={colors.primary}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5 text-green-500" />
                Quality Grade Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <RechartsPieChart
                      data={data.gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="count"
                    >
                      {data.gradeDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={gradeColors[index % gradeColors.length]}
                        />
                      ))}
                    </RechartsPieChart>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `${value} products (${props.payload?.percentage}%)`,
                        props.payload?.grade,
                      ]}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {data.gradeDistribution.map((item, index) => (
                  <div
                    key={item.grade}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          gradeColors[index % gradeColors.length],
                      }}
                    />
                    <span>
                      {item.grade}: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reputation Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Reputation Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.reputationTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "score" ? `${value}/5.0` : value,
                        name === "score" ? "Reputation Score" : "Transactions",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke={colors.purple}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* IPFS Upload Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-pink-500" />
                IPFS Upload Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.ipfsActivity.monthlyUploads}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "uploads"
                          ? `${value} uploads`
                          : `${(Number(value) / (1024 * 1024)).toFixed(1)} MB`,
                        name === "uploads" ? "Uploads" : "Data Size",
                      ]}
                    />
                    <Bar dataKey="uploads" fill={colors.pink} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lifecycle Duration Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              Average Lifecycle Durations by Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {data.lifecycleDurations.averageFarmDuration} days
                </div>
                <div className="text-sm text-blue-700">Farm Stage</div>
                <div className="text-xs text-blue-600 mt-1">
                  Growth & Harvest
                </div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {data.lifecycleDurations.averageProcessingDuration} days
                </div>
                <div className="text-sm text-green-700">Processing Stage</div>
                <div className="text-xs text-green-600 mt-1">
                  Processing & Packaging
                </div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {data.lifecycleDurations.averageDistributionDuration} days
                </div>
                <div className="text-sm text-purple-700">
                  Distribution Stage
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  Transport & Delivery
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
