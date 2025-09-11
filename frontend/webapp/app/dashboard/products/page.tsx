"use client";
import Link from "next/link";
import Nav from "../../components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-green-800">
      <Nav />
      <main className="p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 
              className="text-3xl font-bold text-[#1A4D2E] dark:text-[#B6E388]"
              style={{ fontFamily: 'var(--font-libre-baskerville)' }}
            >
              My Products & Batches
            </h1>
            <p className="text-[#4E3629] dark:text-[#F8F8F8]">
              Manage your crop inventory, track batches, and monitor supply chain data.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Product Card */}
            <Card className="border-[#B6E388] hover:shadow-lg transition-shadow dark:bg-[#1A4D2E] dark:border-[#64A833]">
              <CardHeader>
                <CardTitle className="text-[#1A4D2E] dark:text-[#B6E388] flex items-center gap-2">
                  🌾 Example Batch
                </CardTitle>
                <CardDescription className="text-[#4E3629] dark:text-[#F8F8F8]">
                  Organic Wheat - Batch #001
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#4E3629] dark:text-[#F8F8F8]">Status:</span>
                    <span className="text-[#64A833] dark:text-[#B6E388] font-semibold">Ready for Harvest</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4E3629] dark:text-[#F8F8F8]">Planted:</span>
                    <span className="text-[#4E3629] dark:text-[#F8F8F8]">March 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4E3629] dark:text-[#F8F8F8]">Expected Harvest:</span>
                    <span className="text-[#4E3629] dark:text-[#F8F8F8]">September 20, 2025</span>
                  </div>
                </div>
                <Link href="/dashboard/products/example-batch">
                  <Button className="w-full bg-[#64A833] hover:bg-[#1A4D2E] text-white">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Add New Product Card */}
            <Card className="border-dashed border-2 border-[#B6E388] hover:shadow-lg transition-shadow dark:border-[#64A833] dark:bg-[#1A4D2E]/50">
              <CardContent className="flex flex-col items-center justify-center h-full p-8 space-y-4">
                <div className="text-4xl text-[#64A833] dark:text-[#B6E388]">+</div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-[#1A4D2E] dark:text-[#B6E388]">Add New Batch</h3>
                  <p className="text-sm text-[#4E3629] dark:text-[#F8F8F8]">Create a new product batch for tracking</p>
                </div>
                <Button variant="outline" className="border-[#64A833] text-[#64A833] hover:bg-[#64A833] hover:text-white dark:border-[#B6E388] dark:text-[#B6E388] dark:hover:bg-[#B6E388] dark:hover:text-[#1A4D2E]">
                  Create Batch
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-[#B6E388] dark:bg-[#1A4D2E] dark:border-[#64A833]">
              <CardHeader>
                <CardTitle className="text-[#1A4D2E] dark:text-[#B6E388] flex items-center gap-2">
                  📊 Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#4E3629] dark:text-[#F8F8F8]">Active Batches:</span>
                  <span className="text-[#64A833] dark:text-[#B6E388] font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4E3629] dark:text-[#F8F8F8]">Ready to Harvest:</span>
                  <span className="text-[#F5F55D] dark:text-[#F5F55D] font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4E3629] dark:text-[#F8F8F8]">In Transit:</span>
                  <span className="text-[#64A833] dark:text-[#B6E388] font-bold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4E3629] dark:text-[#F8F8F8]">Delivered:</span>
                  <span className="text-[#64A833] dark:text-[#B6E388] font-bold">45</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-[#B6E388] dark:bg-[#1A4D2E] dark:border-[#64A833]">
            <CardHeader>
              <CardTitle className="text-[#1A4D2E] dark:text-[#B6E388]">Recent Activity</CardTitle>
              <CardDescription className="text-[#4E3629] dark:text-[#F8F8F8]">
                Latest updates from your product batches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#F8F8F8] dark:bg-[#4E3629] rounded-lg">
                  <div className="w-2 h-2 bg-[#64A833] dark:bg-[#B6E388] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-[#4E3629] dark:text-[#F8F8F8]">
                      <span className="font-semibold">Batch #001</span> status updated to &quot;Ready for Harvest&quot;
                    </p>
                    <p className="text-xs text-[#B0B0B0]">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#F8F8F8] dark:bg-[#4E3629] rounded-lg">
                  <div className="w-2 h-2 bg-[#F5F55D] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-[#4E3629] dark:text-[#F8F8F8]">
                      <span className="font-semibold">Batch #023</span> shipped to distributor
                    </p>
                    <p className="text-xs text-[#B0B0B0]">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
