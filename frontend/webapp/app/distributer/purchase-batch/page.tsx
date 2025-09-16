import { FeaturedBatches } from "@/components/distributor/featured-batches";
import { FilterBatches } from "@/components/filter-batches";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { ShoppingCart, Search, Filter } from "lucide-react";

const PurchaseBatchPage = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Batch Management & Purchasing</h1>
        <p className="text-gray-300">Discover, filter, and purchase premium agricultural batches</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="vericrop-card-secondary">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label className="text-gray-700 text-sm font-medium mb-2 block">Search Batches</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by product name, farmer, or batch ID..."
                className="vericrop-input pl-10"
              />
            </div>
          </div>
          <Button className="vericrop-btn-primary flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <div className="vericrop-card-primary">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Batches</h3>
            <FilterBatches />
          </div>
        </div>

        {/* Featured Batches */}
        <div className="lg:col-span-3">
          <div className="vericrop-card-primary">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Available Batches</h3>
                <p className="text-gray-600">Premium agricultural products ready for purchase</p>
              </div>
              <Button className="vericrop-btn-secondary flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                View Cart (0)
              </Button>
            </div>
            <FeaturedBatches />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="vericrop-card-secondary text-center">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Available Batches</h4>
          <div className="text-2xl font-bold vericrop-text-primary">247</div>
          <p className="text-sm text-gray-600">Ready for purchase</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Verified Suppliers</h4>
          <div className="text-2xl font-bold vericrop-text-primary">89</div>
          <p className="text-sm text-gray-600">Trusted partners</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Avg. Delivery Time</h4>
          <div className="text-2xl font-bold vericrop-text-primary">2.3 days</div>
          <p className="text-sm text-gray-600">Fast processing</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBatchPage;
