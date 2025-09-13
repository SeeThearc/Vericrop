"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  CheckCircle,
  Clock,
  MapPin,
  Eye,
  Star,
  ShoppingBag,
} from "lucide-react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/dynamic-map"), {
  ssr: false,
  loading: () => (
    <div className="vericrop-card-secondary h-64 flex items-center justify-center">
      Loading map...
    </div>
  ),
});

const customerTransactions = [
  {
    id: "RTX001",
    product: "Organic Wheat Flour",
    customer: "Sarah Johnson",
    distributor: "Green Acres Dist.",
    amount: 45.99,
    status: "Delivered",
    date: "2025-09-10",
    location: "Store Pickup",
    quantity: "2 kg",
    rating: 5,
    feedback: "Excellent quality!",
  },
  {
    id: "RTX002",
    product: "Premium Corn Oil",
    customer: "Mike Chen",
    distributor: "Sun Harvest Co.",
    amount: 28.5,
    status: "Processing",
    date: "2025-09-09",
    location: "In Store",
    quantity: "1 L",
    rating: null,
    feedback: null,
  },
  {
    id: "RTX003",
    product: "Fresh Tomato Sauce",
    customer: "Emily Davis",
    distributor: "Fieldstone Organics",
    amount: 12.75,
    status: "Completed",
    date: "2025-09-08",
    location: "Store Pickup",
    quantity: "500 ml",
    rating: 4,
    feedback: "Good taste, will buy again",
  },
  {
    id: "RTX004",
    product: "Soybean Protein Powder",
    customer: "Alex Rodriguez",
    distributor: "Rural Roots",
    amount: 89.99,
    status: "Ready for Pickup",
    date: "2025-09-07",
    location: "Customer Service",
    quantity: "1 kg",
    rating: null,
    feedback: null,
  },
  {
    id: "RTX005",
    product: "Durum Pasta",
    customer: "Lisa Thompson",
    distributor: "Grainbelt Farms",
    amount: 15.25,
    status: "Delivered",
    date: "2025-09-06",
    location: "Store Pickup",
    quantity: "3 boxes",
    rating: 5,
    feedback: "Perfect texture and quality",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return {
          icon: CheckCircle,
          color: "vericrop-badge-verified",
          text: status,
        };
      case "processing":
        return {
          icon: Clock,
          color: "vericrop-badge-pending",
          text: status,
        };
      case "ready for pickup":
        return {
          icon: ShoppingBag,
          color: "vericrop-badge-info",
          text: status,
        };
      default:
        return {
          icon: Clock,
          color: "vericrop-badge-info",
          text: status,
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div className={`${config.color} flex items-center gap-1`}>
      <IconComponent className="h-3 w-3" />
      {config.text}
    </div>
  );
};

const CustomerRating = ({ rating }: { rating: number | null }) => {
  if (!rating) return <span className="text-sm text-gray-400">No rating</span>;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );
};

const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Customer Transaction History
        </h1>
        <p className="text-gray-600">
          Complete retail transaction tracking and customer satisfaction metrics
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Daily Sales
          </h3>
          <div className="text-3xl font-bold vericrop-text-primary">$1,247</div>
          <p className="text-sm text-green-600">+15% vs yesterday</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Customers Served
          </h3>
          <div className="text-3xl font-bold vericrop-text-primary">89</div>
          <p className="text-sm text-green-600">+12% vs yesterday</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Avg. Rating
          </h3>
          <div className="text-3xl font-bold vericrop-text-primary">4.7</div>
          <p className="text-sm text-green-600">Customer satisfaction</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Products Sold
          </h3>
          <div className="text-3xl font-bold vericrop-text-primary">156</div>
          <p className="text-sm text-blue-600">Items today</p>
        </div>
      </div>

      {/* Store Locator Map */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Store Location & Delivery Areas
          </h3>
          <p className="text-gray-600">
            Interactive map showing store location and customer delivery zones
          </p>
        </div>
        <div className="h-64 rounded-lg overflow-hidden">
          <DynamicMap />
        </div>
      </div>

      {/* Customer Transaction Cards */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Recent Customer Transactions
          </h3>
          <p className="text-gray-600">
            Latest sales activities, customer feedback, and satisfaction ratings
          </p>
        </div>

        <div className="space-y-4">
          {customerTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="vericrop-card-secondary vericrop-hover-lift"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-gray-900">
                      {transaction.id}
                    </span>
                    <StatusBadge status={transaction.status} />
                  </div>

                  <h4 className="font-medium text-gray-900 text-lg mb-2">
                    {transaction.product}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Customer:</span>{" "}
                        {transaction.customer}
                      </p>
                      <p>
                        <span className="font-medium">Distributor:</span>{" "}
                        {transaction.distributor}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span>{" "}
                        {transaction.quantity}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {transaction.date}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Location:</span>{" "}
                        {transaction.location}
                      </p>
                      <p>
                        <span className="font-medium">Amount:</span>{" "}
                        <span className="text-lg font-bold vericrop-text-primary">
                          ${transaction.amount}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Customer Feedback Section */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          Rating:
                        </span>
                        <CustomerRating rating={transaction.rating} />
                      </div>
                      {transaction.feedback && (
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-700">
                            Feedback:
                          </span>
                          <p className="text-sm text-gray-600 italic">
                            &ldquo;{transaction.feedback}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="vericrop-btn-secondary"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
