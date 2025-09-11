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

const transactions = [
  {
    id: "TXN001",
    product: "Organic Tomatoes",
    buyer: "Retail Store #12",
    amount: 2500,
    status: "Completed",
    date: "2025-09-10",
  },
  {
    id: "TXN002",
    product: "Heritage Wheat",
    buyer: "Bakery Chain",
    amount: 1800,
    status: "Pending",
    date: "2025-09-09",
  },
  {
    id: "TXN003",
    product: "Sweet Potatoes",
    buyer: "Wholesale Market",
    amount: 3200,
    status: "Completed",
    date: "2025-09-08",
  },
];

const TransactionsComponent = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50">
            <TableHead className="text-gray-700">Transaction ID</TableHead>
            <TableHead className="text-gray-700">Product</TableHead>
            <TableHead className="text-gray-700">Buyer</TableHead>
            <TableHead className="text-gray-700">Amount ($)</TableHead>
            <TableHead className="text-gray-700">Status</TableHead>
            <TableHead className="text-gray-700">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-gray-50">
              <TableCell className="text-gray-900">{transaction.id}</TableCell>
              <TableCell className="text-gray-900">{transaction.product}</TableCell>
              <TableCell className="text-gray-900">{transaction.buyer}</TableCell>
              <TableCell className="text-gray-900">{transaction.amount}</TableCell>
              <TableCell>
                <Badge
                  className={
                    transaction.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-900">{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsComponent;
