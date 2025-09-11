"use client";
import { WelcomeBanner } from "./_components/welcome-banner";
import ProductSearchPage from "./product-search/page";
import QualityHistoryPage from "./quality-history/page";
import MyPurchasesPage from "./my-purchases/page";
import { Card, CardContent } from "@/components/ui/card";

export default function ConsumerPage() {
  return (
    <>
      <WelcomeBanner />

      <div className="flex flex-col space-y-6 mt-6">
        <Card className="border-2 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <ProductSearchPage />
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <MyPurchasesPage />
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <QualityHistoryPage />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
