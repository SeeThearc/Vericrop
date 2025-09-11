"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFile("product-image.jpg");
    }, 2000);
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
          <Select>
            <SelectTrigger className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#374151] border border-[#E5E7EB] rounded-xl shadow-lg">
              <SelectItem
                value="en"
                className="hover:bg-gray-50 cursor-pointer"
              >
                English
              </SelectItem>
              <SelectItem
                value="hi"
                className="hover:bg-gray-50 cursor-pointer"
              >
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
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3"
          >
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
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-3"
          >
            <Label
              htmlFor="product-type"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#52B788]" />
              Product Type
            </Label>
            <Select>
              <SelectTrigger className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-[#374151] border border-[#E5E7EB] rounded-xl shadow-lg">
                <SelectItem
                  value="vegetable"
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  Vegetable
                </SelectItem>
                <SelectItem
                  value="fruit"
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  Fruit
                </SelectItem>
                <SelectItem
                  value="grain"
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  Grain
                </SelectItem>
                <SelectItem
                  value="herb"
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  Herb
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Quantity and Date */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-3"
          >
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
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-3"
          >
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
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200"
            />
          </motion.div>
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
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
            className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-4"
        >
          <Label className="text-[#374151] text-sm font-medium flex items-center gap-2">
            <Camera className="h-4 w-4 text-[#52B788]" />
            Upload Quality Photos
          </Label>
          <p className="text-sm text-[#374151] opacity-70">
            Upload clear, high-quality photos for AI-powered quality assessment
            and verification.
          </p>

          <div className="relative">
            <div
              className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center hover:border-[#22C55E] transition-colors duration-200 cursor-pointer bg-gray-50/50"
              onClick={handleFileUpload}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#22C55E]"></div>
                  <p className="text-[#374151]">Uploading...</p>
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-[#10B981] rounded-full">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-[#374151] font-medium">{selectedFile}</p>
                  <p className="text-sm text-[#10B981]">
                    File uploaded successfully!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-[#52B788] rounded-full">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-[#374151]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-[#374151] opacity-70">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </div>
            <input type="file" className="hidden" accept="image/*" />
          </div>
        </motion.div>

        {/* AI Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
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
            className="bg-gray-50 border-[#E5E7EB] text-[#374151] rounded-xl min-h-[100px] resize-none placeholder-gray-400"
            value={
              selectedFile
                ? "✅ Excellent quality detected\n🌿 Optimal freshness levels\n📊 Grade A classification\n🔍 No defects identified"
                : ""
            }
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex justify-end pt-4"
        >
          <Button className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
            Register Product & Generate QR
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterProductPage;
