"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { ScanQrCodeCard } from "../_components/scan-qr-code-card";

const DynamicMap = dynamic(() => import("../_components/dynamic-map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const MyPurchasesPage = () => {
  // Sample purchase data with quantities
  const purchases = [
    { name: "Organic Roma Tomatoes", date: "2024-05-15", pricePerKg: 2.7, quantity: 2 },
    { name: "Hass Avocados", date: "2024-05-14", pricePerKg: 3.5, quantity: 1 },
    { name: "Alphonso Mangoes", date: "2024-05-13", pricePerKg: 4.2, quantity: 3 },
  ];

  // Calculate total cost
  const totalCost = purchases.reduce(
    (total, item) => total + item.pricePerKg * item.quantity,
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScanQrCodeCard />
        <Card>
          <CardHeader>
            <CardTitle>Product Journey Map</CardTitle>
          </CardHeader>
          <CardContent className="relative h-96">
            <DynamicMap />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {purchases.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Purchased on {item.date} - {item.quantity} kg
                  </p>
                </div>
                <span className="text-green-600">
                  ${(item.pricePerKg * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center font-semibold">
              <span>Total Cost:</span>
              <span className="text-green-600">${totalCost.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyPurchasesPage;
