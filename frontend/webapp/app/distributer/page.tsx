import VerifyProductsPage from "./verify-products/page";
import TransactionsPage from "./transactions/page";
import AnalyticsPage from "./analytics/page";
import PurchaseBatchPage from "./purchase-batch/page";
import RegisterProductPage from "./register-product/page";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";

const DistributerPage = () => {
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
            VeriCrop Distributor Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Premium Agricultural Technology Platform
          </p>
        </div>

        {/* Product Verification Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Product Verification & QR Scanning
            </h2>
            <p className="text-gray-300">
              Advanced ML-powered authentication and fraud detection
            </p>
          </div>
          <VerifyProductsPage />
        </div>

        {/* Product Registration Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Product Registration
            </h2>
            <p className="text-gray-300">
              Register new products in the supply chain network
            </p>
          </div>
          <RegisterProductPage />
        </div>

        {/* Batch Management Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Batch Management & Purchasing
            </h2>
            <p className="text-gray-300">
              Manage batch inventories and streamline procurement
            </p>
          </div>
          <PurchaseBatchPage />
        </div>

        {/* Transaction History Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Transaction History & Tracking
            </h2>
            <p className="text-gray-300">
              Complete supply chain transaction visibility
            </p>
          </div>
          <TransactionsPage />
        </div>

        {/* Analytics & Insights Section */}
        <div className="bg-white/10 backdrop-blur-xl p-8 my-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Analytics & Business Intelligence
            </h2>
            <p className="text-gray-300">
              Advanced data insights and performance metrics
            </p>
          </div>
          <AnalyticsPage />
        </div>
      </div>
    </div>
  );
};

export default DistributerPage;
