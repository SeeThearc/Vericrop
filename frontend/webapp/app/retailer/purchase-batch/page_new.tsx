import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterBatches } from "../_components/filter-batches";
import { FeaturedBatches } from "../_components/featured-batches";
import { ShoppingCart, Search, Filter, Store } from "lucide-react";

const PurchaseBatchPage = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Retail Inventory & Purchasing
        </h1>
        <p className="text-gray-600">
          Source premium agricultural products for your retail operations
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="vericrop-card-secondary">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Label className="text-gray-700 text-sm font-medium mb-2 block">
              Search Products
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by product name, category, or supplier..."
                className="vericrop-input pl-10"
              />
            </div>
          </div>
          <Button className="vericrop-btn-primary flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Retail Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <div className="vericrop-card-primary">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Filter Products
            </h3>
            <FilterBatches />
          </div>
        </div>

        {/* Featured Products */}
        <div className="lg:col-span-3">
          <div className="vericrop-card-primary">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Available Products
                </h3>
                <p className="text-gray-600">
                  Quality agricultural products for retail distribution
                </p>
              </div>
              <Button className="vericrop-btn-secondary flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart (0 items)
              </Button>
            </div>
            <FeaturedBatches />
          </div>
        </div>
      </div>

      {/* Retail Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="vericrop-card-secondary text-center">
          <Store className="h-8 w-8 vericrop-text-primary mx-auto mb-2" />
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Available Products
          </h4>
          <div className="text-2xl font-bold vericrop-text-primary">312</div>
          <p className="text-sm text-gray-600">In stock</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Trusted Suppliers
          </h4>
          <div className="text-2xl font-bold vericrop-text-primary">67</div>
          <p className="text-sm text-gray-600">Verified partners</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Avg. Margin
          </h4>
          <div className="text-2xl font-bold vericrop-text-primary">34.2%</div>
          <p className="text-sm text-gray-600">Profit potential</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Restock Time
          </h4>
          <div className="text-2xl font-bold vericrop-text-primary">
            1.8 days
          </div>
          <p className="text-sm text-gray-600">Fast replenishment</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBatchPage;
