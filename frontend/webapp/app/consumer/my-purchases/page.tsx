"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import {
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";
import { ScanQrCodeCard } from "@/components/consumer/scan-qr-code-card";

const DynamicMap = dynamic(() => import("@/components/dynamic-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
});

const MyPurchasesPage = () => {
  // Enhanced purchase data with more details
  const purchases = [
    {
      id: "ORD-001",
      name: "Organic Roma Tomatoes",
      date: "2024-05-15",
      pricePerKg: 2.7,
      quantity: 2,
      status: "delivered",
      image: "/tomato.png",
      location: "California, USA",
      certification: "Organic Certified",
      trackingId: "TRK-TOM-2024-001",
    },
    {
      id: "ORD-002",
      name: "Hass Avocados",
      date: "2024-05-14",
      pricePerKg: 3.5,
      quantity: 1,
      status: "in-transit",
      image: "/avocado.png",
      location: "Amazon, Brazil",
      certification: "Fair Trade",
      trackingId: "TRK-AVO-2024-002",
    },
    {
      id: "ORD-003",
      name: "Alphonso Mangoes",
      date: "2024-05-13",
      pricePerKg: 4.2,
      quantity: 3,
      status: "pending",
      image: "/mango.png",
      location: "Punjab, India",
      certification: "Premium Grade",
      trackingId: "TRK-MAN-2024-003",
    },
  ];

  // Calculate total cost
  const totalCost = purchases.reduce(
    (total, item) => total + item.pricePerKg * item.quantity,
    0
  );

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          icon: CheckCircle,
          label: "Delivered",
          color: "bg-green-100 text-green-700 border-green-200",
          iconColor: "text-green-600",
        };
      case "in-transit":
        return {
          icon: Truck,
          label: "In Transit",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          iconColor: "text-blue-600",
        };
      case "pending":
        return {
          icon: Clock,
          label: "Processing",
          color: "bg-orange-100 text-orange-700 border-orange-200",
          iconColor: "text-orange-600",
        };
      default:
        return {
          icon: Package,
          label: "Unknown",
          color: "bg-gray-100 text-gray-700 border-gray-200",
          iconColor: "text-gray-600",
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold vericrop-text-dark mb-2">
          My Purchases & Tracking
        </h1>
        <p className="vericrop-text-light">
          Monitor your orders and track product journeys in real-time
        </p>
      </motion.div>

      {/* Top Section: QR Scanner and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <ScanQrCodeCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="h-full bg-white vericrop-card-shadow border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 vericrop-text-dark">
                <MapPin className="h-5 w-5 vericrop-text-primary" />
                <span>Product Journey Map</span>
              </CardTitle>
              <p className="text-sm vericrop-text-light">
                Track your products from farm to your table
              </p>
            </CardHeader>
            <CardContent className="relative h-80">
              <DynamicMap />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Purchase History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="bg-white vericrop-card-shadow border-0">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center space-x-2 vericrop-text-dark">
              <Package className="h-6 w-6 vericrop-text-primary" />
              <span>Purchase History</span>
            </CardTitle>
            <p className="text-sm vericrop-text-light">
              Your recent orders and their current status
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {purchases.map((item, index) => {
                const statusInfo = getStatusInfo(item.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-all duration-250 hover:shadow-md bg-gradient-to-r from-white to-gray-50/50"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-250"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold vericrop-text-dark group-hover:vericrop-text-primary transition-colors duration-200">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm vericrop-text-light">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>Ordered {item.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{item.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={statusInfo.color}>
                                <StatusIcon
                                  className={`h-3 w-3 mr-1 ${statusInfo.iconColor}`}
                                />
                                {statusInfo.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.certification}
                              </Badge>
                            </div>
                          </div>

                          {/* Price and Quantity */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-xl font-bold vericrop-text-success">
                              ${(item.pricePerKg * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm vericrop-text-light">
                              {item.quantity} kg × ${item.pricePerKg}/kg
                            </div>
                            <div className="text-xs vericrop-text-light mt-1">
                              ID: {item.trackingId}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Total Cost */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold vericrop-text-dark">
                    Total Orders Cost:
                  </span>
                  <p className="text-sm vericrop-text-light mt-1">
                    Includes {purchases.length} recent orders
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold vericrop-text-success">
                    ${totalCost.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1 text-sm vericrop-text-light mt-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span>Premium Quality Assured</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MyPurchasesPage;
