"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Wallet,
  Link,
  Copy,
  QrCode,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Award,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface FarmerProfileData {
  id: string;
  name: string;
  profilePhoto?: string;
  reputationScore: number;
  walletAddress: string;
  registeredAt: string;
  ipfsDetailsHash: string;
  location: string;
  farmSize: string;
  certifications: string[];
  totalProducts: number;
  completedTransactions: number;
  averageRating: number;
}

interface FarmerProfilePanelProps {
  isOpen: boolean;
  onToggle: () => void;
  farmerData: FarmerProfileData;
}

export const FarmerProfilePanel = ({
  isOpen,
  onToggle,
  farmerData,
}: FarmerProfilePanelProps) => {
  const [walletCopied, setWalletCopied] = useState(false);
  const [ipfsCopied, setIpfsCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(farmerData.walletAddress);
    setWalletCopied(true);
    setTimeout(() => setWalletCopied(false), 2000);
  };

  const copyIPFSHash = () => {
    navigator.clipboard.writeText(farmerData.ipfsDetailsHash);
    setIpfsCopied(true);
    setTimeout(() => setIpfsCopied(false), 2000);
  };

  const generateQRCode = (text: string) => {
    // Mock QR code - in real implementation, use a QR code library like qrcode
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      text
    )}`;
  };

  const getReputationColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getReputationBadge = (score: number) => {
    if (score >= 4.8) return { label: "Elite", color: "bg-purple-500" };
    if (score >= 4.5) return { label: "Premium", color: "bg-green-500" };
    if (score >= 4.0) return { label: "Trusted", color: "bg-blue-500" };
    if (score >= 3.5) return { label: "Verified", color: "bg-yellow-500" };
    return { label: "Basic", color: "bg-gray-500" };
  };

  const reputationBadge = getReputationBadge(farmerData.reputationScore);

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-2"
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Farmer Profile
                </h2>
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-20 w-20 border-4 border-gray-100">
                      {farmerData.profilePhoto && (
                        <AvatarImage
                          src={farmerData.profilePhoto}
                          alt={farmerData.name}
                        />
                      )}
                      <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white">
                        {farmerData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {farmerData.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {farmerData.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${reputationBadge.color} text-white border-0`}
                      >
                        {reputationBadge.label}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span
                          className={`font-semibold ${getReputationColor(
                            farmerData.reputationScore
                          )}`}
                        >
                          {farmerData.reputationScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reputation Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    Reputation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Score</span>
                    <span
                      className={`font-semibold ${getReputationColor(
                        farmerData.reputationScore
                      )}`}
                    >
                      {farmerData.reputationScore}/5.0
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Total Products
                    </span>
                    <span className="font-semibold">
                      {farmerData.totalProducts}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Completed Transactions
                    </span>
                    <span className="font-semibold">
                      {farmerData.completedTransactions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Average Rating
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-semibold">
                        {farmerData.averageRating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-blue-500" />
                    Blockchain Identity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">
                      Wallet Address
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-mono bg-gray-50 px-2 py-1 rounded flex-1">
                        {farmerData.walletAddress.slice(0, 12)}...
                        {farmerData.walletAddress.slice(-8)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyWalletAddress}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      {walletCopied && (
                        <span className="text-xs text-green-600">✓</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowQR(!showQR)}
                      className="flex-1"
                    >
                      <QrCode className="h-3 w-3 mr-1" />
                      QR Code
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open("#", "_blank")}
                      className="flex-1"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Explorer
                    </Button>
                  </div>

                  {showQR && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-center"
                    >
                      <Image
                        src={generateQRCode(farmerData.walletAddress)}
                        alt="Wallet QR Code"
                        width={150}
                        height={150}
                        className="rounded-lg border"
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Registration Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    Registration Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Registered</span>
                    <span className="text-sm font-medium">
                      {farmerData.registeredAt}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Farm Size</span>
                    <span className="text-sm font-medium">
                      {farmerData.farmSize}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Certifications
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {farmerData.certifications.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* IPFS Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Link className="h-4 w-4 text-purple-500" />
                    IPFS Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">
                      Details Hash
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-mono bg-gray-50 px-2 py-1 rounded flex-1">
                        {farmerData.ipfsDetailsHash.slice(0, 16)}...
                      </span>
                      <Button size="sm" variant="ghost" onClick={copyIPFSHash}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      {ipfsCopied && (
                        <span className="text-xs text-green-600">✓</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `https://ipfs.io/ipfs/${farmerData.ipfsDetailsHash}`,
                          "_blank"
                        )
                      }
                      className="w-full mt-2"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
