"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { Badge } from "@/components/shadcn/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/dynamic-map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const transactions = [
  {
    id: "TXN001",
    product: "Organic Tomatoes",
    farmer: "John Smith",
    buyer: "Retail Store #12",
    amount: 2500,
    status: "Completed",
    date: "2025-09-10",
    location: "Distribution Hub A",
  },
  {
    id: "TXN002",
    product: "Heritage Wheat",
    farmer: "Jane Doe",
    buyer: "Bakery Chain",
    amount: 1800,
    status: "Pending",
    date: "2025-09-09",
    location: "Warehouse B",
  },
  {
    id: "TXN003",
    product: "Sweet Potatoes",
    farmer: "Mike Johnson",
    buyer: "Wholesale Market",
    amount: 3200,
    status: "Completed",
    date: "2025-09-08",
    location: "Cold Storage C",
  },
  {
    id: "TXN004",
    product: "Bell Peppers",
    farmer: "Sarah Wilson",
    buyer: "Restaurant Group",
    amount: 2100,
    status: "In Transit",
    date: "2025-09-07",
    location: "Transport Vehicle",
  },
  {
    id: "TXN005",
    product: "Seasonal Berries",
    farmer: "Tom Brown",
    buyer: "Farmers Market",
    amount: 950,
    status: "Delivered",
    date: "2025-09-06",
    location: "Market Stall",
  },
];

const TransactionsPage = () => {
  return (
    <div className="p-8 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Transaction History</h1>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50">
            <TableHead className="text-gray-700">Transaction ID</TableHead>
            <TableHead className="text-gray-700">Product</TableHead>
            <TableHead className="text-gray-700">Farmer</TableHead>
            <TableHead className="text-gray-700">Buyer</TableHead>
            <TableHead className="text-gray-700">Amount ($)</TableHead>
            <TableHead className="text-gray-700">Status</TableHead>
            <TableHead className="text-gray-700">Date</TableHead>
            <TableHead className="text-gray-700">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-gray-50">
              <TableCell className="text-gray-900">{transaction.id}</TableCell>
              <TableCell className="text-gray-900">{transaction.product}</TableCell>
              <TableCell className="text-gray-900">{transaction.farmer}</TableCell>
              <TableCell className="text-gray-900">{transaction.buyer}</TableCell>
              <TableCell className="text-gray-900">{transaction.amount}</TableCell>
              <TableCell>
                <Badge
                  className={
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : transaction.status === "In Transit"
                          ? "bg-blue-100 text-blue-800"
                          : transaction.status === "Delivered"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">{transaction.date}</TableCell>
              <TableCell className="text-gray-900">{transaction.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Journey Map</CardTitle>
          </CardHeader>
          <CardContent className="relative h-96">
            <DynamicMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsPage;
