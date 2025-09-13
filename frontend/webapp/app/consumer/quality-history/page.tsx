import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck,
  Warehouse,
  ShoppingCart,
  Home,
} from "lucide-react";
import { motion } from "motion/react";

const QualityHistoryPage = () => {
  const qualityCheckpoints = [
    {
      id: 1,
      stage: "Harvest",
      title: "Harvest Quality Check",
      date: "2024-05-10",
      time: "08:30 AM",
      status: "passed",
      description: "Premium quality produce harvested under optimal conditions",
      details:
        "Moisture content: 85%, Sugar levels: Optimal, No pest damage detected",
      icon: Home,
      location: "Origin Farm, California",
    },
    {
      id: 2,
      stage: "Storage",
      title: "Storage Temperature Control",
      date: "2024-05-11",
      time: "02:15 PM",
      status: "passed",
      description: "Optimal storage conditions maintained throughout",
      details:
        "Temperature: 4°C ± 1°C, Humidity: 90-95%, Controlled atmosphere maintained",
      icon: Warehouse,
      location: "Cold Storage Facility, CA",
    },
    {
      id: 3,
      stage: "Transport",
      title: "Transport Inspection",
      date: "2024-05-14",
      time: "06:45 AM",
      status: "passed",
      description: "Secure transport with maintained cold chain",
      details:
        "Vehicle temp logs verified, Packaging integrity confirmed, GPS tracking active",
      icon: Truck,
      location: "Transport Route I-5",
    },
    {
      id: 4,
      stage: "Retail",
      title: "Retail Quality Verification",
      date: "2024-05-15",
      time: "11:20 AM",
      status: "attention",
      description: "Minor temperature fluctuation detected during display",
      details:
        "Display temp: 6°C (2°C above optimal), Corrective action taken, Quality maintained",
      icon: ShoppingCart,
      location: "Premium Grocery Store",
    },
    {
      id: 5,
      stage: "Final",
      title: "Consumer Delivery Check",
      date: "2024-05-15",
      time: "03:30 PM",
      status: "pending",
      description: "Awaiting final quality confirmation upon delivery",
      details: "Expected delivery window, Final temperature check pending",
      icon: CheckCircle,
      location: "Consumer Address",
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "passed":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "attention":
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
      case "pending":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          iconColor: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-200",
          iconColor: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return CheckCircle;
      case "attention":
        return AlertTriangle;
      case "pending":
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white vericrop-card-shadow border-0">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center space-x-2 vericrop-text-dark text-2xl">
            <CheckCircle className="h-6 w-6 vericrop-text-primary" />
            <span>Quality Journey Timeline</span>
          </CardTitle>
          <p className="vericrop-text-light">
            Track every quality checkpoint from farm to your table
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="space-y-8">
              {qualityCheckpoints.map((checkpoint, index) => {
                const statusInfo = getStatusInfo(checkpoint.status);
                const StageIcon = checkpoint.icon;
                const StatusIcon = getStatusIcon(checkpoint.status);

                return (
                  <motion.div
                    key={checkpoint.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 w-4 h-4 rounded-full border-4 border-white ${checkpoint.status === "passed"
                        ? "bg-green-500"
                        : checkpoint.status === "attention"
                          ? "bg-yellow-500"
                          : checkpoint.status === "pending"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        } shadow-lg -translate-x-1/2`}
                    ></div>

                    {/* Content card */}
                    <div
                      className={`p-6 rounded-2xl border ${statusInfo.borderColor} ${statusInfo.bgColor} hover:shadow-md transition-all duration-250`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${statusInfo.bgColor} border ${statusInfo.borderColor}`}
                          >
                            <StageIcon
                              className={`h-5 w-5 ${statusInfo.iconColor}`}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold vericrop-text-dark">
                              {checkpoint.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm vericrop-text-light">
                              <span>{checkpoint.date}</span>
                              <span>{checkpoint.time}</span>
                              <span>{checkpoint.location}</span>
                            </div>
                          </div>
                        </div>

                        <Badge className={statusInfo.color}>
                          <StatusIcon
                            className={`h-3 w-3 mr-1 ${statusInfo.iconColor}`}
                          />
                          {checkpoint.status === "passed"
                            ? "Passed"
                            : checkpoint.status === "attention"
                              ? "Attention"
                              : "Pending"}
                        </Badge>
                      </div>

                      <p className="vericrop-text-neutral mb-3 font-medium">
                        {checkpoint.description}
                      </p>

                      <div
                        className={`p-3 rounded-lg border ${statusInfo.borderColor} bg-white/50`}
                      >
                        <p className="text-sm vericrop-text-light">
                          <strong>Details:</strong> {checkpoint.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100"
            >
              <h4 className="text-lg font-semibold vericrop-text-dark mb-4">
                Quality Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm vericrop-text-light">
                    Checks Passed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm vericrop-text-light">
                    Needs Attention
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm vericrop-text-light">Pending</div>
                </div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QualityHistoryPage;
