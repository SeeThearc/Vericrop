"use client";
import RegisterProductPage from "./register-product/page";
import TrackProductsPage from "./track-products/page";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { Package2, BarChart3, Plus } from "lucide-react";
import { FarmerWelcomeBanner } from "@/components/farmer/farmer-welcome-banner";
import { SalesChart } from "@/components/farmer/sales-chart";

const FarmerPage = () => {
  const [activeTab, setActiveTab] = useState("register");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2D5A3D] to-[#52B788] relative">
      {/* Texture Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FarmerWelcomeBanner />

        {/* Floating Navigation Tabs with Glass Morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
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
                  className="flex items-center gap-2 bg-white/20 data-[state=active]:bg-white data-[state=active]:text-[#1B4332] text-white border-0 rounded-xl transition-all duration-200 hover:bg-white/30"
                >
                  <Plus className="h-4 w-4" />
                  Register Product
                </TabsTrigger>
                <TabsTrigger
                  value="track"
                  className="flex items-center gap-2 bg-white/20 data-[state=active]:bg-white data-[state=active]:text-[#1B4332] text-white border-0 rounded-xl transition-all duration-200 hover:bg-white/30"
                >
                  <Package2 className="h-4 w-4" />
                  Track Products
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2 bg-white/20 data-[state=active]:bg-white data-[state=active]:text-[#1B4332] text-white border-0 rounded-xl transition-all duration-200 hover:bg-white/30"
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
                    <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
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
                    <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
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
                    <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
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
