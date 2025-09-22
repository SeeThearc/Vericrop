"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  Cpu,
  Shield,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";
import { Input } from "@/components/shadcn/ui/input";
import { useState } from "react";

const recentVerifications = [
  {
    id: "VC-001",
    product: "Organic Wheat",
    authenticity: "Authentic",
    farmer: "Green Acres Farm",
    inspector: "AgriCert Inc.",
    date: "2024-07-20",
    status: "verified",
  },
  {
    id: "VC-002",
    product: "Premium Corn",
    authenticity: "Authentic",
    farmer: "Sun Harvest Co.",
    inspector: "BioInspect LLC",
    date: "2024-07-19",
    status: "verified",
  },
  {
    id: "VC-003",
    product: "Fresh Tomatoes",
    authenticity: "Flagged",
    farmer: "Fieldstone Organics",
    inspector: "AgriCert Inc.",
    date: "2024-07-18",
    status: "flagged",
  },
  {
    id: "VC-004",
    product: "Soybean Batch A",
    authenticity: "Authentic",
    farmer: "Rural Roots",
    inspector: "BioInspect LLC",
    date: "2024-07-17",
    status: "verified",
  },
  {
    id: "VC-005",
    product: "Durum Wheat",
    authenticity: "Pending",
    farmer: "Grainbelt Farms",
    inspector: "AgriCert Inc.",
    date: "2024-07-17",
    status: "pending",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          color: "vericrop-badge-verified",
          text: "Verified",
        };
      case "pending":
        return {
          icon: Clock,
          color: "vericrop-badge-pending",
          text: "Pending",
        };
      case "flagged":
        return {
          icon: XCircle,
          color: "vericrop-badge-error",
          text: "Flagged",
        };
      default:
        return {
          icon: Clock,
          color: "vericrop-badge-info",
          text: status,
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div className={`${config.color} flex items-center gap-1`}>
      <IconComponent className="h-3 w-3" />
      {config.text}
    </div>
  );
};

const VerifyProductsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expectedProduct, setExpectedProduct] = useState("");

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Fraud Detection API call
  const handleFraudDetection = async () => {
    if (!selectedFile || !expectedProduct) {
      alert("Please select an image and enter expected product name");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("expected_product", expectedProduct);

      const response = await fetch("http://localhost:8000/detect-fraud", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to detect fraud");
      }

      const result = await response.json();
      setVerificationResults({ type: "fraud", data: result });
    } catch (error) {
      console.error("Error:", error);
      alert("Error detecting fraud. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fruit Quality API call
  const handleFruitQuality = async () => {
    if (!selectedFile) {
      alert("Please select an image");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("http://localhost:8000/grade-fruit-quality", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze fruit quality");
      }

      const result = await response.json();
      setVerificationResults({ type: "quality", data: result });
    } catch (error) {
      console.error("Error:", error);
      alert("Error analyzing fruit quality. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8">
      {/* Language Selector */}
      <div className="flex justify-end">
        <div className="w-48">
          <Label className="text-white text-sm font-medium">
            Select Language
          </Label>
          <Select>
            <SelectTrigger className="vericrop-input h-12 mt-1 text-white">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="te">Telugu</SelectItem>
              <SelectItem value="kn">Kannada</SelectItem>
              <SelectItem value="ta">Tamil</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
        {/* Statistics Card */}
        <div className="vericrop-card-secondary">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Products Verified
            </h3>
            <div className="text-4xl font-bold vericrop-text-primary mb-2">
              1,245 MT
            </div>
            <p className="text-sm text-green-600 font-medium">
              +12% this month
            </p>
          </div>
        </div>
      </div>

      {/* Product Verification Interface */}
      <div className="vericrop-card-primary mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Product Verification
          </h3>
          <p className="text-gray-600">
            Upload product images for fraud detection and quality analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <div>
              <Label className="text-gray-900 font-medium">Upload Product Image</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="vericrop-input"
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-green-600 mt-1">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              <Label className="text-gray-900 font-medium">Expected Product (for fraud detection)</Label>
              <Input
                type="text"
                placeholder="e.g., strawberry, apple, tomato"
                value={expectedProduct}
                onChange={(e) => setExpectedProduct(e.target.value)}
                className="vericrop-input mt-2"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleFraudDetection}
                disabled={isLoading || !selectedFile || !expectedProduct}
                className="vericrop-btn-primary flex-1"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Shield className="h-4 w-4 mr-2" />
                )}
                Detect Fraud
              </Button>
              <Button
                onClick={handleFruitQuality}
                disabled={isLoading || !selectedFile}
                className="vericrop-btn-secondary flex-1"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Check Quality
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <Label className="text-gray-900 font-medium">Verification Results</Label>
            {verificationResults ? (
              <div className="vericrop-card-secondary">
                {verificationResults.type === "fraud" && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Fraud Detection Results</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={verificationResults.data.is_fraudulent ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                          {verificationResults.data.is_fraudulent ? "Fraudulent" : "Authentic"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected:</span>
                        <span className="text-gray-900">{verificationResults.data.expected_product}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Detected:</span>
                        <span className="text-gray-900">{verificationResults.data.actual_product}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="text-gray-900">{(verificationResults.data.confidence_score * 100).toFixed(1)}%</span>
                      </div>
                      {verificationResults.data.fraud_type && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fraud Type:</span>
                          <span className="text-gray-900">{verificationResults.data.fraud_type}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {verificationResults.type === "quality" && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Quality Analysis Results</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Crop Type:</span>
                        <span className="text-gray-900">{verificationResults.data.crop_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Health Score:</span>
                        <span className="text-gray-900">{verificationResults.data.health_score}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Grade:</span>
                        <span className={`font-medium ${
                          verificationResults.data.grade === 'A' ? 'text-green-600' :
                          verificationResults.data.grade === 'B' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          Grade {verificationResults.data.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="vericrop-card-secondary text-center text-gray-500">
                <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                Upload an image and run verification to see results
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Authenticity Card */}
        <div className="vericrop-card-secondary vericrop-hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Product Authenticity
            </h3>
            <Shield className="h-6 w-6 vericrop-text-primary" />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            All recent products checked have passed authenticity tests with our
            advanced verification system.
          </p>
          <div className="mb-4">
            <StatusBadge status="verified" />
          </div>
          <Button variant="outline" className="w-full vericrop-btn-secondary">
            View Detailed Report
          </Button>
        </div>

        {/* ML Fraud Detection Card */}
        <div className="vericrop-card-secondary vericrop-hover-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              ML Fraud Detection
            </h3>
            <Cpu className="h-6 w-6 vericrop-text-success" />
          </div>
          <div className="mb-4">
            <StatusBadge status="verified" />
          </div>
          <p className="text-sm text-gray-600">
            No suspicious activities or anomalies detected in the last 24 hours.
            Machine learning algorithms continuously monitor for fraud patterns.
          </p>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="vericrop-card-primary">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Recent Verifications
          </h3>
          <p className="text-gray-600">
            Latest product verification activities and results
          </p>
        </div>
        <div className="space-y-6">
          {recentVerifications.map((item) => (
            <div
              key={item.id}
              className="vericrop-card-secondary vericrop-hover-lift"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {item.id}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {item.product}
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Farmer:</span> {item.farmer}
                    </p>
                    <p>
                      <span className="font-medium">Inspector:</span>{" "}
                      {item.inspector}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="vericrop-btn-secondary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerifyProductsPage;
