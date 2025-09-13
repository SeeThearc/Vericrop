"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Thermometer,
  User,
  Truck,
  Store,
  Shield,
  BarChart3,
  Clock,
  CheckCircle,
  QrCode,
  ExternalLink,
  Star,
} from "lucide-react";
import Image from "next/image";

interface EnhancedProductCardProps {
  product: {
    id: number;
    name: string;
    location: string;
    status: string;
    productState: string;
    price: string;
    rating: number;
    image: string;
    certification: string;
    description: string;
    currentStage: string;
    overallGrade: string;
    qualityScore: number;
    temperature: number;
    farmer: string;
    distributor: string;
    retailer: string;
    expiresAt: string;
    traceabilityId: string;
  };
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const EnhancedProductCard = ({
  product,
  isExpanded,
  onToggle,
}: EnhancedProductCardProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-emerald-500 text-white";
      case "B":
        return "bg-blue-500 text-white";
      case "C":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-green-100 text-green-700 border-green-200";
      case "RECEIVED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "PENDING_PICKUP":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStageDisplay = (stage: string) => {
    switch (stage) {
      case "FARM":
        return "🌱 Farm";
      case "DISTRIBUTION":
        return "🚛 Distribution";
      case "RETAIL":
        return "🏪 Retail";
      default:
        return stage;
    }
  };

  const blockchainJourney = [
    {
      stage: "FARM",
      title: "Farm Production",
      actor: product.farmer,
      icon: User,
      date: "2025-08-15",
      status: "COMPLETED",
      details: "Product harvested and initial quality assessment completed",
    },
    {
      stage: "DISTRIBUTION",
      title: "Distribution Center",
      actor: product.distributor,
      icon: Truck,
      date: "2025-08-20",
      status: "COMPLETED",
      details: "Quality verification and packaging completed",
    },
    {
      stage: "RETAIL",
      title: "Retail Store",
      actor: product.retailer,
      icon: Store,
      date: "2025-08-25",
      status: "CURRENT",
      details: "Available for purchase with full traceability",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className="bg-white vericrop-card-shadow vericrop-hover-scale border-0 overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge
                className={`${getStatusColor(
                  product.status
                )} font-medium px-2 py-1`}
              >
                {product.status}
              </Badge>
              <Badge
                className={`${getGradeColor(
                  product.overallGrade
                )} font-medium px-2 py-1`}
              >
                Grade {product.overallGrade}
              </Badge>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-semibold text-gray-700">
                {product.rating}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs font-mono">
              ID: {product.traceabilityId}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-semibold vericrop-text-dark mb-1 group-hover:vericrop-text-primary transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-sm vericrop-text-light mb-2">
                {product.description}
              </p>
              <div className="flex items-center space-x-1 text-sm vericrop-text-light mb-2">
                <MapPin className="h-3 w-3" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1">
                  <Thermometer className="h-3 w-3 text-blue-500" />
                  <span>{product.temperature}°C</span>
                </span>
                <span className="text-gray-500">
                  Score: {product.qualityScore}/100
                </span>
              </div>
            </div>

            {/* Quick Journey Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs font-semibold text-gray-600 mb-2">
                Supply Chain Journey
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Stage:</span>
                  <span className="font-medium">
                    {getStageDisplay(product.currentStage)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Farmer:</span>
                  <span className="font-medium text-green-600">
                    {product.farmer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expires:</span>
                  <span className="font-medium text-orange-600">
                    {product.expiresAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mb-4"
              >
                {/* Detailed Blockchain Journey */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm mb-3 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 vericrop-text-primary" />
                    Detailed Journey
                  </h4>
                  <div className="space-y-3">
                    {blockchainJourney.map((step, index) => (
                      <div
                        key={step.stage}
                        className="flex items-start space-x-3"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            step.status === "COMPLETED"
                              ? "bg-green-100"
                              : step.status === "CURRENT"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <step.icon
                            className={`h-3 w-3 ${
                              step.status === "COMPLETED"
                                ? "text-green-600"
                                : step.status === "CURRENT"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-sm vericrop-text-dark">
                              {step.title}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {step.date}
                            </span>
                          </div>
                          <p className="text-xs vericrop-text-light mb-1">
                            {step.details}
                          </p>
                          <p className="text-xs font-medium vericrop-text-primary">
                            {step.actor}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Score Details */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm mb-3">
                    Quality Assessment
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Score</span>
                      <span className="font-semibold">
                        {product.qualityScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${product.qualityScore}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs mt-3">
                      <div>
                        <span className="text-gray-500">
                          Temperature Control:
                        </span>
                        <div className="font-medium">Optimal</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Handling:</span>
                        <div className="font-medium">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 vericrop-text-success" />
                <span className="text-xs font-medium vericrop-text-success">
                  {product.certification}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold vericrop-text-success">
                  {product.price}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={onToggle}
                variant={isExpanded ? "outline" : "default"}
                className={
                  isExpanded
                    ? ""
                    : "flex-1 vericrop-gradient-primary text-white border-0 hover:shadow-lg transition-all duration-250"
                }
                size="sm"
              >
                {isExpanded ? (
                  "Show Less"
                ) : (
                  <>
                    <Truck className="h-4 w-4 mr-2" />
                    View Journey
                  </>
                )}
              </Button>
              {!isExpanded && (
                <Button variant="outline" size="sm" className="px-3">
                  <QrCode className="h-4 w-4" />
                </Button>
              )}
              {isExpanded && (
                <>
                  <Button variant="outline" size="sm" className="px-3">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Full Details
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
