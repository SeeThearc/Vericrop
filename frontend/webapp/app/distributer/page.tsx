import VerifyProductsPage from "./verify-products/page";
import TransactionsPage from "./transactions/page";
import AnalyticsPage from "./analytics/page";
import PurchaseBatchPage from "./purchase-batch/page";
import RegisterProductPage from "./register-product/page";

const DistributerPage = () => {
  return (
    <div className="min-h-screen vericrop-gradient-forest-sage p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="vericrop-card-primary text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            VeriCrop Distributor Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Premium Agricultural Technology Platform
          </p>
        </div>

        {/* Product Verification Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Product Verification & QR Scanning
            </h2>
            <p className="text-gray-600">
              Advanced ML-powered authentication and fraud detection
            </p>
          </div>
          <VerifyProductsPage />
        </div>

        {/* Product Registration Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Product Registration
            </h2>
            <p className="text-gray-600">
              Register new products in the supply chain network
            </p>
          </div>
          <RegisterProductPage />
        </div>

        {/* Batch Management Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Batch Management & Purchasing
            </h2>
            <p className="text-gray-600">
              Manage batch inventories and streamline procurement
            </p>
          </div>
          <PurchaseBatchPage />
        </div>

        {/* Transaction History Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Transaction History & Tracking
            </h2>
            <p className="text-gray-600">
              Complete supply chain transaction visibility
            </p>
          </div>
          <TransactionsPage />
        </div>

        {/* Analytics & Insights Section */}
        <div className="vericrop-card-primary vericrop-hover-lift">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Analytics & Business Intelligence
            </h2>
            <p className="text-gray-600">
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
