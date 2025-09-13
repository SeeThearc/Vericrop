"use client";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import {
  Package,
  CheckCircle,
  Star,
  MapPin,
  Users,
  ExternalLink,
  Copy,
  Clock,
} from "lucide-react";
import { useState } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  badge?: string;
  onClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  icon,
  gradient,
  badge,
  onClick,
}: MetricCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {badge && (
          <Badge
            variant="secondary"
            className="bg-white/20 text-white border-white/30"
          >
            {badge}
          </Badge>
        )}
      </div>
      <div className="rounded-lg bg-white/20 p-3">{icon}</div>
    </div>
  </motion.div>
);

export const FarmerWelcomeBanner = () => {
  const [walletCopied, setWalletCopied] = useState(false);

  const walletAddress =
    "0x742d35cc8f3f4f8c9b8e4a2f1d3e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f49a2b";
  const truncatedWallet = `${walletAddress.slice(0, 6)}...${walletAddress.slice(
    -4
  )}`;

  const handleWalletCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setWalletCopied(true);
    setTimeout(() => setWalletCopied(false), 2000);
  };

  const farmerMetrics = [
    {
      title: "Total Products",
      value: 47,
      icon: <Package className="h-6 w-6" />,
      gradient: "from-blue-500 to-blue-700",
      badge: "+5 this month",
    },
    {
      title: "Active Products",
      value: 23,
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-green-500 to-green-700",
      badge: "In supply chain",
    },
    {
      title: "Average Grade",
      value: "A+",
      icon: <Star className="h-6 w-6" />,
      gradient: "from-yellow-500 to-orange-600",
      badge: "Quality score",
    },
    {
      title: "Reputation Score",
      value: "4.8",
      icon: <Star className="h-6 w-6" />,
      gradient: "from-purple-500 to-purple-700",
      badge: "⭐ Verified Farmer",
    },
    {
      title: "Active Locations",
      value: 3,
      icon: <MapPin className="h-6 w-6" />,
      gradient: "from-teal-500 to-teal-700",
      badge: "Farms registered",
    },
    {
      title: "Handlers Working",
      value: 12,
      icon: <Users className="h-6 w-6" />,
      gradient: "from-rose-500 to-rose-700",
      badge: "Active team",
    },
  ];

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
      <CardContent className="p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900"
            >
              Welcome back, John! 👨‍🌾
            </motion.h1>
            <p className="text-lg text-gray-600">
              Your farm operations are running smoothly
            </p>
          </div>

          {/* Wallet & Actions */}
          <div className="mt-4 lg:mt-0 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {truncatedWallet}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWalletCopy}
                  className="h-6 w-6 p-0"
                >
                  {walletCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-gray-50"
                onClick={() => window.open("https://etherscan.io", "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Explorer
              </Button>
            </div>

            {/* Pending Transactions Alert */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm"
            >
              <Clock className="h-4 w-4" />
              <span>3 pending transactions</span>
            </motion.div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {farmerMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
