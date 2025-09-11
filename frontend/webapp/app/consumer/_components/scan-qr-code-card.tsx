import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";

export function ScanQrCodeCard() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="bg-green-50 border-green-200">
        <CardContent className="flex flex-col items-center justify-center p-4 text-center">
          <QrCode className="w-12 h-12 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Scan Product QR Code</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Quickly verify product details and journey by scanning its unique QR
            code.
          </p>
          <Button variant="outline" size="sm">Scan QR Code</Button>
        </CardContent>
      </Card>
    </div>
  );
}
