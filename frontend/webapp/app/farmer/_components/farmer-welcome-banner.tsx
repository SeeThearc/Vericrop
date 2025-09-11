"use client";
import { motion } from "motion/react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Sprout } from "lucide-react";

export const FarmerWelcomeBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <BackgroundGradient className="rounded-[22px] p-8 bg-white dark:bg-zinc-900">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-3 bg-green-100 dark:bg-green-900 rounded-full"
          >
            <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold text-green-800 dark:text-green-400"
            >
              Welcome, Dedicated Farmer!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-green-700 dark:text-green-300 mt-2 text-lg"
            >
              Manage your crops, register products, and track their journey
              through the supply chain.
            </motion.p>
          </div>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
};
