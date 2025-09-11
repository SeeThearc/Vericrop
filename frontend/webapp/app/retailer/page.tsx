import VerifyProductsPage from "./verify-products/page";
import TransactionsPage from "./transactions/page";
import AnalyticsPage from "./analytics/page";
import PurchaseBatchPage from "./purchase-batch/page";
import { Card, CardContent } from "@/components/ui/card";

const RetailerPage = () => {
  return (
    <>
      <Card className="border-2 border-green-200 shadow-lg">
        <CardContent className="p-6">
          <VerifyProductsPage />
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <PurchaseBatchPage />
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200 shadow-lg">
        <CardContent className="p-6">
          <TransactionsPage />
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-200 shadow-lg">
        <CardContent className="p-6">
          <AnalyticsPage />
        </CardContent>
      </Card>
    </>
  );
};

export default RetailerPage;
