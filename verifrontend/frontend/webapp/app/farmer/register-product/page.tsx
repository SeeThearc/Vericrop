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
  Package,
  Globe,
  Sparkles,
  IndianRupee,
  Clock,
  Leaf,
} from "lucide-react";
import { useState, useContext } from "react";
import { DataContext } from "../../../context/Context.jsx";

const RegisterProductPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");
  
  // Form fields
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [price, setPrice] = useState("");
  
  // Additional fields for IPFS
  const [description, setDescription] = useState("");
  const [chemicalsUsed, setChemicalsUsed] = useState("");

  // Get DataContext functions
  const {
    acc,
    isConnected,
    getContract,
    uploadJsonToIPFS,
    ipfsLoading
  } = useContext(DataContext);

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

  // Convert date to Unix timestamp
  const dateToTimestamp = (dateString: string): number => {
    return Math.floor(new Date(dateString).getTime() / 1000);
  };

  const handleSubmit = async () => {
    if (!isConnected()) {
      alert("Please connect your wallet first");
      return;
    }

    if (!productName || !productType || !quantity || !expiresAt || !farmLocation || !price) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate quantity
    if (parseFloat(quantity) <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    // Validate price
    if (parseFloat(price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    // Validate expiry date
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    if (expiryDate <= now) {
      alert("Expiry date must be in the future");
      return;
    }

    const batchContract = getContract('contract2'); // AgriTraceBatch contract
    if (!batchContract) {
      alert("Contract not initialized. Please reconnect your wallet.");
      return;
    }

    try {
      setIsRegistering(true);

      // Step 1: Create product on blockchain
      console.log("Step 1: Creating product on blockchain...");
      
      const expiresAtTimestamp = dateToTimestamp(expiresAt);
      
      // Convert to integers to avoid BigNumber issues
      const priceInRupees = Math.floor(parseFloat(price)); // Keep as whole rupees
      const quantityInKg = Math.floor(parseFloat(quantity)); // Keep as whole kg

      console.log("Blockchain parameters:", {
        productType,
        expiresAtTimestamp,
        farmLocation,
        priceInRupees,
        quantityInKg
      });

      const createTx = await batchContract.createProduct(
        productType,
        expiresAtTimestamp,
        farmLocation,
        priceInRupees,
        quantityInKg
      );

      // Wait for transaction and get product ID
      const receipt = await createTx.wait();
      
      // Find the ProductCreated event to get the product ID
      const productCreatedEvent = receipt.logs.find((log: { topics: string[]; data: string }) => {
        try {
          const parsed = batchContract.interface.parseLog(log);
          return parsed?.name === 'ProductCreated';
        } catch {
          return false;
        }
      });

      if (!productCreatedEvent) {
        throw new Error("Product creation failed - no event found");
      }

      const parsedEvent = batchContract.interface.parseLog(productCreatedEvent);
      const productId = parsedEvent?.args[0];

      console.log("Product created with ID:", productId.toString());

      // Step 2: Prepare farm data for IPFS
      console.log("Step 2: Preparing farm data for IPFS...");
      
      const farmData = {
        // Basic product information
        productId: productId.toString(),
        productName,
        productType,
        quantity: parseFloat(quantity),
        quantityUnit: "kg",
        price: parseFloat(price),
        priceUnit: "INR",
        pricePerKg: (parseFloat(price) / parseFloat(quantity)).toFixed(2),
        expiresAt,
        farmLocation,
        
        // Farm details
        farmer: acc,
        description: description || `Fresh ${productType} from ${farmLocation}`,
        chemicalsUsed: chemicalsUsed || "Not specified",
        
        // Metadata
        language,
        createdAt: new Date().toISOString(),
        uploadedFile: selectedFile,
        
        // Blockchain data
        transactionHash: createTx.hash,
        blockchainCreatedAt: new Date().toISOString(),
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        
        // Supply chain tracking
        currentStage: "FARM",
        currentState: "PENDING_PICKUP",
        trackingHistory: [
          {
            stage: "FARM",
            state: "PENDING_PICKUP", 
            timestamp: new Date().toISOString(),
            location: farmLocation,
            actor: acc,
            description: "Product registered and ready for pickup"
          }
        ],
        
        // Economic data
        economicData: {
          totalValue: (parseFloat(price) * parseFloat(quantity)).toFixed(2),
          currency: "INR",
          marketPrice: parseFloat(price),
          farmGate: true,
          priceValidUntil: expiresAt
        }
      };

      // Step 3: Upload to IPFS
      console.log("Step 3: Uploading farm data to IPFS...");
      
      const { hash: ipfsHash } = await uploadJsonToIPFS(
        farmData, 
        `farm-data-${productId}-${productName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
      );

      console.log("Farm data uploaded to IPFS with hash:", ipfsHash);

      // Step 4: Store IPFS hash on blockchain
      console.log("Step 4: Storing IPFS hash on blockchain...");
      
      const storeHashTx = await batchContract.storeFarmDataHash(productId, ipfsHash);
      await storeHashTx.wait();

      console.log("IPFS hash stored on blockchain successfully!");

      // Success message and reset form
      alert(`✅ Product registered successfully!
      
Product Details:
• Product ID: ${productId}
• Name: ${productName}
• Quantity: ${quantity} kg
• Price: ₹${price} (₹${(parseFloat(price) / parseFloat(quantity)).toFixed(2)}/kg)
• Total Value: ₹${(parseFloat(price) * parseFloat(quantity)).toFixed(2)}
• IPFS Hash: ${ipfsHash}

Your product is now registered on the blockchain and ready for the supply chain!`);
      
      // Reset form
      setProductName("");
      setProductType("");
      setQuantity("");
      setExpiresAt("");
      setFarmLocation("");
      setPrice("");
      setDescription("");
      setChemicalsUsed("");
      setSelectedFile(null);

      // Store for local reference
      localStorage.setItem("vericrop_last_product", JSON.stringify({
        productId: productId.toString(),
        ipfsHash,
        productName,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        totalValue: (parseFloat(price) * parseFloat(quantity)).toFixed(2),
        createdAt: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Product registration error:', error);
      
    } finally {
      setIsRegistering(false);
    }
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
          <Select onValueChange={(val) => setLanguage(val)} disabled={isRegistering || ipfsLoading}>
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
              Product Name *
            </Label>
            <Input
              id="product-name"
              placeholder="e.g., Organic Tomatoes"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={isRegistering || ipfsLoading}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="product-type"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#52B788]" />
              Product Type *
            </Label>
            <Select onValueChange={(val) => setProductType(val)} disabled={isRegistering || ipfsLoading}>
              <SelectTrigger className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200">
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-[#374151] border border-[#E5E7EB] rounded-xl shadow-lg">
                <SelectItem value="Vegetable">Vegetable</SelectItem>
                <SelectItem value="Fruit">Fruit</SelectItem>
                <SelectItem value="Grain">Grain</SelectItem>
                <SelectItem value="Herb">Herb</SelectItem>
                <SelectItem value="Spice">Spice</SelectItem>
                <SelectItem value="Pulse">Pulse</SelectItem>
                <SelectItem value="Cereal">Cereal</SelectItem>
                <SelectItem value="Nut">Nut</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quantity, Price and Expires */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label
              htmlFor="quantity"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Package className="h-4 w-4 text-[#52B788]" />
              Quantity (kg) *
            </Label>
            <Input
              id="quantity"
              placeholder="e.g., 500"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={isRegistering || ipfsLoading}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            <p className="text-xs text-gray-500">
              Enter whole kilograms only (e.g., 10, 25, 100)
            </p>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="price"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <IndianRupee className="h-4 w-4 text-[#52B788]" />
              Total Price (₹) *
            </Label>
            <Input
              id="price"
              placeholder="e.g., 2500"
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isRegistering || ipfsLoading}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
            />
            <p className="text-xs text-gray-500">
              Enter whole rupees only (e.g., 1000, 2500, 5000)
            </p>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="expires-at"
              className="text-[#374151] text-sm font-medium flex items-center gap-2"
            >
              <Clock className="h-4 w-4 text-[#52B788]" />
              Expires At *
            </Label>
            <Input
              id="expires-at"
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              disabled={isRegistering || ipfsLoading}
              min={new Date().toISOString().slice(0, 16)}
              className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Price Summary */}
        {price && quantity && parseFloat(quantity) > 0 && parseFloat(price) > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">Price Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Quantity:</span>
                <p className="font-medium text-blue-900">{quantity} kg</p>
              </div>
              <div>
                <span className="text-blue-600">Total Price:</span>
                <p className="font-medium text-blue-900">₹{parseFloat(price).toFixed(0)}</p>
              </div>
              <div>
                <span className="text-blue-600">Price per kg:</span>
                <p className="font-medium text-blue-900">₹{(parseFloat(price) / parseFloat(quantity)).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-blue-600">Final Values:</span>
                <p className="font-medium text-blue-900">
                  {Math.floor(parseFloat(quantity))} kg, ₹{Math.floor(parseFloat(price))}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="space-y-3">
          <Label
            htmlFor="farm-location"
            className="text-[#374151] text-sm font-medium flex items-center gap-2"
          >
            <MapPin className="h-4 w-4 text-[#52B788]" />
            Farm Location (Origin) *
          </Label>
          <Input
            id="farm-location"
            placeholder="e.g., Village Kharkhoda, District Sonipat, Haryana, India"
            value={farmLocation}
            onChange={(e) => setFarmLocation(e.target.value)}
            disabled={isRegistering || ipfsLoading}
            className="bg-white border-[#E5E7EB] text-[#374151] h-12 rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>

        {/* Additional Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[#374151] border-b border-gray-200 pb-2">
            Additional Farm Details
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="description" className="text-[#374151] text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your product quality, cultivation method, etc..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isRegistering || ipfsLoading}
                className="bg-white border-[#E5E7EB] text-[#374151] rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="chemicals" className="text-[#374151] text-sm font-medium flex items-center gap-2">
                <Leaf className="h-4 w-4 text-[#52B788]" />
                Chemicals Used (Fertilizers & Pesticides)
              </Label>
              <Textarea
                id="chemicals"
                placeholder="e.g., Organic compost, Neem oil, NPK fertilizer, etc."
                value={chemicalsUsed}
                onChange={(e) => setChemicalsUsed(e.target.value)}
                disabled={isRegistering || ipfsLoading}
                className="bg-white border-[#E5E7EB] text-[#374151] rounded-xl focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-4">
          <Label className="text-[#374151] text-sm font-medium flex items-center gap-2">
            <Camera className="h-4 w-4 text-[#52B788]" />
            Upload Product Photos
          </Label>
          <div
            className="relative border-2 border-dashed border-[#E5E7EB] rounded-xl p-6 text-center hover:border-[#22C55E] cursor-pointer bg-gray-50/50 transition-colors duration-200"
            onClick={!isRegistering && !ipfsLoading ? handleFileUpload : undefined}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#22C55E] mb-2"></div>
                <p className="text-[#374151]">Uploading...</p>
              </div>
            ) : selectedFile ? (
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-[#22C55E] mb-2" />
                <p className="text-[#374151] font-medium">{selectedFile}</p>
                <p className="text-sm text-gray-500">Click to change</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-[#374151]">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isRegistering || ipfsLoading || !isConnected()}
            className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803D] text-white h-12 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isConnected() ? "Connect Wallet First" :
             isRegistering && !ipfsLoading ? "Creating Product..." :
             ipfsLoading ? "Uploading to IPFS..." :
             "Register Product & Generate QR"}
          </Button>
        </div>

        {/* Loading Status */}
        {(isRegistering || ipfsLoading) && (
          <div className="text-center space-y-2 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-800 font-medium">
                {isRegistering && !ipfsLoading && "⛓️ Processing blockchain transaction..."}
                {ipfsLoading && "⏳ Uploading farm data to IPFS..."}
              </span>
            </div>
            <p className="text-sm text-blue-600">
              Please don&apos;t close this page during the registration process.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RegisterProductPage;