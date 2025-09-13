"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";

import { Textarea } from "@/components/shadcn/ui/textarea";

const RegisterProductPage = () => {
  return (
    <div className="p-8 bg-white text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Register Product for Sale</h1>

      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-gray-700">Product Name</Label>
            <Input id="product-name" placeholder="e.g., Organic Tomatoes" className="bg-white border-gray-300 text-black" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-type" className="text-gray-700">Product Type</Label>
            <Input id="product-type" placeholder="e.g., Vegetable" className="bg-white border-gray-300 text-black" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="distributer-id" className="text-gray-700">Distributer ID</Label>
            <Input id="distributer-id" placeholder="e.g., DIST001" className="bg-white border-gray-300 text-black" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch-id" className="text-gray-700">Batch ID</Label>
            <Input id="batch-id" placeholder="e.g., BATCH2025-001" className="bg-white border-gray-300 text-black" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-gray-700">Quantity (kg)</Label>
            <Input id="quantity" placeholder="e.g., 500" className="bg-white border-gray-300 text-black" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase-date" className="text-gray-700">Purchase Date</Label>
            <Input id="purchase-date" type="date" className="bg-white border-gray-300 text-black" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier-location" className="text-gray-700">Supplier Location</Label>
          <Input id="supplier-location" placeholder="e.g., Central Warehouse, NY" className="bg-white border-gray-300 text-black" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-location" className="text-gray-700">Store Location</Label>
          <Input id="store-location" placeholder="e.g., Downtown Store, CA" className="bg-white border-gray-300 text-black" />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700">Upload Quality Photos</Label>
          <p className="text-sm text-gray-500">
            Ensure clear photos for AI assessment.
          </p>
          <div className="relative">
            <Input
              type="text"
              placeholder="Choose file..."
              className="w-full text-gray-700 pr-20 cursor-pointer"
              readOnly
              onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
            />
            <Input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              type="button"
              className="absolute right-0 top-0 h-full px-4 bg-green-600 hover:bg-green-700 text-white rounded-l-none"
              onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
            >
              Browse
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-700">AI Quality Assessment</Label>
          <Textarea placeholder="(Assessment results will appear here after upload)" readOnly className="bg-gray-100 border-gray-300 text-gray-500" />
        </div>
        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700 text-white">Register Product for Sale and Generate QR</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductPage;
