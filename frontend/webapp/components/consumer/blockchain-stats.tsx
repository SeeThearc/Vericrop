"use client";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { motion } from "motion/react";
import {
  Truck,
  Shield,
  Users,
  CheckCircle,
  BarChart3,
  Globe,
} from "lucide-react";

const blockchainStats = [
  {
    title: "Products Verified",
    value: "2,847",
    change: "+12%",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "Blockchain verified products",
  },
  {
    title: "Supply Chain Partners",
    value: "156",
    change: "+8%",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Trusted farmers & distributors",
  },
  {
    title: "Quality Score Avg",
    value: "87.5",
    change: "+5%",
    icon: BarChart3,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Average quality rating",
  },
  {
    title: "Countries Sourced",
    value: "24",
    change: "+3%",
    icon: Globe,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "Global sourcing network",
  },
  {
    title: "Transactions Recorded",
    value: "18,920",
    change: "+24%",
    icon: Truck,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    description: "Blockchain transactions",
  },
  {
    title: "Certifications",
    value: "1,284",
    change: "+15%",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Quality certifications",
  },
];

export const BlockchainStats = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mb-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold vericrop-text-dark mb-2">
          Transparency & Trust
        </h2>
        <p className="vericrop-text-light text-base">
          Real-time blockchain statistics showcasing our commitment to quality
          and transparency
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blockchainStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full bg-white vericrop-card-shadow vericrop-hover-scale border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold vericrop-text-dark">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {stat.change} this month
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold vericrop-text-dark mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-sm vericrop-text-light">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
