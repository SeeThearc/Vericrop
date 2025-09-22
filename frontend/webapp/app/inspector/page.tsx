"use client";
import CompliancePage from "./compliance/page";
import FlaggedShipmentsPage from "./flagged-shipments/page";
import QualityVerificationPage from "./quality-verification/page";
import { motion } from "motion/react";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";

const InspectorPage = () => {
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
      <BackgroundBeams className="fixed inset-0 z-5" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md text-center p-8 rounded-2xl border border-white/20 shadow-lg"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              VeriCrop Inspector Dashboard
            </h1>
            <p className="text-lg text-gray-300">
              Quality Assurance & Compliance Monitoring Platform
            </p>
          </motion.div>

          {/* Flagged Shipments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg"
          >
            <FlaggedShipmentsPage />
          </motion.div>

          {/* Quality Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg"
          >
            <QualityVerificationPage />
          </motion.div>

          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-lg"
          >
            <CompliancePage />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InspectorPage;
