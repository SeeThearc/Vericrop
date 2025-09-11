"use client";
import { motion } from "motion/react";
import { Sprout, MapPin, Users, TrendingUp } from "lucide-react";

export const FarmerWelcomeBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="bg-white rounded-2xl p-8 shadow-[0px_4px_16px_rgba(0,0,0,0.1)] border border-white/20 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="p-4 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-2xl shadow-lg"
            >
              <Sprout className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl lg:text-4xl font-semibold text-[#374151] font-['Inter'] mb-2"
              >
                Welcome back, John Farmer!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[#374151] text-lg font-['Inter'] opacity-80"
              >
                Manage your agricultural products and track their journey
                through the VeriCrop supply chain ecosystem.
              </motion.p>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-4 lg:flex-nowrap"
          >
            <div className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white p-4 rounded-xl min-w-[120px] shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Active Products</span>
              </div>
              <p className="text-2xl font-bold">24</p>
            </div>

            <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white p-4 rounded-xl min-w-[120px] shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Locations</span>
              </div>
              <p className="text-2xl font-bold">8</p>
            </div>

            <div className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white p-4 rounded-xl min-w-[120px] shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Handlers</span>
              </div>
              <p className="text-2xl font-bold">12</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
