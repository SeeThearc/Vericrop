"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { motion } from "motion/react";
import { Search, QrCode, Package } from "lucide-react";
import { ProductDetails } from "./product-details";

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

export const ProductLookup = () => {
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState("");

  // Mock data for demonstration - in real app this would come from blockchain/API
  const mockProductData: ProductData = {
    productId: "VC-2024-001-ABC123",
    productType: "Organic Roma Tomatoes",
    overallGrade: "A",
    currentStage: "Retail",
    currentState: "Available for Purchase",
    farmer: "Green Valley Farms",
    origin: "California Central Valley, USA",
    harvestDate: "2024-09-01",
    expirationDate: "2024-09-15",
    farmPrice: "$3.50/kg",
    initialQuantity: "500 kg",
    distributor: "FreshChain Distribution",
    distributorPrice: "$4.20/kg",
    dateReceivedByDistributor: "2024-09-02",
    dateVerifiedByDistributor: "2024-09-02",
    retailer: "WholeFoods Market #1234",
    retailPrice: "$5.99/kg",
    dateReceivedByRetailer: "2024-09-05",
    dateVerifiedByRetailer: "2024-09-05",
    qualityScore: 95,
    damageLevel: "Minimal (2%)",
    storageTemperature: "7°C",
    qualityAssessedOn: "2024-09-03",
    assessedBy: "Certified Inspector #INS-456",
    purchaseDate: "2024-09-10",
    quantityPurchased: "2.5 kg",
  };

  const handleLookup = async () => {
    if (!productId.trim()) {
      setError("Please enter a Product ID or scan a QR code");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, show mock data for any input
      setProductData(mockProductData);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setProductId("");
    setProductData(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl font-bold vericrop-text-dark">
              <Package className="h-6 w-6 text-vericrop-primary" />
              <span>Product Lookup</span>
            </CardTitle>
            <p className="vericrop-text-light">
              Enter a Product ID or scan a QR code to view complete product
              traceability information
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="productId"
                className="text-sm font-medium vericrop-text-dark"
              >
                Product ID or QR Code
              </Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    id="productId"
                    type="text"
                    placeholder="Enter Product ID (e.g., VC-2024-001-ABC123) or scan QR code"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="pr-10"
                    onKeyPress={(e) => e.key === "Enter" && handleLookup()}
                  />
                  <QrCode className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <Button
                  onClick={handleLookup}
                  disabled={isLoading}
                  className="vericrop-gradient-primary text-white border-0 hover:shadow-lg transition-all duration-250 px-6"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4" />
                      <span>Lookup</span>
                    </div>
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>

            {productData && (
              <div className="flex justify-end">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-vericrop-primary text-vericrop-primary hover:bg-vericrop-primary hover:text-white"
                >
                  Search Another Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {productData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductDetails productData={productData} />
        </motion.div>
      )}
    </div>
  );
};
