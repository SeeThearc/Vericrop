"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    product: "Organic Tomatoes",
    status: "In Transit",
    location: "Distribution Hub A",
    lastHandler: "Green Harvest Logistics",
    inspectorVerified: true,
    transactions: 3,
  },
  {
    product: "Heritage Wheat",
    status: "Harvested",
    location: "Farm Plot 7B",
    lastHandler: "Farmer John",
    inspectorVerified: false,
    transactions: 1,
  },
  {
    product: "Sweet Potatoes",
    status: "Verified",
    location: "Retail Store #12",
    lastHandler: "Urban Groceries Inc.",
    inspectorVerified: true,
    transactions: 5,
  },
  {
    product: "Bell Peppers",
    status: "Processing",
    location: "Packing Facility X",
    lastHandler: "AgriPack Solutions",
    inspectorVerified: true,
    transactions: 2,
  },
  {
    product: "Seasonal Berries",
    status: "Pending Pick-up",
    location: "Farm Storage Unit",
    lastHandler: "Farmer Jane",
    inspectorVerified: false,
    transactions: 0,
  },
];

const TrackProductsPage = () => {
  return (
    <div className="p-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Track My Products</h1>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50">
            <TableHead className="text-gray-700">Product</TableHead>
            <TableHead className="text-gray-700">Status</TableHead>
            <TableHead className="text-gray-700">Location</TableHead>
            <TableHead className="text-gray-700">Last Handler</TableHead>
            <TableHead className="text-gray-700">Inspector Verified</TableHead>
            <TableHead className="text-gray-700">Transactions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.product} className="hover:bg-gray-50">
              <TableCell className="text-gray-900">{product.product}</TableCell>
              <TableCell>
                <Badge
                  className={
                    product.status === "In Transit"
                      ? "bg-yellow-100 text-yellow-800"
                      : product.status === "Harvested"
                      ? "bg-blue-100 text-blue-800"
                      : product.status === "Verified"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Processing"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">{product.location}</TableCell>
              <TableCell className="text-gray-900">{product.lastHandler}</TableCell>
              <TableCell>
                {product.inspectorVerified ? "✅" : "❌"}
              </TableCell>
              <TableCell className="text-gray-900">{product.transactions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrackProductsPage;
