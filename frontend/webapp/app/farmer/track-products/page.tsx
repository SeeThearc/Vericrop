"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  MapPin,
  User,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    product: "Organic Tomatoes",
    status: "In Transit",
    location: "Distribution Hub A",
    lastHandler: "Green Harvest Logistics",
    inspectorVerified: true,
    transactions: 3,
    image: "/api/placeholder/100/100",
    harvestDate: "2024-01-15",
    quality: "Grade A",
    statusColor: "warning",
  },
  {
    id: 2,
    product: "Heritage Wheat",
    status: "Harvested",
    location: "Farm Plot 7B",
    lastHandler: "Farmer John",
    inspectorVerified: false,
    transactions: 1,
    image: "/api/placeholder/100/100",
    harvestDate: "2024-01-20",
    quality: "Grade A+",
    statusColor: "info",
  },
  {
    id: 3,
    product: "Sweet Potatoes",
    status: "Verified",
    location: "Retail Store #12",
    lastHandler: "Urban Groceries Inc.",
    inspectorVerified: true,
    transactions: 5,
    image: "/api/placeholder/100/100",
    harvestDate: "2024-01-10",
    quality: "Grade A",
    statusColor: "success",
  },
  {
    id: 4,
    product: "Bell Peppers",
    status: "Processing",
    location: "Packing Facility X",
    lastHandler: "AgriPack Solutions",
    inspectorVerified: true,
    transactions: 2,
    image: "/api/placeholder/100/100",
    harvestDate: "2024-01-18",
    quality: "Grade B+",
    statusColor: "info",
  },
  {
    id: 5,
    product: "Seasonal Berries",
    status: "Pending Pick-up",
    location: "Farm Storage Unit",
    lastHandler: "Farmer Jane",
    inspectorVerified: false,
    transactions: 0,
    image: "/api/placeholder/100/100",
    harvestDate: "2024-01-22",
    quality: "Grade A",
    statusColor: "warning",
  },
];

const getStatusConfig = (status: string, statusColor: string) => {
  const configs = {
    success: {
      bg: "bg-[#10B981]",
      text: "text-white",
      icon: CheckCircle,
    },
    warning: {
      bg: "bg-[#F59E0B]",
      text: "text-white",
      icon: Clock,
    },
    info: {
      bg: "bg-[#3B82F6]",
      text: "text-white",
      icon: Activity,
    },
    error: {
      bg: "bg-[#EF4444]",
      text: "text-white",
      icon: AlertCircle,
    },
  };

  return configs[statusColor as keyof typeof configs] || configs.info;
};

const TrackProductsPage = () => {
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
          <Package className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#374151] font-['Inter']">
            Track My Products
          </h1>
          <p className="text-[#374151] opacity-70 text-sm mt-1">
            Monitor your products throughout the supply chain
          </p>
        </div>
      </motion.div>

      {/* Desktop: 3-column grid, Tablet: 2-column, Mobile: 1-column */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const statusConfig = getStatusConfig(
            product.status,
            product.statusColor
          );
          const StatusIcon = statusConfig.icon;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="border-0 shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-6">
                  {/* Product Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                      <Package className="h-8 w-8 text-[#52B788]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#374151] text-lg font-['Inter'] truncate">
                        {product.product}
                      </h3>
                      <p className="text-sm text-[#374151] opacity-70 mt-1">
                        Quality: {product.quality}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <Badge
                      className={`${statusConfig.bg} ${statusConfig.text} px-3 py-1 text-xs font-medium rounded-full border-0 shadow-sm`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {product.status}
                    </Badge>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#374151]">
                      <MapPin className="h-4 w-4 text-[#52B788] flex-shrink-0" />
                      <span className="truncate">{product.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#374151]">
                      <User className="h-4 w-4 text-[#52B788] flex-shrink-0" />
                      <span className="truncate">{product.lastHandler}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-[#374151]">
                        <Activity className="h-4 w-4 text-[#52B788]" />
                        <span>{product.transactions} transactions</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {product.inspectorVerified ? (
                          <div className="flex items-center gap-1 text-[#10B981]">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-xs font-medium">
                              Verified
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-[#F59E0B]">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs font-medium">Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full h-10 border-[#E5E7EB] text-[#374151] hover:bg-[#22C55E] hover:text-white hover:border-[#22C55E] transition-all duration-200 rounded-xl group"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                    <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State for when no products exist */}
      {products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-[#374151] mb-2">
            No products found
          </h3>
          <p className="text-[#374151] opacity-70 mb-6">
            Start by registering your first agricultural product.
          </p>
          <Button className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-xl px-6">
            Register Product
          </Button>
        </motion.div>
      )}

      {/* Mobile: Horizontal scroll hint */}
      <div className="md:hidden mt-6 text-center">
        <p className="text-xs text-[#374151] opacity-60">
          Swipe horizontally to view more product cards
        </p>
      </div>
    </div>
  );
};

export default TrackProductsPage;
