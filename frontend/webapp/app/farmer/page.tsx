"use client";
import RegisterProductPage from "./register-product/page";
import TrackProductsPage from "./track-products/page";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { Package2, BarChart3, Plus } from "lucide-react";
import { FarmerWelcomeBanner } from "@/components/farmer/farmer-welcome-banner";
import { SalesChart } from "@/components/farmer/sales-chart";
import { BackgroundBeams } from "@/components/ui/background-beams";

const FarmerPage = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Single Blur */}
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
        <FarmerWelcomeBanner />

        {/* Floating Navigation Tabs with Glass Morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl p-2 shadow-lg border border-white/20"
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-2 shadow-lg border border-white/20">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-transparent gap-2">
                <TabsTrigger
                  value="register"
                  className="flex items-center gap-2 bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 border-0 rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  <Plus className="h-4 w-4" />
                  Register Product
                </TabsTrigger>
                <TabsTrigger
                  value="track"
                  className="flex items-center gap-2 bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 border-0 rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  <Package2 className="h-4 w-4" />
                  Track Products
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2 bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 border-0 rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="register" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <RegisterProductPage />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="track" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <TrackProductsPage />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <SalesChart />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerPage;
