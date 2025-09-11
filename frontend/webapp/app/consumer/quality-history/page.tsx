import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

const QualityHistoryPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Harvest Quality Check (2024-05-10)</p>
              <p className="text-sm text-muted-foreground">Good condition, passed.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Storage Temperature Log (2024-05-12)</p>
              <p className="text-sm text-muted-foreground">Maintained optimal range.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Transport Inspection (2024-05-14)</p>
              <p className="text-sm text-muted-foreground">Intact packaging, no damage.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Clock className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
            <div>
              <p className="font-medium">Retailer Freshness Check (2024-05-15)</p>
              <p className="text-sm text-muted-foreground">Pending.</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default QualityHistoryPage;
