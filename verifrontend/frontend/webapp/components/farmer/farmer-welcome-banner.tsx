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
  Calendar,
  Mail,
  Shield,
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

interface FarmerWelcomeBannerProps {
  name: string;
  address: string;
  farmerReputation: number;
  distributorReputation: number;
  retailerReputation: number;
  role: string;
  email?: string;
  registrationTime?: string;
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

export const FarmerWelcomeBanner: React.FC<FarmerWelcomeBannerProps> = ({
  name,
  address,
  farmerReputation,
  distributorReputation,
  retailerReputation,
  role,
  email,
  registrationTime,
}) => {
  const [walletCopied, setWalletCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const truncatedWallet = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleWalletCopy = () => {
    navigator.clipboard.writeText(address);
    setWalletCopied(true);
    setTimeout(() => setWalletCopied(false), 2000);
  };

  const handleEmailCopy = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  // Format registration time
  const formatRegistrationTime = (timestamp: string) => {
    if (!timestamp) return "Not available";
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  // Calculate days since registration
  const getDaysSinceRegistration = (timestamp: string) => {
    if (!timestamp) return 0;
    try {
      const registrationDate = new Date(timestamp);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - registrationDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return 0;
    }
  };

  // Calculate average reputation
  const averageReputation = () => {
    const total = farmerReputation + distributorReputation + retailerReputation;
    const count = [farmerReputation, distributorReputation, retailerReputation].filter(rep => rep > 0).length;
    return count > 0 ? (total / count).toFixed(1) : "0.0";
  };

  // Get reputation badge
  const getReputationBadge = (avgRep: number) => {
    if (avgRep >= 4.5) return "⭐ Elite";
    if (avgRep >= 4.0) return "🏆 Verified";
    if (avgRep >= 3.5) return "✅ Trusted";
    if (avgRep >= 3.0) return "📈 Growing";
    return "🌱 New";
  };

  const farmerMetrics = [
    {
      title: "Farmer Reputation",
      value: farmerReputation / 100, // Assuming reputation is stored as integer, divide by 100
      icon: <Star className="h-6 w-6" />,
      gradient: "from-green-400/20 to-green-600/20",
      badge: role === 'farmer' ? "Primary Role" : "Secondary",
    },
    {
      title: "Account Age",
      value: `${getDaysSinceRegistration(registrationTime || "")}d`,
      icon: <Calendar className="h-6 w-6" />,
      gradient: "from-teal-400/20 to-teal-600/20",
      badge: "Days active",
    },
    {
      title: "Role Status",
      value: role.charAt(0).toUpperCase() + role.slice(1),
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-rose-400/20 to-rose-600/20",
      badge: "Active",
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
              Welcome back, {name}! 👨‍🌾
            </motion.h1>
            <p className="text-lg text-gray-300">
              Your {role} operations are running smoothly
            </p>
            {registrationTime && (
              <p className="text-sm text-gray-400">
                Member since {formatRegistrationTime(registrationTime)}
              </p>
            )}
          </div>

          {/* Wallet & Actions */}
          <div className="mt-4 lg:mt-0 space-y-3">
            <div className="flex flex-col gap-3">
              {/* Wallet Address */}
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

              {/* Email (if available) */}
              {email && (
                <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2 shadow-sm border border-white/20">
                  <Mail className="h-3 w-3 text-blue-400" />
                  <span className="text-sm font-medium text-gray-200">
                    {email.length > 20 ? `${email.slice(0, 20)}...` : email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEmailCopy}
                    className="h-6 w-6 p-0"
                  >
                    {emailCopied ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/20 hover:bg-black/30 border-white/20 text-white"
                onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Explorer
              </Button>
            </div>

            {/* Reputation Summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-emerald-400/10 text-emerald-200 px-3 py-2 rounded-lg text-sm border border-emerald-400/20"
            >
              <Star className="h-4 w-4" />
              <span>Overall Rating: {averageReputation()}/100.0</span>
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

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-black/20 rounded-lg border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Wallet Address:</span>
              <p className="text-white font-mono">{address}</p>
            </div>
            {email && (
              <div>
                <span className="text-gray-400">Email:</span>
                <p className="text-white">{email}</p>
              </div>
            )}
            <div>
              <span className="text-gray-400">Primary Role:</span>
              <p className="text-white capitalize">{role}</p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};