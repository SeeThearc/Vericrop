import VerifyProductsPage from "./verify-products/page";
import TransactionsPage from "./transactions/page";
import AnalyticsPage from "./analytics/page";
import PurchaseBatchPage from "./purchase-batch/page";
import RegisterProductPage from "./register-product/page";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";

const RetailerPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
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
        {/* Welcome Header */}
        <div className="bg-white/10 backdrop-blur-xl text-center p-8 rounded-2xl border border-white/20 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">
            VeriCrop Retailer Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Premium Agricultural Technology Platform for Retail Operations
          </p>
        </div>

        {/* Product Verification Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Product Verification & Quality Control
            </h2>
            <p className="text-gray-300">
              Advanced ML-powered authentication and quality assurance
            </p>
          </div>
          <VerifyProductsPage />
        </div>

        {/* Product Registration Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Inventory Registration
            </h2>
            <p className="text-gray-300">
              Register retail inventory and manage product listings
            </p>
          </div>
          <RegisterProductPage />
        </div>

        {/* Purchase Management Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Purchase Management & Orders
            </h2>
            <p className="text-gray-300">
              Streamlined procurement and batch ordering system
            </p>
          </div>
          <PurchaseBatchPage />
        </div>

        {/* Sales & Transaction History Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Sales History & Customer Transactions
            </h2>
            <p className="text-gray-300">
              Complete retail transaction tracking and customer insights
            </p>
          </div>
          <TransactionsPage />
        </div>

        {/* Retail Analytics Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Retail Analytics & Performance
            </h2>
            <p className="text-gray-300">
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
