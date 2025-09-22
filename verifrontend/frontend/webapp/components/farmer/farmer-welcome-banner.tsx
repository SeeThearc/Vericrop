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
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradient} p-6 text-white cursor-pointer border border-white/10 shadow-lg min-w-[200px]`}
    onClick={onClick}
  >
    <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
    <div className="relative flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        {badge && (
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm"
          >
            {badge}
          </Badge>
        )}
      </div>
      <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
        {icon}
      </div>
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
      gradient: "from-blue-400/20 to-blue-600/20",
      badge: "+5 this month",
    },
    {
      title: "Active Products",
      value: 23,
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-green-400/20 to-green-600/20",
      badge: "In supply chain",
    },
    {
      title: "Average Grade",
      value: "A+",
      icon: <Star className="h-6 w-6" />,
      gradient: "from-yellow-400/20 to-orange-500/20",
      badge: "Quality score",
    },
    {
      title: "Reputation Score",
      value: "4.8",
      icon: <Star className="h-6 w-6" />,
      gradient: "from-purple-400/20 to-purple-600/20",
      badge: "⭐ Verified Farmer",
    },
    {
      title: "Active Locations",
      value: 3,
      icon: <MapPin className="h-6 w-6" />,
      gradient: "from-teal-400/20 to-teal-600/20",
      badge: "Farms registered",
    },
    {
      title: "Handlers Working",
      value: 12,
      icon: <Users className="h-6 w-6" />,
      gradient: "from-rose-400/20 to-rose-600/20",
      badge: "Active team",
    },
  ];

  return (
    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-lg">
      <CardContent className="p-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-white"
            >
              Welcome back, John! 👨‍🌾
            </motion.h1>
            <p className="text-lg text-gray-300">
              Your farm operations are running smoothly
            </p>
          </div>

          {/* Wallet & Actions */}
          <div className="mt-4 lg:mt-0 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2 shadow-sm border border-white/20">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-200">
                  {truncatedWallet}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWalletCopy}
                  className="h-6 w-6 p-0"
                >
                  {walletCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="bg-black/20 hover:bg-black/30 border-white/20 text-white"
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
              className="flex items-center gap-2 bg-yellow-400/10 text-yellow-200 px-3 py-2 rounded-lg text-sm border border-yellow-400/20"
            >
              <Clock className="h-4 w-4" />
              <span>3 pending transactions</span>
            </motion.div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
