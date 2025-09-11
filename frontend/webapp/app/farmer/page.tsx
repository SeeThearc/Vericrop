import { Sidebar } from "@/app/farmer/_components/sidebar";
import RegisterProducePage from "./register-produce/page";
import TrackProductsPage from "./track-products/page";
import { Topbar } from "./_components/topbar";
import { Footer } from "./_components/footer";
import { SalesChart } from "./_components/sales-chart";
import { Card, CardContent } from "@/components/ui/card";

const FarmerPage = () => {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-64">
        <Topbar />
        <div className="flex-grow pt-20 p-6 space-y-6">
          <Card className="border-2 border-green-200 shadow-lg">
            <CardContent className="p-6">
              <RegisterProducePage />
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
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default FarmerPage;
