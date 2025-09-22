"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/shadcn/ui/bento-grid";
import { BackgroundGradient } from "@/components/shadcn/ui/background-gradient";
import { motion } from "motion/react";
import {
  Search,
  ShoppingCart,
  BarChart3,
  Scan,
  Shield,
  TrendingUp,
  Package,
  Clock,
} from "lucide-react";

export function EnhancedDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
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
        {items.map((item, i) => (
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

const statsCards = [
  {
    title: "Total Purchases",
    value: "24",
    icon: ShoppingCart,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Products Scanned",
    value: "142",
    icon: Scan,
    iconBg: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Quality Score Avg",
    value: "92%",
    icon: Shield,
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "This Month",
    value: "8",
    icon: TrendingUp,
    iconBg: "bg-orange-100 dark:bg-orange-900",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
];

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Product Search",
    description:
      "Search and verify products by entering product IDs.",
    header: <Skeleton />,
    icon: <Search className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Recent Purchases",
    description: "View your recent purchases and their quality assessments.",
    header: <Skeleton />,
    icon: <ShoppingCart className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Quality History",
    description:
      "Track the quality history of all your purchased products over time.",
    header: <Skeleton />,
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Supply Chain Tracker",
    description:
      "Follow the complete journey of your products from farm to your table with detailed supply chain information.",
    header: <Skeleton />,
    icon: <Package className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Quick Scan",
    description:
      "Instantly verify product details by entering product IDs.",
    header: <Skeleton />,
    icon: <Scan className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Recent Activity",
    description: "View your recent scanning activity and product interactions.",
    header: <Skeleton />,
    icon: <Clock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Quality Analytics",
    description:
      "Comprehensive analytics of your product quality trends, helping you make informed purchasing decisions.",
    header: <Skeleton />,
    icon: <BarChart3 className="h-4 w-4 text-neutral-500" />,
  },
];
