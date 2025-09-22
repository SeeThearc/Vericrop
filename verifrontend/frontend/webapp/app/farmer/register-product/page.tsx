"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  MapPin,
  Calendar,
  Package,
  Globe,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const RegisterProductPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [farmLocation, setFarmLocation] = useState("");

  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files.length > 0) {
        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          setSelectedFile(fileInput.files![0].name);
        }, 1000);
      }
    };

    fileInput.click();
  };

  const handleSubmit = () => {
    const productData = {
      language,
      productName,
      productType,
      quantity,
      harvestDate,
      farmLocation,
      uploadedFile: selectedFile,
      aiAssessment: selectedFile
        ? "✅ Excellent quality detected\n🌿 Optimal freshness levels\n📊 Grade A classification\n🔍 No defects identified"
        : "",
    };

    localStorage.setItem("vericrop_product_data", JSON.stringify(productData));
    alert("Product details saved!");
  };

  return (
    <div className="p-8 bg-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#374151] font-['Inter']">
              Register New Product
            </h1>
            <p className="text-[#374151] opacity-70 text-sm mt-1">
              Add your agricultural product to the VeriCrop ecosystem
            </p>
          </div>
        </div>

        <div className="w-full lg:w-48">
          <Label className="text-[#374151] text-sm font-medium mb-2 block">
            <Globe className="h-4 w-4 inline mr-2" />
            Language
          </Label>
          <Select onValueChange={(val) => setLanguage(val)}>
            <SelectTrigger className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#374151] border border-[#E5E7EB] rounded-xl shadow-lg">
              <SelectItem value="en" className="hover:bg-gray-50 cursor-pointer">
                English
              </SelectItem>
              <SelectItem value="hi" className="hover:bg-gray-50 cursor-pointer">
                हिन्दी
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Form Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="space-y-8"
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="product-name"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Package className="h-4 w-4 text-[#52B788]" />
              Product Name
            </Label>
            <Input
              id="product-name"
              placeholder="e.g., Organic Tomatoes"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="product-type"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#52B788]" />
              Product Type
            </Label>
            <Select onValueChange={(val) => setProductType(val)}>
              <SelectTrigger className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-[#374151] border border-[#E5E7EB] rounded-xl shadow-lg">
                <SelectItem value="vegetable">Vegetable</SelectItem>
                <SelectItem value="fruit">Fruit</SelectItem>
                <SelectItem value="grain">Grain</SelectItem>
                <SelectItem value="herb">Herb</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quantity and Date */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="quantity"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Package className="h-4 w-4 text-[#52B788]" />
              Quantity (kg)
            </Label>
            <Input
              id="quantity"
              placeholder="e.g., 500"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="harvest-date"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Calendar className="h-4 w-4 text-[#52B788]" />
              Harvest Date
            </Label>
            <Input
              id="harvest-date"
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label
            htmlFor="farm-location"
            className="text-[#374151] text-sm font-medium flex items-center gap-2"
          >
            <MapPin className="h-4 w-4 text-[#52B788]" />
            Farm Location
          </Label>
          <Input
            id="farm-location"
            placeholder="e.g., Greenfield Farm, California, USA"
            value={farmLocation}
            onChange={(e) => setFarmLocation(e.target.value)}
            className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <Label className="text-[#374151] text-sm font-medium flex items-center gap-2">
            <Camera className="h-4 w-4 text-[#52B788]" />
            Upload Quality Photos
          </Label>
          <div
            className="relative border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center hover:border-[#22C55E] cursor-pointer bg-gray-50/50"
            onClick={handleFileUpload}
          >
            {isUploading ? (
              <p>Uploading...</p>
            ) : selectedFile ? (
              <p>{selectedFile}</p>
            ) : (
              <p>Click to upload or drag and drop</p>
            )}
          </div>
        </div>

        {/* AI Quality Assessment */}
        <div className="space-y-3">
          <Label className="text-[#374151] text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#52B788]" />
            AI Quality Assessment
          </Label>
          <Textarea
            placeholder={
              selectedFile
                ? "Quality assessment results will appear here..."
                : "Upload photos to enable AI quality assessment"
            }
            readOnly
            value={
              selectedFile
                ? "✅ Excellent quality detected\n🌿 Optimal freshness levels\n📊 Grade A classification\n🔍 No defects identified"
                : ""
            }
            className="bg-gray-50 border-[#E5E7EB] text-[#374151] rounded-xl min-h-[100px] resize-none placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            Register Product & Generate QR
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterProductPage;

