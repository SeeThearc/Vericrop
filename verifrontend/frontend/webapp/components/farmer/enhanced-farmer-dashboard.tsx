"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { FarmerWelcomeBanner } from "./farmer-welcome-banner";
import { ActionToolbar } from "./action-toolbar";
import { UnifiedProductCard } from "./unified-product-card";
import { FarmerProfilePanel } from "./farmer-profile-panel";
import { SupplyChainStageTracker } from "./supply-chain-stage-tracker";
import { IPFSLinksCollection } from "./ipfs-integration";
import { BlockchainAnalyticsDashboard } from "./blockchain-analytics-dashboard";
import { Sprout, Scissors, Factory, Truck, Store } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/shadcn/ui/background-beams-with-collision";
import { Card, CardContent } from "@/components/shadcn/ui/card";

// Mock data - replace with actual data from your blockchain integration
const mockProductData = {
  id: "PROD001",
  productType: "Organic Tomatoes",
  overallGrade: "A+",
  creationDate: "2024-01-15",
  expirationDate: "2024-01-25",
  origin: "Farm Valley A1",
  qualityGrade: "A+",
  farmPrice: 12.5,
  currentMarketPrice: 15.75,
  initialQuantity: 1000,
  currentQuantity: 750,
  currentStage: "Processing",
  currentStatus: "In-Transit",
  handlerName: "John Processing Co.",
  location: "Processing Plant B",
  transactionCount: 8,
  verificationStatus: "verified" as const,
  ipfsHash: "QmX4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
  stageProgress: [
    {
      stage: "Farm",
      completed: true,
      timestamp: "2024-01-15",
      handler: "John Farmer",
    },
    {
      stage: "Harvest",
      completed: true,
      timestamp: "2024-01-18",
      handler: "Harvest Team",
    },
    { stage: "Processing", completed: false },
    { stage: "Distribution", completed: false },
    { stage: "Retail", completed: false },
  ],
};

// Separate data structure for supply chain tracker
const mockSupplyChainStages = [
  {
    id: "farm",
    name: "Farm",
    icon: Sprout,
    status: "completed" as const,
    timestamp: "2024-01-15",
    handler: "John Farmer",
    transactionHash: "0xabc123",
  },
  {
    id: "harvest",
    name: "Harvest",
    icon: Scissors,
    status: "completed" as const,
    timestamp: "2024-01-18",
    handler: "Harvest Team",
    transactionHash: "0xdef456",
  },
  {
    id: "processing",
    name: "Processing",
    icon: Factory,
    status: "current" as const,
  },
  {
    id: "distribution",
    name: "Distribution",
    icon: Truck,
    status: "pending" as const,
  },
  {
    id: "retail",
    name: "Retail",
    icon: Store,
    status: "pending" as const,
  },
];

const mockFarmerData = {
  id: "FARMER001",
  name: "John Farmer",
  profilePhoto: "",
  reputationScore: 4.8,
  walletAddress:
    "0x742d35cc8f3f4f8c9b8e4a2f1d3e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f49a2b",
  registeredAt: "2023-08-15",
  ipfsDetailsHash:
    "QmY5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i",
  location: "California Valley",
  farmSize: "150 acres",
  certifications: ["Organic", "Non-GMO", "Fair Trade"],
  totalProducts: 47,
  completedTransactions: 156,
  averageRating: 4.7,
};

const mockIPFSLinks = [
  {
    id: "1",
    hash: "QmX4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    label: "Product Certificate",
    type: "document" as const,
    size: 2048576,
    description: "Organic certification and quality assessment report",
  },
  {
    id: "2",
    hash: "QmA1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j",
    label: "Farm Photos",
    type: "image" as const,
    size: 5242880,
    description: "High-resolution images of the farming process",
  },
  {
    id: "3",
    hash: "QmZ9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4p",
    label: "Quality Test Results",
    type: "json" as const,
    size: 1024000,
    description: "Detailed laboratory analysis and quality metrics",
  },
];

