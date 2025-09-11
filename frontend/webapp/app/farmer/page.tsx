import RegisterProductPage from "./register-product/page";
import TrackProductsPage from "./track-products/page";
import { SalesChart } from "./_components/sales-chart";
import { Card, CardContent } from "@/components/ui/card";

const FarmerPage = () => {
  return (
    <>
      <Card className="border-2 border-green-200 shadow-lg">
        <CardContent className="p-6">
          <RegisterProductPage />
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <TrackProductsPage />
        </CardContent>
      </Card>

      <Card className="border-2 border-purple-200 shadow-lg">
        <CardContent className="p-6">
          <SalesChart />
        </CardContent>
      </Card>
    </>
  );
};

export default FarmerPage;
