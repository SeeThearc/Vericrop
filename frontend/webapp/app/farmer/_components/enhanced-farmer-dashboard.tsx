"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "motion/react";
import { 
  Package, 
  Search, 
  BarChart3, 
  Sprout, 
  MapPin, 
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";

export function EnhancedFarmerDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {farmerStatsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 bg-white dark:bg-zinc-900">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${card.iconBg}`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        ))}
      </div>

      {/* Bento Grid Dashboard */}
      <BentoGrid className="max-w-7xl mx-auto">
        {farmerItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const farmerStatsCards = [
  {
    title: "Products Registered",
    value: "156",
    icon: Package,
    iconBg: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Active Crops",
    value: "12",
    icon: Sprout,
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Quality Score Avg",
    value: "95%",
    icon: Award,
    iconBg: "bg-yellow-100 dark:bg-yellow-900",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "This Season",
    value: "2.3k kg",
    icon: TrendingUp,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const farmerItems = [
  {
    title: "Register New Product",
    description: "Add new crops and products to the blockchain for tracking and verification.",
    header: <Skeleton />,
    icon: <Package className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Track My Products",
    description: "Monitor the journey of your products through the supply chain.",
    header: <Skeleton />,
    icon: <Search className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "ML Insights",
    description: "Get AI-powered insights about crop quality and market predictions.",
    header: <Skeleton />,
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Farm Management Dashboard",
    description:
      "Comprehensive overview of your farm operations, including crop health, harvest schedules, and quality metrics.",
    header: <Skeleton />,
    icon: <Sprout className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Location Tracking",
    description: "Monitor and manage multiple farm locations and their specific crop data.",
    header: <Skeleton />,
    icon: <MapPin className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Harvest Calendar",
    description: "Plan and track harvest schedules for optimal crop quality and timing.",
    header: <Skeleton />,
    icon: <Calendar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Performance Analytics",
    description:
      "Detailed analytics on crop performance, quality trends, and yield optimization strategies.",
    header: <Skeleton />,
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
];
