import { CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { FilterBatches } from "@/components/filter-batches";
import { FeaturedBatches } from "@/components/retailer/featured-batches";

const PurchaseBatchPage = () => {
  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle>Purchase Batch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-6">
          <FilterBatches />
          <div className="flex-1">
            <FeaturedBatches />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default PurchaseBatchPage;
