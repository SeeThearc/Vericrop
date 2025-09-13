"use client";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Package,
  Star,
  User,
  Store,
  Link,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Copy,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface ProductData {
  id: string;
  productType: string;
  overallGrade: string;
  creationDate: string;
  expirationDate: string;
  origin: string;
  qualityGrade: string;
  farmPrice: number;
  currentMarketPrice: number;
  initialQuantity: number;
  currentQuantity: number;
  currentStage: string;
  currentStatus: string;
  handlerName: string;
  location: string;
  transactionCount: number;
  verificationStatus: "verified" | "pending" | "failed";
  ipfsHash: string;
  stageProgress: {
    stage: string;
    completed: boolean;
    timestamp?: string;
    handler?: string;
  }[];
}

interface UnifiedProductCardProps {
  product: ProductData;
  onViewDetails?: (productId: string) => void;
  onTransfer?: (productId: string) => void;
}

export const UnifiedProductCard = ({
  product,
  onViewDetails,
  onTransfer,
}: UnifiedProductCardProps) => {
  const [ipfsCopied, setIpfsCopied] = useState(false);

  const copyIPFSHash = () => {
    navigator.clipboard.writeText(product.ipfsHash);
    setIpfsCopied(true);
    setTimeout(() => setIpfsCopied(false), 2000);
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-500";
      case "A":
        return "bg-green-400";
      case "B+":
        return "bg-yellow-500";
      case "B":
        return "bg-yellow-400";
      case "C":
        return "bg-orange-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "delivered":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVerificationIcon = () => {
    switch (product.verificationStatus) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <Clock className="h-4 w-4 text-red-500" />;
    }
  };

  const quantityProgress =
    (product.currentQuantity / product.initialQuantity) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full border-0 shadow-lg bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  #{product.id}
                </span>
                <Badge
                  className={`${getGradeBadgeColor(
                    product.overallGrade
                  )} text-white border-0`}
                >
                  {product.overallGrade}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {product.productType}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails?.(product.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Subheader Row */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{product.creationDate}</span>
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <Calendar className="h-4 w-4" />
                <span>{product.expirationDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>{product.origin}</span>
            </div>
          </div>

          {/* Main Body */}
          <div className="space-y-4 mb-4">
            {/* Quality and Pricing */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Quality Grade
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {product.qualityGrade}
                </p>
                <span className="text-xs text-gray-500">AI Assessment</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Pricing
                  </span>
                  {product.currentMarketPrice > product.farmPrice ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    ${product.farmPrice}
                  </span>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                  <span className="text-lg font-bold text-gray-900">
                    ${product.currentMarketPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Quantity Remaining</span>
                <span className="font-medium">
                  {product.currentQuantity}/{product.initialQuantity} units
                </span>
              </div>
              <Progress value={quantityProgress} className="h-2" />
            </div>

            {/* Stage Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Supply Chain Progress</span>
                <span className="font-medium">{product.currentStage}</span>
              </div>
              <div className="flex items-center gap-1">
                {product.stageProgress.map((stage, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-2 rounded-full ${
                      stage.completed ? "bg-green-500" : "bg-gray-200"
                    }`}
                    title={stage.stage}
                  />
                ))}
              </div>
            </div>

            {/* Current Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Status:</span>
              <Badge
                variant="outline"
                className={`${getStatusColor(product.currentStatus)} text-xs`}
              >
                {product.currentStatus}
              </Badge>
            </div>
          </div>

          {/* Footer Row */}
          <div className="border-t pt-4 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate">{product.handlerName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Store className="h-3 w-3" />
                <span className="truncate">{product.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                <span>{product.transactionCount} Txns</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getVerificationIcon()}
                <span className="text-xs text-gray-600">
                  {product.verificationStatus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Link className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-mono text-blue-600">
                    {product.ipfsHash.slice(0, 8)}...
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyIPFSHash}
                    className="h-4 w-4 p-0 hover:bg-gray-100"
                  >
                    <Copy className="h-2 w-2" />
                  </Button>
                  {ipfsCopied && (
                    <span className="text-xs text-green-600">✓</span>
                  )}
                </div>

                <Button
                  size="sm"
                  onClick={() => onTransfer?.(product.id)}
                  className="h-6 text-xs px-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
