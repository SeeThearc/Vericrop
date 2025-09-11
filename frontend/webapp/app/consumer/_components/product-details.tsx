"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, QrCode, Search, ShoppingCart, Truck, Warehouse } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./dynamic-map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});


export function ProductDetails() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <ScanQrCodeCard />
      <ProductJourneyMap />
      <PriceBreakdownCard />
      <QualityHistoryCard />
    </div>
  );
}

function ScanQrCodeCard() {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <QrCode className="w-16 h-16 text-green-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Scan Product QR Code</h3>
        <p className="text-muted-foreground mb-4">
          Quickly verify product details and journey by scanning its unique QR code.
        </p>
        <Button variant="outline">Scan QR Code</Button>
      </CardContent>
    </Card>
  );
}

function ProductJourneyMap() {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Product/Batch ID..."
              className="ml-2 bg-transparent focus:outline-none w-full"
            />
            <Button size="icon" variant="ghost">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative h-64">
          <DynamicMap />
        </CardContent>
      </Card>
    );
  }

function PriceBreakdownCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Farm Gate Price:</span>
            <span>$1.20/kg</span>
          </li>
          <li className="flex justify-between">
            <span>Logistics & Distribution:</span>
            <span>$0.45/kg</span>
          </li>
          <li className="flex justify-between">
            <span>Processing & Packaging:</span>
            <span>$0.30/kg</span>
          </li>
          <li className="flex justify-between">
            <span>Retailer Markup:</span>
            <span>$0.75/kg</span>
          </li>
          <li className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
            <span>Total:</span>
            <span className="text-green-600">$2.70/kg</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

function QualityHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Harvest Quality Check (2024-05-10)</p>
              <p className="text-sm text-muted-foreground">Good condition, passed.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Storage Temperature Log (2024-05-12)</p>
              <p className="text-sm text-muted-foreground">Maintained optimal range.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Transport Inspection (2024-05-14)</p>
              <p className="text-sm text-muted-foreground">Intact packaging, no damage.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Clock className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Retailer Freshness Check (2024-05-15)</p>
              <p className="text-sm text-muted-foreground">Pending.</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
