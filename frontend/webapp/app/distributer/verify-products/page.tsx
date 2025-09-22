"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  ShieldCheck,
  QrCode,
  Cpu,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";

const recentVerifications = [
  {
    id: "VC-001",
    product: "Organic Wheat",
    authenticity: "Authentic",
    farmer: "Green Acres Farm",
    inspector: "AgriCert Inc.",
    date: "2024-07-20",
    status: "verified",
  },
  {
    id: "VC-002",
    product: "Premium Corn",
    authenticity: "Authentic",
    farmer: "Sun Harvest Co.",
    inspector: "BioInspect LLC",
    date: "2024-07-19",
    status: "verified",
  },
  {
    id: "VC-003",
    product: "Fresh Tomatoes",
    authenticity: "Flagged",
    farmer: "Fieldstone Organics",
    inspector: "AgriCert Inc.",
    date: "2024-07-18",
    status: "flagged",
  },
  {
    id: "VC-004",
    product: "Soybean Batch A",
    authenticity: "Authentic",
    farmer: "Rural Roots",
    inspector: "BioInspect LLC",
    date: "2024-07-17",
    status: "verified",
  },
  {
    id: "VC-005",
    product: "Durum Wheat",
    authenticity: "Pending",
    farmer: "Grainbelt Farms",
    inspector: "AgriCert Inc.",
    date: "2024-07-17",
    status: "pending",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          color: "vericrop-badge-verified",
          text: "Verified",
        };
      case "pending":
        return {
          icon: Clock,
          color: "vericrop-badge-pending",
          text: "Pending",
        };
      case "flagged":
        return {
          icon: XCircle,
          color: "vericrop-badge-error",
          text: "Flagged",
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

const VerifyProductsPage = () => {
  return (
    <div className="space-y-8">
      {/* Language Selector */}
      <div className="flex justify-end">
        <div className="w-48">
          <Label className="text-white text-sm font-medium">
            Select Language
          </Label>
          <Select>
            <SelectTrigger className="vericrop-input h-12 mt-1 text-white">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
        {/* Statistics Card */}
        <div className="vericrop-card-secondary">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Products Verified
            </h3>
            <div className="text-4xl font-bold vericrop-text-primary mb-2">
              1,245 MT
            </div>
            <p className="text-sm text-green-600 font-medium">
              +12% this month
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Authenticity Card */}
        <div className="vericrop-card-secondary vericrop-hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Authenticity
            </h3>
            <Shield className="h-6 w-6 vericrop-text-primary" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            All recent products checked have passed authenticity tests with our
            advanced verification system.
          </p>
          <div className="mb-4">
            <StatusBadge status="verified" />
          </div>
          <Button variant="outline" className="w-full vericrop-btn-secondary">
            View Detailed Report
          </Button>
        </div>

        {/* ML Fraud Detection Card */}
        <div className="vericrop-card-secondary vericrop-hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              ML Fraud Detection
            </h3>
            <Cpu className="h-6 w-6 vericrop-text-success" />
          </div>
          <div className="mb-4">
            <StatusBadge status="verified" />
          </div>
          <p className="text-sm text-gray-600">
            No suspicious activities or anomalies detected in the last 24 hours.
            Machine learning algorithms continuously monitor for fraud patterns.
          </p>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Recent Verifications
          </h3>
          <p className="text-gray-600">
            Latest product verification activities and results
          </p>
        </div>
        <div className="space-y-6">
          {recentVerifications.map((item) => (
            <div
              key={item.id}
              className="vericrop-card-secondary vericrop-hover-lift"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {item.id}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {item.product}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Farmer:</span> {item.farmer}
                    </p>
                    <p>
                      <span className="font-medium">Inspector:</span>{" "}
                      {item.inspector}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="vericrop-btn-secondary"
                  >
                    View Details
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

export default VerifyProductsPage;
