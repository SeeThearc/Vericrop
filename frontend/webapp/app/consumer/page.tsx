"use client";
import ProductSearchPage from "./product-search/page";
import QualityHistoryPage from "./quality-history/page";
import MyPurchasesPage from "./my-purchases/page";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";
import { motion } from "motion/react";
import { WelcomeBanner } from "@/components/consumer/welcome-banner";
import { BlockchainStats } from "@/components/consumer/blockchain-stats";

export default function ConsumerPage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallex.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      </div>

      {/* Background Beams */}
      <BackgroundBeams className="opacity-30" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <WelcomeBanner />

        {/* Product Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Product Traceability Lookup
            </h2>
            <p className="text-gray-300">
              Enter a Product ID or scan a QR code to access complete product
              traceability information from farm to table
            </p>
          </div>
          <ProductSearchPage />
        </motion.div>

        {/* Blockchain Statistics */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg">
          <BlockchainStats />
        </div>

        {/* My Purchases Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              My Purchase Journey
            </h2>
            <p className="text-gray-300">
              Track your orders and monitor product journeys from farm to
              table
            </p>
          </div>
          <MyPurchasesPage />
        </motion.div>

        {/* Quality History Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Quality Assurance Timeline
            </h2>
            <p className="text-gray-300">
              Review historical quality data and compliance records
            </p>
          </div>
          <QualityHistoryPage />
        </motion.div>
      </div>
    </div>
  );
}
