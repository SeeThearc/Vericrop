"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { motion } from "motion/react";
import {
  Package,
  MapPin,
  Thermometer,
  CheckCircle,
  User,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

interface ProductData {
  productId: string;
  productType: string;
  overallGrade: string;
  currentStage: string;
  currentState: string;
  farmer: string;
  origin: string;
  harvestDate: string;
  expirationDate: string;
  farmPrice: string;
  initialQuantity: string;
  distributor: string;
  distributorPrice: string;
  dateReceivedByDistributor: string;
  dateVerifiedByDistributor: string;
  retailer: string;
  retailPrice: string;
  dateReceivedByRetailer: string;
  dateVerifiedByRetailer: string;
  qualityScore: number;
  damageLevel: string;
  storageTemperature: string;
  qualityAssessedOn: string;
  assessedBy: string;
  purchaseDate: string;
  quantityPurchased: string;
}

interface ProductDetailsProps {
  productData: ProductData;
}

export const ProductDetails = ({ productData }: ProductDetailsProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case "A":
        return "bg-green-100 text-green-800 border-green-200";
      case "B":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "C":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "farm":
        return "bg-green-100 text-green-800 border-green-200";
      case "distribution":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "retail":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl font-bold vericrop-text-dark">
              <Package className="h-5 w-5 text-vericrop-primary" />
              <span>Product Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Product ID</p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.productId}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Product Type
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.productType}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Overall Grade
                </p>
                <Badge
                  className={`${getGradeColor(
                    productData.overallGrade
                  )} border`}
                >
                  Grade {productData.overallGrade}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Current Stage
                </p>
                <Badge
                  className={`${getStageColor(
                    productData.currentStage
                  )} border`}
                >
                  {productData.currentStage}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Current State
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.currentState}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Origin and Farming Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl font-bold vericrop-text-dark">
              <MapPin className="h-5 w-5 text-vericrop-primary" />
              <span>Origin and Farming Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Farmer</p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.farmer}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Origin</p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.origin}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Harvest Date
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.harvestDate}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Expiration Date
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.expirationDate}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Farm Price</p>
                <p className="font-semibold vericrop-text-success">
                  {productData.farmPrice}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Initial Quantity
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.initialQuantity}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Supply Chain Journey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl font-bold vericrop-text-dark">
              <TrendingUp className="h-5 w-5 text-vericrop-primary" />
              <span>Supply Chain Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Distributor Section */}
              <div className="border-l-4 border-blue-200 pl-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Distribution Stage
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Distributor
                    </p>
                    <p className="font-semibold vericrop-text-dark">
                      {productData.distributor}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Distributor Price
                    </p>
                    <p className="font-semibold vericrop-text-success">
                      {productData.distributorPrice}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Date Received
                    </p>
                    <p className="font-semibold vericrop-text-dark">
                      {productData.dateReceivedByDistributor}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Date Verified
                    </p>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="font-semibold vericrop-text-dark">
                        {productData.dateVerifiedByDistributor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retailer Section */}
              <div className="border-l-4 border-purple-200 pl-4">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Retail Stage
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Retailer
                    </p>
                    <p className="font-semibold vericrop-text-dark">
                      {productData.retailer}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Retail Price
                    </p>
                    <p className="font-semibold vericrop-text-success">
                      {productData.retailPrice}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Date Received
                    </p>
                    <p className="font-semibold vericrop-text-dark">
                      {productData.dateReceivedByRetailer}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      Date Verified
                    </p>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <p className="font-semibold vericrop-text-dark">
                        {productData.dateVerifiedByRetailer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quality and Condition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl font-bold vericrop-text-dark">
              <Shield className="h-5 w-5 text-vericrop-primary" />
              <span>Quality and Condition</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Quality Score
                </p>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-green-600">
                    {productData.qualityScore}
                  </div>
                  <span className="text-sm text-gray-500">/100</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Damage Level
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.damageLevel}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Storage Temperature
                </p>
                <div className="flex items-center space-x-1">
                  <Thermometer className="h-4 w-4 text-blue-600" />
                  <p className="font-semibold vericrop-text-dark">
                    {productData.storageTemperature}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Quality Assessed On
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.qualityAssessedOn}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Assessed By</p>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4 text-gray-600" />
                  <p className="font-semibold vericrop-text-dark">
                    {productData.assessedBy}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Consumer Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl font-bold vericrop-text-dark">
              <Clock className="h-5 w-5 text-vericrop-primary" />
              <span>Consumer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Purchase Date
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.purchaseDate}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">
                  Quantity Purchased
                </p>
                <p className="font-semibold vericrop-text-dark">
                  {productData.quantityPurchased}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
