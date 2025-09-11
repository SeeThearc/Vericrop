"use client";
import { motion } from "motion/react";
import { Leaf, Sparkles } from "lucide-react";

export const WelcomeBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white vericrop-card-shadow">
        {/* Background gradient with texture */}
        <div className="absolute inset-0 vericrop-gradient-forest-sage opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />

        <div className="relative p-8 lg:p-12">
          <div className="flex items-center space-x-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                duration: 0.8,
              }}
              className="relative"
            >
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </motion.div>
            </motion.div>

            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl lg:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "Inter, system-ui" }}
              >
                Welcome to Your Food Journey
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-white/90 text-lg font-medium"
              >
                Discover the true journey and quality of your food, from farm to
                fork.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white/70 text-base mt-1"
              >
                Track, verify, and trust every step of your food&apos;s journey
                with VeriCrop&apos;s premium traceability.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