const mockAnalyticsData = {
  lifecycleDurations: {
    averageFarmDuration: 45,
    averageProcessingDuration: 12,
    averageDistributionDuration: 8,
    averageTotalDuration: 65,
  },
  transactionVolume: {
    totalTransactions: 156,
    totalGasUsed: 15600000,
    averageGasPrice: 25,
    monthlyData: [
      { month: "Jul", transactions: 18, gasUsed: 1800000 },
      { month: "Aug", transactions: 22, gasUsed: 2200000 },
      { month: "Sep", transactions: 28, gasUsed: 2800000 },
      { month: "Oct", transactions: 25, gasUsed: 2500000 },
      { month: "Nov", transactions: 31, gasUsed: 3100000 },
      { month: "Dec", transactions: 32, gasUsed: 3200000 },
    ],
  },
  gradeDistribution: [
    { grade: "A+", count: 15, percentage: 32 },
    { grade: "A", count: 18, percentage: 38 },
    { grade: "B+", count: 10, percentage: 21 },
    { grade: "B", count: 3, percentage: 6 },
    { grade: "C", count: 1, percentage: 2 },
  ],
  reputationTrend: [
    { date: "Jul", score: 4.2, transactions: 18 },
    { date: "Aug", score: 4.4, transactions: 22 },
    { date: "Sep", score: 4.5, transactions: 28 },
    { date: "Oct", score: 4.6, transactions: 25 },
    { date: "Nov", score: 4.7, transactions: 31 },
    { date: "Dec", score: 4.8, transactions: 32 },
  ],
  ipfsActivity: {
    totalUploads: 89,
    totalSize: 268435456, // 256 MB
    monthlyUploads: [
      { month: "Jul", uploads: 12, size: 36700160 },
      { month: "Aug", uploads: 15, size: 45875200 },
      { month: "Sep", uploads: 18, size: 55050240 },
      { month: "Oct", uploads: 14, size: 42810880 },
      { month: "Nov", uploads: 16, size: 48934912 },
      { month: "Dec", uploads: 14, size: 42810880 },
    ],
  },
};

export const EnhancedFarmerDashboard = () => {
  const [profilePanelOpen, setProfilePanelOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<"products" | "analytics">(
    "products"
  );

  const handleProductView = (productId: string) => {
    console.log("Viewing product:", productId);
  };

  const handleProductTransfer = (productId: string) => {
    console.log("Transferring product:", productId);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background with beams for hero section */}
      <div className="relative mb-8">
        <BackgroundBeamsWithCollision className="h-64 md:h-80">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-20 relative px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              VeriCrop
              <span className="block text-2xl md:text-3xl text-gray-600 font-normal mt-2">
                Blockchain Agriculture Platform
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Track, verify, and manage your agricultural products with complete
              transparency
            </p>
          </motion.div>
        </BackgroundBeamsWithCollision>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner with Enhanced Metrics */}
        <FarmerWelcomeBanner />

        {/* Action Toolbar */}
        <ActionToolbar
          isRegistered={true}
          pendingTransactions={3}
          onCreateProduct={() => console.log("Create product")}
          onUploadIPFS={() => console.log("Upload IPFS")}
          onTransferProduct={() => console.log("Transfer product")}
          onViewExplorer={() => console.log("View explorer")}
        />

        {/* View Toggle */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedView("products")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedView === "products"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Products & Supply Chain
              </button>
              <button
                onClick={() => setSelectedView("analytics")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedView === "analytics"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Blockchain Analytics
              </button>
            </div>
          </CardContent>
        </Card>

        {selectedView === "products" ? (
          <div className="space-y-8">
            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <UnifiedProductCard
                product={mockProductData}
                onViewDetails={handleProductView}
                onTransfer={handleProductTransfer}
              />
              <UnifiedProductCard
                product={{
                  ...mockProductData,
                  id: "PROD002",
                  productType: "Organic Lettuce",
                  overallGrade: "A",
                }}
                onViewDetails={handleProductView}
                onTransfer={handleProductTransfer}
              />
              <UnifiedProductCard
                product={{
                  ...mockProductData,
                  id: "PROD003",
                  productType: "Heirloom Carrots",
                  overallGrade: "B+",
                }}
                onViewDetails={handleProductView}
                onTransfer={handleProductTransfer}
              />
            </div>

            {/* Supply Chain Tracker */}
            <SupplyChainStageTracker
              productId={mockProductData.id}
              stages={mockSupplyChainStages}
              onStageClick={(stageId) => console.log("Stage clicked:", stageId)}
            />

            {/* IPFS Documents */}
            <IPFSLinksCollection
              title="Product Documentation"
              links={mockIPFSLinks}
              maxVisible={3}
            />
          </div>
        ) : (
          /* Analytics Dashboard */
          <BlockchainAnalyticsDashboard data={mockAnalyticsData} />
        )}
      </div>

      {/* Farmer Profile Panel */}
      <FarmerProfilePanel
        isOpen={profilePanelOpen}
        onToggle={() => setProfilePanelOpen(!profilePanelOpen)}
        farmerData={mockFarmerData}
      />
    </div>
  );
};
