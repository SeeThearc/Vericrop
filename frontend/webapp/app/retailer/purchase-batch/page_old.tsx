import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterBatches } from "../_components/filter-batches";
import { FeaturedBatches } from "../_components/featured-batches";

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
