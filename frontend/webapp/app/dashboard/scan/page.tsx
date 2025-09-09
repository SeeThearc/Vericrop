"use client";
import Nav from "../../components/Nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900 dark:to-green-800">
      <Nav />
      <main className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 
              className="text-3xl font-bold text-[#1A4D2E] dark:text-[#B6E388]"
              style={{ fontFamily: 'var(--font-libre-baskerville)' }}
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
              {/* Scanner placeholder */}
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-[#B6E388] to-[#64A833] rounded-lg flex items-center justify-center dark:from-[#64A833] dark:to-[#1A4D2E]">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📷</div>
                  <p className="text-white font-semibold">Camera viewfinder will appear here</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4">
                <Button className="w-full bg-[#64A833] hover:bg-[#1A4D2E] text-white text-lg py-6">
                  Start Camera
                </Button>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-[#64A833] text-[#64A833] hover:bg-[#64A833] hover:text-white dark:border-[#B6E388] dark:text-[#B6E388] dark:hover:bg-[#B6E388] dark:hover:text-[#1A4D2E]">
                    Upload Image
                  </Button>
                  <Button variant="outline" className="border-[#64A833] text-[#64A833] hover:bg-[#64A833] hover:text-white dark:border-[#B6E388] dark:text-[#B6E388] dark:hover:bg-[#B6E388] dark:hover:text-[#1A4D2E]">
                    Manual Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="border-[#B6E388] dark:bg-[#1A4D2E] dark:border-[#64A833]">
            <CardHeader>
              <CardTitle className="text-[#1A4D2E] dark:text-[#B6E388]">
                How to Scan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-[#4E3629] dark:text-[#F8F8F8]">
                <li className="flex items-center gap-2">
                  <span className="text-[#64A833] dark:text-[#B6E388]">1.</span>
                  Point your camera at the QR code on the product packaging
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#64A833] dark:text-[#B6E388]">2.</span>
                  Ensure the QR code is well-lit and in focus
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#64A833] dark:text-[#B6E388]">3.</span>
                  Wait for automatic detection and verification
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#64A833] dark:text-[#B6E388]">4.</span>
                  View detailed product information and supply chain data
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
