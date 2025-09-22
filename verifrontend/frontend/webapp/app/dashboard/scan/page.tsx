
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import Nav from "@/components/Nav";

// Import QrReader properly (Next.js safe)
const QrReader = dynamic(
  async () => {
    const mod = await import("react-qr-reader");
    return mod.QrReader;
  },
  { ssr: false }
);

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const router = useRouter();

  const handleScan = (result: any) => {
    if (!!result) {
      const text = result.getText();
      setScanResult(text);
      setCameraActive(false);

      setTimeout(() => {
        router.push(`/product/${encodeURIComponent(text)}`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-green-800">
      <Nav />
      <main className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1
              className="text-3xl font-bold text-[#1A4D2E] dark:text-[#B6E388]"
              style={{ fontFamily: "var(--font-libre-baskerville)" }}
            >
              QR Scanner
            </h1>
            <p className="text-[#4E3629] dark:text-[#F8F8F8]">
              Mobile-first QR scanner for product verification and blockchain tracking.
            </p>
          </div>

          {/* Scanner Card */}
          <Card className="border-[#B6E388] dark:bg-[#1A4D2E] dark:border-[#64A833]">
            <CardHeader>
              <CardTitle className="text-[#1A4D2E] dark:text-[#B6E388] flex items-center gap-2">
                📱 QR Code Scanner
              </CardTitle>
              <CardDescription className="text-[#4E3629] dark:text-[#F8F8F8]">
                Scan QR codes to verify product authenticity and track supply chain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Camera Scanner */}
              {cameraActive ? (
                <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-lg">
                  <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={handleScan}
                    containerStyle={{ width: "100%", height: "100%" }}
                    videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Guiding box overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-emerald-400 rounded-lg animate-pulse" />
                  </div>
                  {/* Dark overlay around guiding box */}
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                </div>
              ) : (
                <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-[#B6E388] to-[#64A833] rounded-lg flex items-center justify-center dark:from-[#64A833] dark:to-[#1A4D2E]">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">📷</div>
                    <p className="text-white font-semibold">
                      Camera viewfinder will appear here
                    </p>
                  </div>
                </div>
              )}

              {/* Show scan result */}
              {scanResult && (
                <div className="p-4 bg-green-100 dark:bg-green-800 rounded-lg text-center font-semibold text-[#1A4D2E] dark:text-[#B6E388]">
                  ✅ Scanned Code: {scanResult}
                  <p className="text-sm mt-1">Redirecting...</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-4">
                <Button
                  className="w-full bg-[#64A833] hover:bg-[#1A4D2E] text-white text-lg py-6"
                  onClick={() => setCameraActive(true)}
                  disabled={cameraActive}
                >
                  {cameraActive ? "Scanning..." : "Start Camera"}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-[#64A833] text-[#64A833] hover:bg-[#64A833] hover:text-white dark:border-[#B6E388] dark:text-[#B6E388] dark:hover:bg-[#B6E388] dark:hover:text-[#1A4D2E]"
                  >
                    Upload Image
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#64A833] text-[#64A833] hover:bg-[#64A833] hover:text-white dark:border-[#B6E388] dark:text-[#B6E388] dark:hover:bg-[#B6E388] dark:hover:text-[#1A4D2E]"
                  >
                    Manual Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

