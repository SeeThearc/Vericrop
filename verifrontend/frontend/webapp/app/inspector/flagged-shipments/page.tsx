import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { MoreHorizontal } from "lucide-react";

const shipments = [
  {
    id: "VC1001",
    product: "Organic Apples",
    issue: "Pesticide Residue Alert",
    status: "Pending Review",
    urgency: "High",
  },
  {
    id: "VC1002",
    product: "Fresh Spinach",
    issue: "Mold Contamination",
    status: "Under Investigation",
    urgency: "Critical",
  },
  {
    id: "VC1003",
    product: "Heirloom Tomatoes",
    issue: "Incorrect Origin Label",
    status: "Resolved",
    urgency: "Medium",
  },
  {
    id: "VC1004",
    product: "Farm Eggs",
    issue: "Temperature Excursion",
    status: "Pending Action",
    urgency: "High",
  },
  {
    id: "VC1005",
    product: "Dairy Milk",
    issue: "Expired Certification",
    status: "Pending Review",
    urgency: "Medium",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Pending Review":
      return "secondary";
    case "Under Investigation":
      return "destructive";
    case "Resolved":
      return "default";
    case "Pending Action":
      return "default";
    default:
      return "outline";
  }
};

const getUrgencyVariant = (urgency: string) => {
  switch (urgency) {
    case "High":
      return "secondary";
    case "Critical":
      return "destructive";
    case "Medium":
      return "secondary";
    default:
      return "outline";
  }
};

const FlaggedShipmentsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle>Inspector Dashboard</CardTitle>
          <CardDescription>
            Efficiently manage your verification tasks and ensure compliance
            across the supply chain.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">125</p>
            <p>Shipments Verified Today</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">18</p>
            <p>Pending Verifications</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">3</p>
            <p>Open Disputes</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Flagged Shipments</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">View All</Button>
            <Button>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.id}</TableCell>
                  <TableCell>{shipment.product}</TableCell>
                  <TableCell>{shipment.issue}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(shipment.status) as any}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getUrgencyVariant(shipment.urgency) as any}>
                      {shipment.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline">Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlaggedShipmentsPage;
