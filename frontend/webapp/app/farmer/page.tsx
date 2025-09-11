"use client";
import RegisterProductPage from "./register-product/page";
import TrackProductsPage from "./track-products/page";
import { SalesChart } from "./_components/sales-chart";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "motion/react";
import { FarmerWelcomeBanner } from "./_components/farmer-welcome-banner";

const FarmerPage = () => {
  return (
    <>
      <FarmerWelcomeBanner />
      
      <div className="flex flex-col space-y-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <BackgroundGradient className="rounded-[22px] p-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <RegisterProductPage />
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <BackgroundGradient className="rounded-[22px] p-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <TrackProductsPage />
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <BackgroundGradient className="rounded-[22px] p-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <SalesChart />
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.div>
      </div>
    </>
  );
};

export default FarmerPage;
