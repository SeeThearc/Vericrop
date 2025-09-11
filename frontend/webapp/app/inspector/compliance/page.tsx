import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CompliancePage = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
          <CardDescription>
            Overview of key compliance areas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Organic Certification</span>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700 dark:bg-green-900/50 dark:text-green-400">
                Compliant
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Fair Trade Standards</span>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 dark:bg-orange-900/50 dark:text-orange-400">
                Needs Review
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Food Safety Regulations</span>
              </div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-400">
                Non-Compliant
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-gray-500" />
                <span>Sustainability Metrics</span>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
                Pending Update
              </span>
            </div>
          </div>
          <div className="mt-6 text-right">
            <Button variant="link">View Details</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Fraud Detection Overview</CardTitle>
              <CardDescription>
                Identified potential fraud and discrepancies in recent supply
                chain activities.
              </CardDescription>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <div>
                <span className="font-semibold">Fake Label:</span> Detected
                counterfeit labels on &quot;Organic Apples&quot; shipment
                #45678.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <div>
                <span className="font-semibold">Product Substitution:</span>{" "}
                &quot;Premium Oranges&quot; substituted with lower-grade
                oranges in batch #91011.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <div>
                <span className="font-semibold">Quantity Mismatch:</span>{" "}
                Received 150 units of &quot;Cherry Tomatoes&quot; instead of
                200 units for order #12131.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-orange-500" />
              <div>
                <span className="font-semibold">Product Type Mismatch:</span>{" "}
                Shipment #14151 contained &quot;Red Bell Peppers&quot; instead
                of &quot;Yellow Bell Peppers&quot;.
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full bg-green-600 text-white hover:bg-green-700">
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompliancePage;
