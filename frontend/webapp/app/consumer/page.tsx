"use client";
import ProductSearchPage from "./product-search/page";
import QualityHistoryPage from "./quality-history/page";
import MyPurchasesPage from "./my-purchases/page";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { motion } from "motion/react";
import { WelcomeBanner } from "@/components/consumer/welcome-banner";
import { BlockchainStats } from "@/components/consumer/blockchain-stats";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ConsumerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative">
      {/* Background Beams */}
      <BackgroundBeams className="opacity-20" />

      <div className="relative z-10">
        <WelcomeBanner />

        <div className="space-y-12">
          {/* Product Search Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold vericrop-text-dark mb-2">
                Product Traceability Lookup
              </h2>
              <p className="vericrop-text-light">
                Enter a Product ID or scan a QR code to access complete product
                traceability information from farm to table
              </p>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm vericrop-card-shadow border-0 overflow-hidden">
              <CardContent className="p-8">
                <ProductSearchPage />
              </CardContent>
            </Card>
          </motion.section>

          {/* Blockchain Statistics */}
          <BlockchainStats />

          {/* My Purchases Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold vericrop-text-dark mb-2">
                My Purchase Journey
              </h2>
              <p className="vericrop-text-light">
                Track your orders and monitor product journeys from farm to
                table
              </p>
            </div>

            <MyPurchasesPage />
          </motion.section>

          {/* Quality History Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold vericrop-text-dark mb-2">
                Quality Assurance Timeline
              </h2>
              <p className="vericrop-text-light">
                Follow comprehensive quality checks throughout your
                product&apos;s journey
              </p>
            </div>

            <QualityHistoryPage />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
