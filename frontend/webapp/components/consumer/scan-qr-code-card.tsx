import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Camera, Scan } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function ScanQrCodeCard() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanClick = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/50 to-green-100/30 border-green-200/50 vericrop-card-shadow">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-green-600/10" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-400/10 rounded-full translate-y-12 -translate-x-12" />

          <CardContent className="relative flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative mb-6"
            >
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-green-200/50 vericrop-card-shadow">
                {isScanning ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Scan className="w-12 h-12 vericrop-text-primary" />
                  </motion.div>
                ) : (
                  <QrCode className="w-12 h-12 vericrop-text-primary" />
                )}
              </div>

              {/* Animated scanning border */}
              {isScanning && (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 border-2 border-green-400 rounded-3xl"
                />
              )}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl font-bold vericrop-text-dark mb-3"
            >
              {isScanning ? "Scanning Product..." : "Scan Product QR Code"}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base vericrop-text-light mb-6 max-w-xs"
            >
              {isScanning
                ? "Please hold your device steady while we verify product details"
                : "Quickly verify product details and journey by scanning its unique QR code"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full"
            >
              <Button
                onClick={handleScanClick}
                disabled={isScanning}
                className="w-full vericrop-gradient-primary text-white border-0 hover:shadow-lg transition-all duration-250 py-3 font-semibold"
                size="lg"
              >
                <Camera className="h-5 w-5 mr-2" />
                {isScanning ? "Scanning..." : "Start QR Scan"}
              </Button>

              <Button
                variant="ghost"
                className="w-full mt-3 vericrop-text-light hover:vericrop-text-primary transition-colors duration-200"
                size="sm"
              >
                Upload QR Image Instead
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
