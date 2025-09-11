"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VerifyProductsComponent = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Verify Product</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-code" className="text-gray-700">QR Code or Product ID</Label>
          <Input id="qr-code" placeholder="Scan or enter QR code" className="bg-white border-gray-300 text-black" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="verification-notes" className="text-gray-700">Verification Notes</Label>
          <Input id="verification-notes" placeholder="Add any notes about verification" className="bg-white border-gray-300 text-black" />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Verify Product</Button>
      </div>
    </div>
  );
};

export default VerifyProductsComponent;
