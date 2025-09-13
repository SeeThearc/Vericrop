"use client";

import { Button } from "@/components/shadcn/ui/button";
import { CheckCircle, Clock, Truck, MapPin, Eye } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/dynamic-map"), {
  ssr: false,
  loading: () => <div className="vericrop-card-secondary h-64 flex items-center justify-center">Loading map...</div>,
});

const transactions = [
  {
    id: "TXN001",
    product: "Organic Tomatoes",
    farmer: "John Smith",
    buyer: "Retail Store #12",
    amount: 2500,
    status: "Completed",
    date: "2025-09-10",
    location: "Distribution Hub A",
    quantity: "500 kg",
  },
  {
    id: "TXN002",
    product: "Heritage Wheat",
    farmer: "Jane Doe",
    buyer: "Bakery Chain",
    amount: 1800,
    status: "Pending",
    date: "2025-09-09",
    location: "Warehouse B",
    quantity: "750 kg",
  },
  {
    id: "TXN003",
    product: "Sweet Potatoes",
    farmer: "Mike Johnson",
    buyer: "Wholesale Market",
    amount: 3200,
    status: "Completed",
    date: "2025-09-08",
    location: "Cold Storage C",
    quantity: "1200 kg",
  },
  {
    id: "TXN004",
    product: "Bell Peppers",
    farmer: "Sarah Wilson",
    buyer: "Restaurant Group",
    amount: 2100,
    status: "In Transit",
    date: "2025-09-07",
    location: "Transport Vehicle",
    quantity: "300 kg",
  },
  {
    id: "TXN005",
    product: "Seasonal Berries",
    farmer: "Tom Brown",
    buyer: "Farmers Market",
    amount: 950,
    status: "Delivered",
    date: "2025-09-06",
    location: "Market Stall",
    quantity: "150 kg",
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
          text: status
        };
      case "pending":
        return {
          icon: Clock,
          color: "vericrop-badge-pending",
          text: status
        };
      case "in transit":
        return {
          icon: Truck,
          color: "vericrop-badge-info",
          text: status
        };
      default:
        return {
          icon: Clock,
          color: "vericrop-badge-info",
          text: status
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

const TransactionsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600">Complete supply chain transaction visibility and tracking</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Transactions</h3>
          <div className="text-3xl font-bold vericrop-text-primary">247</div>
          <p className="text-sm text-green-600">+18% this month</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
          <div className="text-3xl font-bold vericrop-text-primary">$125,450</div>
          <p className="text-sm text-green-600">+22% this month</p>
        </div>
        <div className="vericrop-card-secondary text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Shipments</h3>
          <div className="text-3xl font-bold vericrop-text-primary">14</div>
          <p className="text-sm text-blue-600">In transit</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Supply Chain Journey</h3>
          <p className="text-gray-600">Real-time tracking of product movement and locations</p>
        </div>
        <div className="h-64 rounded-lg overflow-hidden">
          <DynamicMap />
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Recent Transactions</h3>
          <p className="text-gray-600">Latest transaction activities and status updates</p>
        </div>

        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="vericrop-card-secondary vericrop-hover-lift">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-gray-900">{transaction.id}</span>
                    <StatusBadge status={transaction.status} />
                  </div>

                  <h4 className="font-medium text-gray-900 text-lg mb-2">{transaction.product}</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="space-y-2">
                      <p><span className="font-medium">Farmer:</span> {transaction.farmer}</p>
                      <p><span className="font-medium">Buyer:</span> {transaction.buyer}</p>
                      <p><span className="font-medium">Quantity:</span> {transaction.quantity}</p>
                    </div>
                    <div className="space-y-2">
                      <p><span className="font-medium">Date:</span> {transaction.date}</p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Location:</span> {transaction.location}
                      </p>
                      <p><span className="font-medium">Amount:</span> <span className="text-lg font-bold vericrop-text-primary">${transaction.amount}</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="vericrop-btn-secondary">
                    <Eye className="h-4 w-4 mr-1" />
                    Track Journey
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
