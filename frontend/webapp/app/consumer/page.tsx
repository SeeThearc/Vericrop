"use client";
import { WelcomeBanner } from "./_components/welcome-banner";
import ProductSearchPage from "./product-search/page";
import QualityHistoryPage from "./quality-history/page";
import MyPurchasesPage from "./my-purchases/page";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "motion/react";

export default function ConsumerPage() {
  return (
    <>
      <WelcomeBanner />

      <div className="flex flex-col space-y-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <BackgroundGradient className="rounded-[22px] p-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <ProductSearchPage />
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
                <MyPurchasesPage />
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
                <QualityHistoryPage />
              </CardContent>
            </Card>
          </BackgroundGradient>
        </motion.div>
      </div>
    </>
  );
}
