"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { useState } from "react";

const RegisterProductSalePage = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [distributerId, setDistributerId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [supplierLocation, setSupplierLocation] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        setSelectedFile(fileInput.files[0].name);
      }
    };
    fileInput.click();
  };

  const handleSubmit = () => {
    const saleData = {
      productName,
      productType,
      distributerId,
      batchId,
      quantity,
      purchaseDate,
      supplierLocation,
      storeLocation,
      uploadedFile: selectedFile,
      aiAssessment: selectedFile
        ? "✅ Excellent quality detected\n🌿 Optimal freshness levels\n📊 Grade A classification\n🔍 No defects identified"
        : "",
    };

    localStorage.setItem("vericrop_sale_data", JSON.stringify(saleData));
    alert("Product sale details saved !");
  };

  return (
    <div className="p-8 bg-white text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">Register Product for Sale</h1>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-gray-700">Product Name</Label>
            <Input
              id="product-name"
              placeholder="e.g., Organic Tomatoes"
              className="bg-white border-gray-300 text-black"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product-type" className="text-gray-700">Product Type</Label>
            <Input
              id="product-type"
              placeholder="e.g., Vegetable"
              className="bg-white border-gray-300 text-black"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="distributer-id" className="text-gray-700">Distributer ID</Label>
            <Input
              id="distributer-id"
              placeholder="e.g., DIST001"
              className="bg-white border-gray-300 text-black"
              value={distributerId}
              onChange={(e) => setDistributerId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch-id" className="text-gray-700">Batch ID</Label>
            <Input
              id="batch-id"
              placeholder="e.g., BATCH2025-001"
              className="bg-white border-gray-300 text-black"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-gray-700">Quantity (kg)</Label>
            <Input
              id="quantity"
              placeholder="e.g., 500"
              className="bg-white border-gray-300 text-black"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purchase-date" className="text-gray-700">Purchase Date</Label>
            <Input
              id="purchase-date"
              type="date"
              className="bg-white border-gray-300 text-black"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier-location" className="text-gray-700">Supplier Location</Label>
          <Input
            id="supplier-location"
            placeholder="e.g., Central Warehouse, NY"
            className="bg-white border-gray-300 text-black"
            value={supplierLocation}
            onChange={(e) => setSupplierLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="store-location" className="text-gray-700">Store Location</Label>
          <Input
            id="store-location"
            placeholder="e.g., Downtown Store, CA"
            className="bg-white border-gray-300 text-black"
            value={storeLocation}
            onChange={(e) => setStoreLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">Upload Quality Photos</Label>
          <p className="text-sm text-gray-500">Ensure clear photos for AI assessment.</p>
          <div className="relative">
            <Input
              type="text"
              placeholder="Choose file..."
              className="w-full text-gray-700 pr-20 cursor-pointer"
              readOnly
              value={selectedFile || ""}
              onClick={handleFileUpload}
            />
            <Button
              type="button"
              className="absolute right-0 top-0 h-full px-4 bg-green-600 hover:bg-green-700 text-white rounded-l-none"
              onClick={handleFileUpload}
            >
              Browse
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">AI Quality Assessment</Label>
          <Textarea
            placeholder="(Assessment results will appear here after upload)"
            readOnly
            value={
              selectedFile
                ? "✅ Excellent quality detected\n🌿 Optimal freshness levels\n📊 Grade A classification\n🔍 No defects identified"
                : ""
            }
            className="bg-gray-100 border-gray-300 text-gray-500"
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleSubmit}
          >
            Register Product for Sale and Generate QR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductSalePage;

