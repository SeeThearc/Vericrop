import VerifyProductsPage from "./verify-products/page";
import TransactionsPage from "./transactions/page";
import AnalyticsPage from "./analytics/page";
import PurchaseBatchPage from "./purchase-batch/page";
import RegisterProductPage from "./register-product/page";
import { BackgroundBeams } from "@/components/ui/background-beams";

const RetailerPage = () => {
  return (
    <div className="min-h-screen vericrop-gradient-forest-sage p-6 relative">
      {/* Background Beams */}
      <BackgroundBeams className="opacity-25" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Welcome Header */}
        <div className="vericrop-card-primary text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VeriCrop Retailer Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Premium Agricultural Technology Platform for Retail Operations
          </p>
        </div>

        {/* Product Verification Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Product Verification & Quality Control
            </h2>
            <p className="text-gray-600">
              Advanced ML-powered authentication and quality assurance
            </p>
          </div>
          <VerifyProductsPage />
        </div>

        {/* Product Registration Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Inventory Registration
            </h2>
            <p className="text-gray-600">
              Register retail inventory and manage product listings
            </p>
          </div>
          <RegisterProductPage />
        </div>

        {/* Purchase Management Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Purchase Management & Orders
            </h2>
            <p className="text-gray-600">
              Streamlined procurement and batch ordering system
            </p>
          </div>
          <PurchaseBatchPage />
        </div>

        {/* Sales & Transaction History Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sales History & Customer Transactions
            </h2>
            <p className="text-gray-600">
              Complete retail transaction tracking and customer insights
            </p>
          </div>
          <TransactionsPage />
        </div>

        {/* Retail Analytics Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Retail Analytics & Performance
            </h2>
            <p className="text-gray-600">
              Sales insights, customer analytics, and business intelligence
            </p>
          </div>
          <AnalyticsPage />
        </div>
      </div>
    </div>
  );
};

export default RetailerPage;
